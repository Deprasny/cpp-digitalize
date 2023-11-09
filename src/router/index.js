import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
const routes = [
  { path: "/", component: Home, name: "home" },
  { path: "/login", component: LoginView, name: "login" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
