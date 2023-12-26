<script setup lang="ts">
import { ROLES } from "~/lib/constants/organisation";
const route = useRoute();
const toast = useToast();
const organisationId = route.params.id;
const projectId = route.params.projectId;
const { supabase } = useSupabase();
const text = ref<string>("");
const { data } = await useAsyncData(`project-${projectId}`, async () => {
  const [{ data: project }, { data: role }] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("project_id", projectId)
      .limit(1)
      .single(),
    supabase
      .from("user_organisation")
      .select("roles(key, title)")
      .eq("org_id", organisationId)
      .limit(1)
      .single(),
  ]);
  return { project, role };
});
const projectData = data.value?.project;
const role = data.value?.role?.roles;
if (!projectData?.project_id) {
  throw createError({
    statusCode: 404,
    message: "Please make sure you are the part of organisation",
  });
}
onMounted(() => {
  text.value = projectData?.text || "";
});

const loading = ref(false);

const isEditEnabled = !!role?.key.includes(ROLES.CONTRIBUTOR) || false;
const handleSubmit = async () => {
  try {
    if (!isEditEnabled) throw new Error();
    loading.value = true;
    const { error } = await supabase
      .from("projects")
      .update({
        text: text.value,
      })
      .eq("project_id", projectId);
    if (error) throw new Error();
    toast.add({ title: "Project updated successfully" });
  } catch (error) {
    toast.add({
      title:
        "Something went wrong, make sure you have edit access of this project",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex gap-4 mt-10">
      <h2 class="text-2xl">{{ projectData!.project_name }}</h2>
      <UBadge variant="subtle" size="lg">
        {{ role!.title }}
      </UBadge>
    </div>
    <hr class="my-4" />
    <UTextarea v-model="text" placeholder="Write here..." />
    <UButton
      type="submit"
      icon="i-heroicons-pencil-square"
      color="primary"
      variant="solid"
      :loading="loading"
      :disabled="!isEditEnabled"
      class="mt-4"
      >Update
    </UButton>
  </form>
</template>
