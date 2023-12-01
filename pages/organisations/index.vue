<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const { supabase } = useSupabase();

const { data: usersOrganisations } = await useAsyncData(
  "users-organisations",
  async () => {
    const { data } = await supabase
      .from("user_organisation")
      .select(`organisations (org_name), roles (key, title)`);
    return data;
  }
);
</script>

<template>
  <div class="flex flex-col gap-3 mt-5">
    <h2>Hello</h2>
    {{ usersOrganisations }}
  </div>
</template>
