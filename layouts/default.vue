<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="grow md:container mx-2 md:mx-auto">
      <slot />
    </main>
    <Footer />
  </div>
</template>
