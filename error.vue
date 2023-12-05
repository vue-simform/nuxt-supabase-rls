<script setup>
defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div>
    <NuxtLayout>
      <div class="grid place-items-center text-center mt-10">
        <h2 class="text-xl font-bold">{{ error.message }}</h2>
        <Button text="Go to Home Page" class="mt-2" @click="handleError" />
      </div>
    </NuxtLayout>
  </div>

  <UNotifications />
</template>
