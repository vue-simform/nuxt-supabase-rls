<script setup lang="ts">
const device = useDevice();
const notificationOptions = {
  ui: {
    position: !device.isMobile ? "bottom-8 top-auto" : "bottom-10 top-auto",
  },
};
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>

  <UNotifications :ui="notificationOptions.ui" />
</template>
