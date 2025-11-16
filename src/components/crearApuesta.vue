<template>
  <div class="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 p-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-4">➕ Crear Apuesta</h1>
        <p class="text-zinc-300 text-lg">Nueva apuesta deportiva</p>
      </div>

      <!-- Formulario de crear apuesta -->
      <div class="bg-zinc-800/50 rounded-lg shadow-xl p-8">
        <form @submit.prevent="crearApuesta" class="space-y-6">
          <!-- Usuario -->
          <div>
            <label
              for="usuario"
              class="block text-sm font-medium text-zinc-300 mb-2"
            >
              Usuario
            </label>
            <input
              v-model="apuesta.usuario"
              type="text"
              id="usuario"
              class="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ingresa el nombre de usuario"
              required
            />
          </div>

          <!-- Resultado -->
          <div>
            <label
              for="resultado"
              class="block text-sm font-medium text-zinc-300 mb-2"
            >
              Resultado
            </label>
            <select
              v-model="apuesta.resultado"
              id="resultado"
              class="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="">Selecciona el resultado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Ganada">Ganada</option>
              <option value="Perdida">Perdida</option>
            </select>
          </div>

          <!-- Fecha -->
          <div>
            <label
              for="fecha"
              class="block text-sm font-medium text-zinc-300 mb-2"
            >
              Fecha
            </label>
            <input
              v-model="apuesta.fecha"
              type="text"
              id="fecha"
              class="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ejemplo: 2025-11-16"
              required
            />
          </div>

          <!-- Botones -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6">
            <router-link
              to="/mis-apuestas"
              class="flex-1 bg-zinc-600 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
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
              Cancelar
            </router-link>

            <button
              type="submit"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Crear Apuesta
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { serviceApuestas } from "../services/Services.js";

const router = useRouter();

// Estado del formulario
const apuesta = ref({
  usuario: "",
  resultado: "",
  fecha: "",
});

const crearApuesta = async () => {
  await serviceApuestas.createApuesta(apuesta.value);
  router.push("/mis-apuestas");
};
</script>
