<template>
  <div class="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 p-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-4">🎰 Mis Apuestas</h1>
        <p class="text-zinc-300 text-lg">Historial de tus apuestas</p>
      </div>

      <!-- Tabla de apuestas -->
      <div class="bg-zinc-800/50 rounded-lg shadow-xl overflow-hidden mb-8">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-zinc-700/50">
              <tr>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                >
                  Usuario
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                >
                  Resultado
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                >
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-700/50">
              <tr
                v-for="apuesta in apuestas"
                :key="apuesta.idApuesta"
                class="hover:bg-zinc-700/30 transition-colors"
              >
                <td class="px-6 py-4">
                  <div class="text-white font-medium">
                    #{{ apuesta.idApuesta }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-white font-medium">
                    {{ apuesta.usuario }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="px-3 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-green-600/20 text-green-400 border border-green-500/30':
                        apuesta.resultado === 'Ganada',
                      'bg-red-600/20 text-red-400 border border-red-500/30':
                        apuesta.resultado === 'Perdida',
                      'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30':
                        apuesta.resultado === 'Pendiente',
                    }"
                  >
                    {{ apuesta.resultado }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="text-zinc-300">{{ apuesta.fecha }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mensaje cuando no hay apuestas -->
        <div v-if="apuestas.length === 0" class="text-center py-12">
          <div class="text-zinc-400 text-lg">
            🎯 No has realizado apuestas aún
          </div>
          <div class="text-zinc-500 text-sm mt-2">
            ¡Crea tu primera apuesta y comienza a jugar!
          </div>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/perfil"
          class="bg-zinc-600 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
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
          Volver al Perfil
        </router-link>

        <router-link
          to="/crear-apuesta"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Crear Nueva Apuesta
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { serviceApuestas } from "../services/Services.js";

// Estado del componente
const apuestas = ref([]);

// Cargar apuestas al montar el componente
onMounted(() => {
  cargarApuestas();
});

const cargarApuestas = async () => {
  const data = await serviceApuestas.getApuestas();
  apuestas.value = data;
};
</script>
