<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { serviceEmpleados } from "../../services/Services.js";

const router = useRouter();

// Estado del header
const isMenuOpen = ref(false);
const isAuthenticated = ref(false);

onMounted(() => {
  checkAuthentication();
  // Escuchar cambios en las rutas
  router.afterEach(() => {
    checkAuthentication();
  });
});

const checkAuthentication = () => {
  isAuthenticated.value = serviceEmpleados.isAuthenticated();
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const logout = () => {
  serviceEmpleados.logout();
  checkAuthentication();
  closeMenu();
  router.push("/");
};
</script>

<template>
  <nav class="bg-zinc-900/50 border-b border-white/10 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link
            to="/"
            class="flex items-center text-white hover:text-blue-400 transition"
          >
            <span class="font-bold text-lg">Sistema Empleados</span>
          </router-link>
        </div>

        <div class="hidden md:flex items-center space-x-4">
          <router-link
            to="/"
            class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
            active-class="text-blue-400"
            exact
          >
            Inicio
          </router-link>

          <template v-if="isAuthenticated">
            <router-link
              to="/perfil"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              active-class="text-blue-400"
            >
              Mi Perfil
            </router-link>

            <router-link
              to="/subordinados"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              active-class="text-blue-400"
            >
              Subordinados
            </router-link>

            <button
              @click="logout"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              Cerrar Sesión
            </button>
          </template>

          <template v-else>
            <router-link
              to="/login"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              active-class="bg-blue-700"
            >
              Iniciar Sesión
            </router-link>
          </template>
        </div>

        <button
          class="md:hidden text-white focus:outline-none"
          @click="toggleMenu"
          :class="{ 'text-blue-400': isMenuOpen }"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div v-if="isMenuOpen" class="md:hidden pb-4">
        <div class="flex flex-col space-y-2">
          <router-link
            to="/"
            class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
            active-class="text-blue-400"
            exact
            @click="closeMenu"
          >
            Inicio
          </router-link>

          <template v-if="isAuthenticated">
            <router-link
              to="/perfil"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              active-class="text-blue-400"
              @click="closeMenu"
            >
              Mi Perfil
            </router-link>

            <router-link
              to="/subordinados"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              active-class="text-blue-400"
              @click="closeMenu"
            >
              Subordinados
            </router-link>

            <button
              @click="logout"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition text-left"
            >
              Cerrar Sesión
            </button>
          </template>

          <template v-else>
            <router-link
              to="/login"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition inline-block text-center"
              active-class="bg-blue-700"
              @click="closeMenu"
            >
              Iniciar Sesión
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>
