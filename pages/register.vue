<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
const schema = yup.object({
  email: yup.string().email().required("Please enter your Email."),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(6, "Your password is too short."),
  confirmPassword: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});
const { errors, defineField, handleSubmit, meta } = useForm({
  validationSchema: schema,
});
const supabase = useSupabaseClient();
const toast = useToast();

const [email, emailProps] = defineField("email");
const [password, passwordProps] = defineField("password");
const [confirmPassword, confirmPasswordProps] = defineField("confirmPassword");

const loading = ref<boolean>(false);
const isSubmitted = ref<boolean>(false);

const signUpWithEmail = handleSubmit(async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    toast.add({ title: "Check your email for the login link!" });
    isSubmitted.value = true;
  } catch (error: any) {
    toast.add({ title: error?.message || "Something went wrong" });
  } finally {
    loading.value = false;
  }
});
</script>
<template>
  <section class="w-1/2 mx-auto mt-20">
    <div class="p-6 rounded-md shadow-md border">
      <h1 class="text-xl mb-6">Register</h1>
      <form class="flex flex-col gap-4" @submit.prevent="signUpWithEmail">
        <div class="flex flex-col gap-1">
          <input
            v-model="email"
            v-bind="emailProps"
            type="email"
            class="t-input"
            placeholder="Email"
          />
          <span v-if="errors.email" class="text-xs font-medium text-red-500">
            {{ errors.email }}
          </span>
        </div>
        <div class="flex flex-col gap-1">
          <input
            type="password"
            v-model="password"
            v-bind="passwordProps"
            class="t-input"
            placeholder="Password"
          />
          <span v-if="errors.password" class="text-xs font-medium text-red-500">
            {{ errors.password }}
          </span>
        </div>
        <div class="flex flex-col gap-1">
          <input
            type="password"
            v-model="confirmPassword"
            v-bind="confirmPasswordProps"
            class="t-input"
            placeholder="Confirm password"
          />
          <span
            v-if="errors.confirmPassword"
            class="text-xs font-medium text-red-500"
          >
            {{ errors.confirmPassword }}
          </span>
        </div>
        <UButton
          size="xl"
          :disabled="!meta.valid || isSubmitted"
          :loading="loading"
          type="submit"
        >
          Submit
        </UButton>
        <p v-if="isSubmitted" class="text-2xl mt-2 font-medium text-green-600">
          Check your email for the login link!
        </p>
      </form>
      <p class="mt-2">
        Aready have an account?
        <NuxtLink to="/login" class="text-primary underline">Login </NuxtLink>
      </p>
    </div>
  </section>
</template>
