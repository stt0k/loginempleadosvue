<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { serviceEmpleados } from "../services/Services.js";

const router = useRouter();

// Datos reactivos
const subordinados = ref([]);

// Verificar si está autenticado al montar el componente
onMounted(async () => {
  if (!serviceEmpleados.isAuthenticated()) {
    router.push("/login");
    return;
  }
  await cargarSubordinados();
});

// Función para cargar los subordinados
const cargarSubordinados = async () => {
  subordinados.value = await serviceEmpleados.getSubordinados();
};
</script>

<template>
  <div class="min-h-screen px-6 py-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">Mis Subordinados</h1>
        <p class="text-gray-300 mt-2">Empleados bajo mi supervisión</p>
      </div>

      <!-- Sin subordinados -->
      <div v-if="subordinados.length === 0" class="text-center py-12">
        <div class="bg-zinc-800/30 border border-white/10 rounded-lg p-8">
          <svg
            class="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 class="text-lg font-medium text-white mb-2">
            No tienes subordinados
          </h3>
          <p class="text-gray-300">
            No hay empleados bajo tu supervisión en este momento.
          </p>
        </div>
      </div>

      <!-- Lista de subordinados en tabla -->
      <div
        v-else
        class="bg-zinc-800/30 border border-white/10 rounded-lg overflow-hidden mb-6"
      >
        <table class="w-full">
          <thead class="bg-zinc-900/50">
            <tr>
              <th class="px-4 py-3 text-left text-white">ID</th>
              <th class="px-4 py-3 text-left text-white">Apellido</th>
              <th class="px-4 py-3 text-left text-white">Oficio</th>
              <th class="px-4 py-3 text-left text-white">Salario</th>
              <th class="px-4 py-3 text-left text-white">Director</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="subordinado in subordinados"
              :key="subordinado.idEmpleado"
              class="border-t border-white/10 hover:bg-zinc-700/30"
            >
              <td class="px-4 py-3 text-white">{{ subordinado.idEmpleado }}</td>
              <td class="px-4 py-3 text-white font-medium">
                {{ subordinado.apellido }}
              </td>
              <td class="px-4 py-3 text-white">{{ subordinado.oficio }}</td>
              <td class="px-4 py-3 text-green-400 font-semibold">
                {{ subordinado.salario }}
              </td>
              <td class="px-4 py-3 text-white">
                {{ subordinado.director || "N/A" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Acciones inferiores -->
      <div class="mt-8 text-center">
        <router-link
          to="/perfil"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors mr-4"
        >
          Mi Perfil
        </router-link>
        <router-link
          to="/"
          class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Ir al Inicio
        </router-link>
      </div>
    </div>
  </div>
</template>
