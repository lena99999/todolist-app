import { defineStore } from "pinia";
import axios from "axios";
import { TodoListItem } from "@/types/TodoListTypes";

const apiUrl = import.meta.env.VITE_API_URL;

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todoList: [] as TodoListItem[],
    loading: true,
    currentId: 0,
  }),

  getters: {
    loadingTodos(state): boolean {
      return state.loading;
    },

    todos(state): TodoListItem[] {
      return state.todoList;
    },

    openTodos(state): TodoListItem[] {
      return state.todoList.filter((item) => !item.completed).reverse();
    },

    completedTodos(state): TodoListItem[] {
      return state.todoList.filter((item) => item.completed).reverse();
    },
  },

  actions: {
    initTodoList(): void {
      this.loading = true;
      axios
        .get(apiUrl + "/todos?userId=1")
        .then((response) => {
          this.loading = false;
          this.todoList = response.data;
          this.currentId = this.todoList.length;
        })
        .catch((error) => {
          this.loading = false;
          this.todoList = [];
        });
    },

    addTodo(text: string): void {
      this.currentId++;
      this.todoList.push({
        id: this.currentId,
        title: text,
        completed: false,
      });
    },

    toggleTodoCompleted(id: number): void {
      const todo = this.todoList.find((item) => item.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});
