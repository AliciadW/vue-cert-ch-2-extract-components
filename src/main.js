import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import MovieView from "@/pages/MovieView.vue";
import MovieList from "@/pages/MovieList.vue";
import "../style.css";

const routes = [
  {
    name: "home",
    path: "/",
    component: MovieList,
  },
  {
    name: "movie",
    path: "/:id",
    component: MovieView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
