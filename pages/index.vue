<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <div class="text-center mt-10 bg-slate-100 rounded-md p-6">
    <h1 class="text-6xl">Nuxt + Supabase</h1>
    <div class="flex justify-center gap-3 mt-4">
      <template v-if="!user">
        <NuxtLink to="/login">
          <UButton size="xl"> Login </UButton>
        </NuxtLink>
        <NuxtLink to="/register">
          <UButton size="xl"> Register </UButton>
        </NuxtLink>
      </template>
      <div v-else class="flex flex-col gap-2">
        <h3 class="text-xl font-bold">
          Hello, {{ user.email }}. Have a good day.
        </h3>
        <NuxtLink to="/organisations">
          <UButton size="xl">Organisations</UButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
