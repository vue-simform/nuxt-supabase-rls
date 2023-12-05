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
      <template v-else>
        <NuxtLink to="/organisations">
          <UButton size="xl">Organisations</UButton>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>
