<template>
  <ion-page>
    <ion-content>
      <ion-text color="primary">
        <h2 class="ion-padding-start">
          Your completed tasks ({{ completedTodos.length }})
        </h2>
      </ion-text>

      <ion-spinner v-if="loadingTodos" name="lines"></ion-spinner>

      <TodoList
        v-else
        :todoList="completedTodos"
        :isArchive="true"
        @toggle-completed="toggleTodoCompleted($event)"
      ></TodoList>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonSpinner, IonText } from "@ionic/vue";
import TodoList from "@/components/TodoList.vue";
import { useTodoStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useTodoStore();
const { completedTodos, todos, loadingTodos } = storeToRefs(store);
const { initTodoList, toggleTodoCompleted } = store;

//if not yet set, init todos
if (todos.value.length === 0) {
  initTodoList();
}
</script>

<style scoped></style>
