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
      .select(
        `organisations(org_id, org_name), profiles(first_name), roles(key, title)`
      );
    return data;
  }
);
</script>

<template>
  <div class="flex flex-col gap-3 mt-5">
    <NuxtLink
      :to="`/organisations/${org.organisations?.org_id || ''}`"
      v-for="org in usersOrganisations"
      class="p-5 flex items-center justify-between rounded-xl border hover:bg-slate-100 cursor-pointer transition ease-in duration-300"
    >
      {{ org.organisations!.org_name }}
      <UBadge variant="subtle">
        {{ org.roles!.title }}
      </UBadge>
    </NuxtLink>
  </div>
</template>
