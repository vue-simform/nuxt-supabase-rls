<script setup lang="ts">
const user = useSupabaseUser();
const toast = useToast();
watch(
  user,
  () => {
    if (user.value) {
      toast.add({ title: "Login successful", color: "green" });
      return navigateTo("/");
    }
  },
  { immediate: true }
);
</script>
<template>
  <section class="centered-element">
    <div class="w-full h-full grid place-items-center">
      <div class="flex flex-col items-center gap-1">
        <img
          src="~/assets/svgs/loadingdots.svg"
          alt="Loading Dots"
          class="w-16"
        />
        <h3 class="font-bold">Loading User...</h3>
      </div>
    </div>
  </section>
</template>

<style scoped>
.centered-element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
