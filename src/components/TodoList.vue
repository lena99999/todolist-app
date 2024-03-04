<template>
  <ion-searchbar
    v-if="todoList.length != 0"
    v-model="searchText"
    placeholder="Search tasks..."
    class="ion-padding-start"
  ></ion-searchbar>

  <ion-grid>
    <ion-row>
      <ion-col
        size="12"
        size-sm="6"
        size-md="4"
        size-lg="3"
        v-show="showAddTodo"
      >
        <ion-card key="new" class="newTodo">
          <ion-card-content>
            <ion-grid>
              <ion-row>
                <ion-col size="1" size-md="2">
                  <ion-checkbox disabled> </ion-checkbox>
                </ion-col>
                <ion-col size="11" size-md="10">
                  <ion-input
                    type="text"
                    v-model="newTodoText"
                    placeholder="Add new task..."
                    ref="addTodoInput"
                    @keyup.enter="addNewTodoToList"
                  >
                  </ion-input>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col
        v-for="todo in shownTodos"
        :key="todo.id"
        size="12"
        size-sm="6"
        size-md="4"
        size-lg="3"
      >
        <ion-card>
          <ion-card-content>
            <ion-checkbox
              :checked="todo.completed"
              slot="start"
              labelPlacement="end"
              @ionChange="emit('toggle-completed', todo.id)"
            >
              <ion-label class="ion-text-wrap">
                {{ todo.title }}
              </ion-label>
            </ion-checkbox>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>

  <ion-item v-if="todoList.length === 0" lines="none">
    <ion-icon item-start :icon="closeOutline" class="icon"></ion-icon>
    No tasks available
  </ion-item>

  <ion-fab v-if="!isArchive" vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button @click="toggleNewTodo">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script setup lang="ts">
import {
  IonCheckbox,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonInput,
  IonSearchbar,
  IonRow,
  IonGrid,
  IonCol,
  IonLabel,
  IonItem,
} from "@ionic/vue";
import { add, closeOutline } from "ionicons/icons";
import { computed, nextTick, ref, watch } from "vue";
import { TodoListItem } from "@/types/TodoListTypes";

const props = defineProps<{
  todoList: TodoListItem[];
  isArchive: Boolean;
}>();

const emit = defineEmits<{
  "add-todo": [value: string];
  "toggle-completed": [id: number];
}>();

const searchText = ref("");

const shownTodos = computed(() =>
  props.todoList.filter((item: TodoListItem) =>
    item.title.includes(searchText.value.toLowerCase())
  )
);

const showAddTodo = ref(false);
const addTodoInput = ref();

function toggleNewTodo() {
  showAddTodo.value = !showAddTodo.value;
  nextTick(() => {
    addTodoInput.value.$el.setFocus();
  });
}

const newTodoText = ref("");

function addNewTodoToList() {
  if (newTodoText.value) {
    emit("add-todo", newTodoText.value);
    newTodoText.value = "";
  }
}
</script>

<style scoped>
.item-checkbox .item-content {
  pointer-events: auto;
}

ion-card {
  height: 100px;
  --background: var(--ion-color-secondary);
}
ion-checkbox,
.newTodo ion-grid {
  height: 74px;
}
.newTodo {
  background-color: rgb(230, 228, 228);
  ion-checkbox {
    height: 54px;
  }
}
ion-searchbar {
  max-width: 500px;
}
</style>
