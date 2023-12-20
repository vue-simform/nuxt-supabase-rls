<script setup lang="ts">
const supabase = useSupabaseClient();
const runtimeConfig = useRuntimeConfig();
const toast = useToast();
const signInWithAzure = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "email",
        redirectTo: `${runtimeConfig.public.host}/confirm`,
      },
    });
    if (error) throw error;
  } catch (error: any) {
    toast.add({
      title: error?.message || "Something went wrong",
      color: "red",
    });
  }
};
</script>

<template>
  <UButton
    size="xl"
    variant="soft"
    type="button"
    block
    class="inline-flex items-center justify-between"
    @click="signInWithAzure"
  >
    Login with Azure
    <img src="~/assets/svgs/azure.svg" alt="Azure Icon" class="h-5" />
  </UButton>
</template>
