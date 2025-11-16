import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Perfil from "../components/Perfil.vue";
import Subordinados from "../components/Subordinados.vue";
import Jugadores from "../components/jugadores.vue";
import DetalleJugador from "../components/detalleJugador.vue";
import DetalleEquipo from "../components/detalleEquipo.vue";
import Apuestas from "../components/apuestas.vue";
import CrearApuesta from "../components/crearApuesta.vue";

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
    path: "/jugadores",
    name: "jugadores",
    component: Jugadores,
  },
  {
    path: "/jugadores/:id",
    name: "detalleJugador",
    component: DetalleJugador,
  },
  {
    path: "/equipos/:id",
    name: "detalleEquipo",
    component: DetalleEquipo,
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
  {
    path: "/mis-apuestas",
    name: "apuestas",
    component: Apuestas,
  },
  {
    path: "/crear-apuesta",
    name: "crearApuesta",
    component: CrearApuesta,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: myRoutes,
});

export default router;
