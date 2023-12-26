<script setup lang="ts">
import Hamburger from "./common/button/Hamburger.vue";

const supabase = useSupabaseClient();
const toast = useToast();
const user = useSupabaseUser();
const loading = ref<boolean>(false);
const handleLogout = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    toast.add({ title: "Successfully Logout", color: "red" });
    navigateTo("/login");
  } catch (error: any) {
    toast.add({
      title: error?.message || "Something went wrong",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
};

const menu = ref([
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Organisations",
    link: "/organisations",
  },
]);

const menuOpen = ref(false);
const handleMenuClicked = () => {
  menuOpen.value = !menuOpen.value;
};
const handleCloseMenu = () => {
  menuOpen.value = false;
};
</script>

<template>
  <header class="bg-primary/20 py-4 px-2">
    <nav class="container mx-auto flex items-center justify-between">
      <h2 class="md:text-lg font-bold">Simform Nuxt + Supabase Template</h2>
      <!-- WEB -->
      <div class="hidden md:flex items-center gap-2">
        <template v-for="item in menu" :key="item.title">
          <NuxtLink :to="item.link">
            <UButton variant="link" size="xl">
              {{ item.title }}
            </UButton>
          </NuxtLink>
        </template>
        <UButton
          v-if="user"
          :loading="loading"
          color="red"
          leading-icon="i-heroicons-arrow-right-on-rectangle-20-solid"
          @click="handleLogout"
          >Logout
        </UButton>
      </div>
      <!-- WEB -->

      <!-- MOBILE -->
      <div class="block md:hidden">
        <Hamburger :open="menuOpen" @toggle="handleMenuClicked" />
        <div
          v-if="menuOpen"
          aria-hidden="true"
          @click="handleCloseMenu"
          class="h-screen w-screen absolute top-0 left-0 z-20"
        >
          <div
            class="absolute top-10 right-2 bg-white p-2 border rounded-md flex flex-col gap-2"
          >
            <template v-for="item in menu" :key="item.title">
              <NuxtLink
                :to="item.link"
                active-class="border border-primary rounded-md"
              >
                <UButton variant="soft" size="md" block>
                  {{ item.title }}
                </UButton>
              </NuxtLink>
            </template>
            <UButton
              v-if="user"
              :loading="loading"
              variant="soft"
              color="red"
              leading-icon="i-heroicons-arrow-right-on-rectangle-20-solid"
              @click="handleLogout"
              >Logout
            </UButton>
          </div>
        </div>
      </div>
      <!-- MOBILE -->
    </nav>
  </header>
</template>
