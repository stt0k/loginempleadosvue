<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { serviceEmpleados } from "../services/Services.js";

const router = useRouter();

// Datos reactivos
const empleado = ref(null);

// Verificar si está autenticado al montar el componente
onMounted(async () => {
  if (!serviceEmpleados.isAuthenticated()) {
    router.push("/login");
    return;
  }
  await cargarPerfil();
});

// Función para cargar el perfil del empleado
const cargarPerfil = async () => {
  empleado.value = await serviceEmpleados.getPerfil();
};
</script>

<template>
  <div class="min-h-screen px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">Mi Perfil</h1>
        <p class="text-gray-300 mt-2">Información del empleado</p>
      </div>

      <!-- Perfil del empleado -->
      <div
        v-if="empleado"
        class="bg-zinc-800/30 border border-white/10 rounded-lg p-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Información personal -->
          <div class="space-y-4">
            <h2
              class="text-xl font-semibold text-white border-b border-white/10 pb-2"
            >
              Información Personal
            </h2>

            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-400"
                  >ID Empleado</label
                >
                <p class="text-white text-lg">{{ empleado.idEmpleado }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-400"
                  >Apellido</label
                >
                <p class="text-white text-lg">{{ empleado.apellido }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-400"
                  >Oficio</label
                >
                <p class="text-white text-lg">{{ empleado.oficio }}</p>
              </div>
            </div>
          </div>

          <!-- Información laboral -->
          <div class="space-y-4">
            <h2
              class="text-xl font-semibold text-white border-b border-white/10 pb-2"
            >
              Información Laboral
            </h2>

            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-400"
                  >Salario</label
                >
                <p class="text-white text-lg font-semibold">
                  {{ empleado.salario }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-400"
                  >Director</label
                >
                <p class="text-white text-lg">
                  {{ empleado.director || "N/A" }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Acciones -->
        <div class="mt-8 pt-6 border-t border-white/10">
          <div class="flex flex-wrap gap-4">
            <router-link
              to="/subordinados"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Ver Subordinados
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
    </div>
  </div>
</template>
