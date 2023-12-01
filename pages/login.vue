<script setup lang="ts">
const supabase = useSupabaseClient();
const toast = useToast();
const state = reactive<Record<string, string>>({
  email: "iamsushil303@gmail.com",
  password: "test@12345",
});
const loading = ref<boolean>(false);

const signInWithEmail = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });
    if (error) throw error;
    await navigateTo({ path: "/organisations" });
    toast.add({ title: "Login successful" });
  } catch (error: any) {
    toast.add({ title: error?.message || "Something went wrong" });
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <section class="w-1/2 mx-auto mt-20">
    <div class="p-6 rounded-md shadow-md border">
      <h1 class="text-xl mb-6">Login</h1>
      <form class="flex flex-col gap-4" @submit.prevent="signInWithEmail">
        <input v-model="state.email" type="email" class="t-input" />
        <input type="password" v-model="state.password" class="t-input" />
        <Button
          type="submit"
          text="Login"
          loading-text="Loading..."
          :loading="loading"
        />
      </form>
      <p class="mt-2">
        Don't have an account?
        <NuxtLink to="/register" class="text-blue-600 underline"
          >Register Now
        </NuxtLink>
      </p>
    </div>
  </section>
</template>
