<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { serviceFutbol } from "../services/Services.js";

// Composables
const route = useRoute();

// Estado
const jugador = ref(null);

// Cargar detalles del jugador al montar el componente
onMounted(() => {
  cargarDetallesJugador();
});

const cargarDetallesJugador = async () => {
  const id = route.params.id;
  const data = await serviceFutbol.getJugadorById(id);
  jugador.value = data;
};

// Manejar errores de imagen
const handleImageError = (event) => {
  event.target.src = "https://via.placeholder.com/128x128/4a5568/ffffff?text=?";
};
</script>

<template>
  <div class="min-h-screen bg-zinc-900 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Botón de regreso -->
      <div class="mb-6">
        <router-link
          to="/jugadores"
          class="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver a Jugadores
        </router-link>
      </div>

      <!-- Contenido del jugador -->
      <div
        v-if="jugador"
        class="bg-zinc-800/50 rounded-lg shadow-xl overflow-hidden"
      >
        <!-- Header con imagen y nombre -->
        <div class="bg-zinc-700/50 px-8 py-6">
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="shrink-0">
              <img
                :src="jugador.imagen"
                :alt="jugador.nombre"
                class="w-32 h-32 rounded-full object-cover border-4 border-zinc-600"
                @error="handleImageError"
              />
            </div>
            <div class="text-center md:text-left">
              <h1 class="text-4xl font-bold text-white mb-2">
                {{ jugador.nombre }}
              </h1>
              <div class="flex flex-col md:flex-row gap-4 items-center">
                <span
                  class="px-4 py-2 text-sm font-semibold rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30"
                >
                  {{ jugador.posicion }}
                </span>
                <div class="text-zinc-300 text-lg">🌍 {{ jugador.pais }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detalles del jugador -->
        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Información básica -->
            <div class="space-y-4">
              <h2 class="text-2xl font-semibold text-white mb-4">
                📋 Información Básica
              </h2>

              <div class="bg-zinc-700/30 rounded-lg p-4">
                <label class="text-zinc-400 text-sm font-medium"
                  >ID Jugador</label
                >
                <p class="text-white text-lg font-semibold">
                  {{ jugador.idJugador }}
                </p>
              </div>

              <div class="bg-zinc-700/30 rounded-lg p-4">
                <label class="text-zinc-400 text-sm font-medium"
                  >Nombre Completo</label
                >
                <p class="text-white text-lg font-semibold">
                  {{ jugador.nombre }}
                </p>
              </div>

              <div class="bg-zinc-700/30 rounded-lg p-4">
                <label class="text-zinc-400 text-sm font-medium"
                  >Posición</label
                >
                <p class="text-white text-lg font-semibold">
                  {{ jugador.posicion }}
                </p>
              </div>
            </div>

            <!-- Información adicional -->
            <div class="space-y-4">
              <h2 class="text-2xl font-semibold text-white mb-4">
                🌟 Información Adicional
              </h2>

              <div class="bg-zinc-700/30 rounded-lg p-4">
                <label class="text-zinc-400 text-sm font-medium"
                  >País de Origen</label
                >
                <p class="text-white text-lg font-semibold">
                  {{ jugador.pais }}
                </p>
              </div>

              <div v-if="jugador.edad" class="bg-zinc-700/30 rounded-lg p-4">
                <label class="text-zinc-400 text-sm font-medium">Edad</label>
                <p class="text-white text-lg font-semibold">
                  {{ jugador.edad }} años
                </p>
              </div>

              <div v-if="jugador.equipo" class="bg-zinc-700/30 rounded-lg p-4">
                <label class="text-zinc-400 text-sm font-medium">Equipo</label>
                <p class="text-white text-lg font-semibold">
                  {{ jugador.equipo }}
                </p>
              </div>
            </div>
          </div>

          <!-- Descripción o biografía si está disponible -->
          <div v-if="jugador.descripcion" class="mt-8">
            <h2 class="text-2xl font-semibold text-white mb-4">
              📖 Descripción
            </h2>
            <div class="bg-zinc-700/30 rounded-lg p-6">
              <p class="text-zinc-300 text-lg leading-relaxed">
                {{ jugador.descripcion }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-else class="text-center py-12">
        <div class="text-zinc-400 text-lg">
          ⏳ Cargando detalles del jugador...
        </div>
      </div>
    </div>
  </div>
</template>
