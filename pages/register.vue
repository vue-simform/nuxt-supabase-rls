<script setup lang="ts">
const supabase = useSupabaseClient();
const toast = useToast();
const state = reactive<Record<string, string>>({
  email: "iamsushil303@gmail.com",
  password: "test@12345",
});
const loading = ref<boolean>(false);

const signUpWithEmail = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signUp({
      email: state.email,
      password: state.password,
    });
    if (error) throw error;
    toast.add({ title: "Check your email for the login link!" });
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
      <h1 class="text-xl mb-6">Register</h1>
      <form class="flex flex-col gap-4" @submit.prevent="signUpWithEmail">
        <input v-model="state.email" type="email" class="t-input" />
        <input type="password" v-model="state.password" class="t-input" />
        <Button
          type="submit"
          text="Sign Up"
          loading-text="Loading..."
          :loading="loading"
        />
      </form>
      <p class="mt-2">
        Aready have an account?
        <NuxtLink to="/login" class="text-blue-600 underline">Login </NuxtLink>
      </p>
    </div>
  </section>
</template>
