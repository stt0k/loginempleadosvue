import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Perfil from "../components/Perfil.vue";
import Subordinados from "../components/Subordinados.vue";

const myRoutes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/perfil",
    name: "perfil",
    component: Perfil,
  },
  {
    path: "/subordinados",
    name: "subordinados",
    component: Subordinados,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: myRoutes,
});

export default router;
