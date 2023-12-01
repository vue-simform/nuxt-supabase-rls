<script setup lang="ts">
const supabase = useSupabaseClient();
const toast = useToast();
const user = useSupabaseUser();
const loading = ref<boolean>(false);
const handleLogout = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    toast.add({ title: "Successfully Logout", color: "red" });
    navigateTo("/login");
  } catch (error: any) {
    toast.add({
      title: error?.message || "Something went wrong",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <header class="bg-primary/20 py-4">
    <nav class="container mx-auto flex items-center justify-between">
      <h2 class="text-lg font-bold">Simform Nuxt + Supabase Template</h2>
      <Button
        v-if="user"
        text="Logout"
        :loading="loading"
        class="bg-red-500 hover:bg-red-400"
        @click="handleLogout"
      />
    </nav>
  </header>
</template>
