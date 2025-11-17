<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { serviceEmpleados, serviceFutbol } from "../../services/Services.js";

const router = useRouter();

// ESTADO DEL HEADER -
const isMobileMenuOpen = ref(false);
const isAuthenticated = ref(false);
const isPrimaryDropdownOpen = ref(false);
const isUserDropdownOpen = ref(false);
const equipos = ref([]);

onMounted(() => {
  checkAuthentication();
  loadPrimaryData();
  // Escuchar cambios en las rutas
  router.afterEach(() => {
    checkAuthentication();
  });
});

// MÉTODOS DE AUTENTICACIÓN -
const checkAuthentication = () => {
  isAuthenticated.value = serviceEmpleados.isAuthenticated();
};

// MÉTODOS DE DATOS -
const loadPrimaryData = async () => {
  const data = await serviceFutbol.getEquipos();
  equipos.value = data;
};

// MÉTODOS DROPDOWN - GENÉRICOS PARA COPIAR
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  isPrimaryDropdownOpen.value = false;
  isUserDropdownOpen.value = false;
};

const togglePrimaryDropdown = () => {
  isPrimaryDropdownOpen.value = !isPrimaryDropdownOpen.value;
  isUserDropdownOpen.value = false;
};

const toggleSecondaryDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
  isPrimaryDropdownOpen.value = false;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  isPrimaryDropdownOpen.value = false;
  isUserDropdownOpen.value = false;
};

const closePrimaryDropdown = () => {
  isPrimaryDropdownOpen.value = false;
};

const closeSecondaryDropdown = () => {
  isUserDropdownOpen.value = false;
};

const closeAllDropdowns = () => {
  isPrimaryDropdownOpen.value = false;
  isUserDropdownOpen.value = false;
};

// MÉTODOS ADICIONALES
const handleImageError = (event) => {
  event.target.style.display = "none";
};

const logout = () => {
  serviceEmpleados.logout();
  checkAuthentication();
  closeMobileMenu();
  router.push("/");
};
</script>

<template>
  <!-- Overlay para cerrar dropdowns -->
  <div
    v-if="isPrimaryDropdownOpen || isUserDropdownOpen"
    @click="closeAllDropdowns"
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
              @click="togglePrimaryDropdown"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition flex items-center gap-1"
              :class="{ 'text-blue-400': isPrimaryDropdownOpen }"
            >
              Equipos
              <svg
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': isPrimaryDropdownOpen }"
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

            <!-- Dropdown Menu Equipos -->
            <div
              v-if="isPrimaryDropdownOpen"
              class="absolute top-full left-0 mt-2 w-64 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
            >
              <div class="py-2">
                <router-link
                  v-for="equipo in equipos"
                  :key="equipo.idEquipo"
                  :to="`/equipos/${equipo.idEquipo}`"
                  @click="closePrimaryDropdown"
                  class="flex items-center gap-3 px-4 py-3 text-white hover:bg-zinc-700 transition-colors"
                >
                  <img
                    v-if="equipo.imagen"
                    :src="equipo.imagen"
                    :alt="equipo.nombre"
                    class="w-8 h-8 rounded object-cover shrink-0"
                    @error="handleImageError"
                  />
                  <div
                    v-else
                    class="w-8 h-8 bg-zinc-600 rounded flex items-center justify-center shrink-0"
                  >
                    ⚽
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium truncate">{{ equipo.nombre }}</div>
                  </div>
                </router-link>

                <div
                  v-if="equipos.length === 0"
                  class="px-4 py-3 text-zinc-400"
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
                @click="toggleSecondaryDropdown"
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
                    @click="closeSecondaryDropdown"
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
                    @click="closeSecondaryDropdown"
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
                    @click="closeSecondaryDropdown"
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
          @click="toggleMobileMenu"
          :class="{ 'text-blue-400': isMobileMenuOpen }"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isMobileMenuOpen"
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

      <div v-if="isMobileMenuOpen" class="md:hidden pb-4">
        <div class="flex flex-col space-y-2">
          <router-link
            to="/"
            class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
            active-class="text-blue-400"
            exact
            @click="closeMobileMenu"
          >
            Inicio
          </router-link>

          <router-link
            to="/jugadores"
            class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
            active-class="text-blue-400"
            @click="closeMobileMenu"
          >
            Jugadores
          </router-link>

          <!-- Equipos en menú móvil -->
          <div>
            <button
              @click="togglePrimaryDropdown"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition flex items-center gap-1 w-full text-left"
              :class="{ 'text-blue-400': isPrimaryDropdownOpen }"
            >
              Equipos
              <svg
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': isPrimaryDropdownOpen }"
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

            <div v-if="isPrimaryDropdownOpen" class="pl-6 space-y-1 mt-2">
              <router-link
                v-for="equipo in equipos"
                :key="equipo.idEquipo"
                :to="`/equipos/${equipo.idEquipo}`"
                @click="closeMobileMenu"
                class="flex items-center gap-3 px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-700 rounded transition-colors"
              >
                <img
                  v-if="equipo.imagen"
                  :src="equipo.imagen"
                  :alt="equipo.nombre"
                  class="w-6 h-6 rounded object-cover"
                  @error="handleImageError"
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
              @click="closeMobileMenu"
            >
              Mi Perfil
            </router-link>

            <router-link
              to="/subordinados"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              active-class="text-blue-400"
              @click="closeMobileMenu"
            >
              Subordinados
            </router-link>

            <router-link
              to="/mis-apuestas"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              active-class="text-blue-400"
              @click="closeMobileMenu"
            >
              Mis Apuestas
            </router-link>

            <router-link
              to="/crear-apuesta"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              active-class="text-blue-400"
              @click="closeMobileMenu"
            >
              Crear Apuesta
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
              @click="closeMobileMenu"
            >
              Iniciar Sesión
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>
