<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
const schema = yup.object({
  email: yup.string().email().required("Please enter your Email."),
  password: yup.string().required("Please enter your password."),
});
const { errors, defineField, meta, handleSubmit } = useForm({
  validationSchema: schema,
});
const supabase = useSupabaseClient();
const toast = useToast();
const [email, emailProps] = defineField("email");
const [password, passwordProps] = defineField("password");
const loading = ref<boolean>(false);
const signInWithEmail = handleSubmit(async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    await navigateTo({ name: "organisations" });
    toast.add({ title: "Login successful" });
  } catch (error: any) {
    toast.add({
      title: error?.message || "Something went wrong",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
});
</script>
<template>
  <section class="w-1/2 mx-auto mt-20">
    <div class="p-6 rounded-md shadow-md border">
      <h1 class="text-xl mb-6">Login</h1>
      <form class="flex flex-col gap-4" @submit.prevent="signInWithEmail">
        <div class="flex flex-col gap-1">
          <input
            v-model="email"
            v-bind="emailProps"
            placeholder="Email"
            type="email"
            class="t-input"
          />
          <span v-if="errors.email" class="text-xs font-medium text-red-500">
            {{ errors.email }}
          </span>
        </div>
        <div class="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            v-bind="passwordProps"
            class="t-input"
          />
          <span v-if="errors.password" class="text-xs font-medium text-red-500">
            {{ errors.password }}
          </span>
        </div>
        <UButton
          size="xl"
          :disabled="!meta.valid"
          :loading="loading"
          type="submit"
        >
          Login
        </UButton>
      </form>
      <p class="mt-2">
        Don't have an account?
        <NuxtLink to="/register" class="text-primary underline"
          >Register Now
        </NuxtLink>
      </p>
    </div>
  </section>
</template>
