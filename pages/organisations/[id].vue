<script setup>
const route = useRoute();
const orgId = route.params.id;
const { supabase } = useSupabase();
const { data: organisation } = await useAsyncData(
  `organisation-${orgId}`,
  async () => {
    const { data } = await supabase
      .from("organisations")
      .select()
      .eq("org_id", orgId)
      .single();
    return data;
  }
);
</script>

<template>
  <div>
    <h2 class="mt-5 text-2xl">
      Organisations Name:
      <span class="font-bold">
        {{ organisation.org_name }}
      </span>
    </h2>
    <hr class="my-2" />
    <div>
      <h2 class="text-xl font-bold">List of Projects</h2>
      <ul>
        <li>project #1</li>
        <li>project #2</li>
      </ul>
    </div>
  </div>
</template>
