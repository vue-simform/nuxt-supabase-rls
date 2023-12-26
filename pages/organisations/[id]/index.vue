<script setup lang="ts">
const route = useRoute();
const orgId = route.params.id;
const { supabase } = useSupabase();
const { data } = await useAsyncData(`organisation-${orgId}`, async () => {
  const [{ data: organisation }, { data: projects }] = await Promise.all([
    supabase
      .from("user_organisation")
      .select("organisations(org_id, org_name), roles(key, title)")
      .eq("org_id", orgId)
      .limit(1)
      .single(),
    supabase.from("org_project").select("projects(*)").eq("org_id", orgId),
  ]);
  return { organisation, projects };
});
if (!data.value?.organisation) {
  throw createError({
    statusCode: 404,
    message: "Please make sure you are the part of organisation",
  });
}
const organisation = data.value.organisation.organisations;
const orgRole = data.value.organisation.roles;
const projects = data.value.projects;
</script>

<template>
  <div class="mt-5 text-lg md:text-2xl flex items-center justify-between">
    <h2>
      Organisations Name:
      <span class="font-bold">
        {{ organisation!.org_name }}
      </span>
    </h2>
    <UBadge variant="subtle">
      {{ orgRole!.title }}
    </UBadge>
  </div>
  <hr class="my-3" />
  <div>
    <h2 class="md:text-xl font-bold mb-3">List of Projects</h2>
    <ul class="flex flex-col gap-3">
      <NuxtLink
        v-for="{ projects: project } in projects"
        :to="`/organisations/${orgId}/projects/${project!.project_id}`"
        class="p-5 flex items-center justify-between rounded-xl border hover:bg-slate-100 cursor-pointer transition ease-in duration-300"
        :key="project!.project_id"
      >
        {{ project!.project_name }}
      </NuxtLink>
    </ul>
  </div>
</template>
