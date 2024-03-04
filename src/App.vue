<template>
  <ion-app>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button v-for="route of navBarList" :key="route.route">
            <router-link :to="route.route" exact>
              <ion-icon :icon="route.icon"></ion-icon>
              {{ route.title }}
            </router-link>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="personCircleOutline"></ion-icon>
            {{ userName }}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-router-outlet />
    </ion-content>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonRouterOutlet,
  IonButtons,
  IonButton,
  IonToolbar,
  IonHeader,
  IonIcon,
} from "@ionic/vue";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useTitle, useWindowSize } from "@vueuse/core";
import {
  checkboxOutline,
  archiveOutline,
  personCircleOutline,
} from "ionicons/icons";

//navbar

type NavBarEntry = { title: string; route: string; icon: string };

const navBarList: NavBarEntry[] = [
  {
    title: "My Tasks",
    route: "/",
    icon: checkboxOutline,
  },
  {
    title: "Archive",
    route: "/archive",
    icon: archiveOutline,
  },
];

//user name / initials

const user = {
  firstName: "Max",
  lastName: "Mustermann",
};

const { width } = useWindowSize();

const userName = computed(() => {
  if (width.value < 640) {
    return `${user.firstName.charAt(0)}.${user.lastName.charAt(0)}.`;
  } else {
    return `${user.firstName} ${user.lastName}`;
  }
});

//page title

const route = useRoute();
const routeName = computed(() => {
  return route.name ?? "";
});

const pageTitle = computed(() => {
  switch (routeName.value) {
    case "archive":
      return "Archive | TodoListApp";

    default:
      return "My Tasks | TodoListApp";
  }
});

watch(pageTitle, () => {
  useTitle(pageTitle.value);
});
</script>
<style scoped>
a {
  color: var(--ion-color-tertiary);
  text-decoration: inherit;
}
a:hover,
.router-link-active {
  color: white;
  border-bottom-style: solid;
}
a.router-link-active:hover {
  cursor: default;
}
ion-button {
  color: var(--ion-color-tertiary);
}
</style>
