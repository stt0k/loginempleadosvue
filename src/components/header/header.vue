<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { serviceEmpleados, serviceFutbol } from "../../services/Services.js";

const router = useRouter();

// Estado del header
const isMenuOpen = ref(false);
const isAuthenticated = ref(false);
const isEquiposDropdownOpen = ref(false);
const isUserDropdownOpen = ref(false);
const equipos = ref([]);

onMounted(() => {
  checkAuthentication();
  cargarEquipos();
  // Escuchar cambios en las rutas
  router.afterEach(() => {
    checkAuthentication();
  });
});

const checkAuthentication = () => {
  isAuthenticated.value = serviceEmpleados.isAuthenticated();
};

const cargarEquipos = async () => {
  const data = await serviceFutbol.getEquipos();
  equipos.value = data;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // Cerrar dropdowns si están abiertos
  isEquiposDropdownOpen.value = false;
  isUserDropdownOpen.value = false;
};

const toggleEquiposDropdown = () => {
  isEquiposDropdownOpen.value = !isEquiposDropdownOpen.value;
  isUserDropdownOpen.value = false;
};

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
  isEquiposDropdownOpen.value = false;
};

const closeMenu = () => {
  isMenuOpen.value = false;
  isEquiposDropdownOpen.value = false;
  isUserDropdownOpen.value = false;
};

const closeEquiposDropdown = () => {
  isEquiposDropdownOpen.value = false;
};

const closeUserDropdown = () => {
  isUserDropdownOpen.value = false;
};

const logout = () => {
  serviceEmpleados.logout();
  checkAuthentication();
  closeMenu();
  router.push("/");
};
</script>

<template>
  <!-- Overlay para cerrar dropdowns -->
  <div
    v-if="isEquiposDropdownOpen || isUserDropdownOpen"
    @click="
      closeEquiposDropdown();
      closeUserDropdown();
    "
    class="fixed inset-0 z-40"
  ></div>

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

          <router-link
            to="/jugadores"
            class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
            active-class="text-blue-400"
          >
            Jugadores
          </router-link>

          <!-- Dropdown de Equipos -->
          <div class="relative">
            <button
              @click="toggleEquiposDropdown"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition flex items-center gap-1"
              :class="{ 'text-blue-400': isEquiposDropdownOpen }"
            >
              Equipos
              <svg
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': isEquiposDropdownOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isEquiposDropdownOpen"
              class="absolute top-full left-0 mt-2 w-64 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-50"
            >
              <div class="py-2 max-h-64 overflow-y-auto">
                <router-link
                  v-for="equipo in equipos"
                  :key="equipo.idEquipo"
                  :to="`/equipos/${equipo.idEquipo}`"
                  @click="closeEquiposDropdown"
                  class="flex items-center gap-3 px-4 py-3 text-white hover:bg-zinc-700 transition-colors"
                >
                  <img
                    v-if="equipo.imagen"
                    :src="equipo.imagen"
                    :alt="equipo.nombre"
                    class="w-8 h-8 rounded object-cover"
                    @error="(e) => (e.target.style.display = 'none')"
                  />
                  <div class="flex-1 min-w-0">
                    <div class="font-medium truncate">{{ equipo.nombre }}</div>
                    <div v-if="equipo.champions" class="text-xs text-zinc-400">
                      🏆 {{ equipo.champions }} Champions
                    </div>
                  </div>
                </router-link>

                <div
                  v-if="equipos.length === 0"
                  class="px-4 py-3 text-zinc-400 text-center"
                >
                  No hay equipos disponibles
                </div>
              </div>
            </div>
          </div>

          <template v-if="isAuthenticated">
            <router-link
              to="/subordinados"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              active-class="text-blue-400"
            >
              Subordinados
            </router-link>

            <!-- Dropdown de Usuario -->
            <div class="relative">
              <button
                @click="toggleUserDropdown"
                class="text-white hover:text-blue-400 px-3 py-2 rounded transition flex items-center gap-1"
                :class="{ 'text-blue-400': isUserDropdownOpen }"
              >
                👤 Mi Cuenta
                <svg
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': isUserDropdownOpen }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Dropdown Menu Usuario -->
              <div
                v-if="isUserDropdownOpen"
                class="absolute top-full right-0 mt-2 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-50"
              >
                <div class="py-2">
                  <router-link
                    to="/perfil"
                    @click="closeUserDropdown"
                    class="flex items-center gap-3 px-4 py-3 text-white hover:bg-zinc-700 transition-colors"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Mi Perfil
                  </router-link>

                  <router-link
                    to="/mis-apuestas"
                    @click="closeUserDropdown"
                    class="flex items-center gap-3 px-4 py-3 text-white hover:bg-zinc-700 transition-colors"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    Mis Apuestas
                  </router-link>

                  <router-link
                    to="/crear-apuesta"
                    @click="closeUserDropdown"
                    class="flex items-center gap-3 px-4 py-3 text-white hover:bg-zinc-700 transition-colors"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Crear Apuesta
                  </router-link>

                  <hr class="my-2 border-zinc-700" />

                  <button
                    @click="logout"
                    class="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-zinc-700 transition-colors w-full text-left"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
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

          <router-link
            to="/jugadores"
            class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
            active-class="text-blue-400"
            @click="closeMenu"
          >
            Jugadores
          </router-link>

          <!-- Equipos en menú móvil -->
          <div>
            <button
              @click="toggleEquiposDropdown"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition flex items-center gap-1 w-full text-left"
              :class="{ 'text-blue-400': isEquiposDropdownOpen }"
            >
              Equipos
              <svg
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': isEquiposDropdownOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div v-if="isEquiposDropdownOpen" class="pl-6 space-y-1 mt-2">
              <router-link
                v-for="equipo in equipos"
                :key="equipo.idEquipo"
                :to="`/equipos/${equipo.idEquipo}`"
                @click="closeMenu"
                class="flex items-center gap-3 px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-700 rounded transition-colors"
              >
                <img
                  v-if="equipo.imagen"
                  :src="equipo.imagen"
                  :alt="equipo.nombre"
                  class="w-6 h-6 rounded object-cover"
                  @error="(e) => (e.target.style.display = 'none')"
                />
                <div class="flex-1 min-w-0">
                  <div class="font-medium truncate text-sm">
                    {{ equipo.nombre }}
                  </div>
                </div>
              </router-link>
            </div>
          </div>

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
