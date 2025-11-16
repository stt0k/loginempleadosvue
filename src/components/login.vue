<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { serviceEmpleados } from "../services/Services.js";

const router = useRouter();

const credentials = ref({
  userName: '',
  password: '',
});

const login = async () => {
  const user = {
    userName: credentials.value.userName,
    password: credentials.value.password,
  };
  const token = await serviceEmpleados.getToken(user);
  localStorage.setItem('token', token);
  await router.push('/perfil');
};
</script>

<template>
  <div class="max-w-md mx-auto p-6">
    <h2 class="text-2xl font-semibold text-white text-center mb-8">Iniciar Sesión</h2>

    <div class="bg-zinc-800/30 border border-white/10 rounded-lg p-6">
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="userName" class="block text-white mb-2">Usuario:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            v-model="credentials.userName"
            required
            class="w-full px-3 py-2 bg-zinc-700/50 border border-white/20 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-white mb-2">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="credentials.password"
            required
            class="w-full px-3 py-2 bg-zinc-700/50 border border-white/20 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Iniciar Sesión
        </button>
      </form>

      <div class="mt-6 text-center">
        <router-link 
          to="/" 
          class="text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>
