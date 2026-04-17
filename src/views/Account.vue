<template>
  <div class="mt-[2.50rem]">
    <section
      class="card mx-auto mb-1.5 w-[18.125rem] flex items-center justify-center border border-b border-gray-950/20 inset-shadow-2xs dark:inset-shadow-emerald-600/20 inset-shadow-yellow-600/40 dark:shadow-neutral-50/20 py-4.5 rounded-3xl shadow-lg"
    >
      <div class="flex flex-col gap-y-2">
        <h2
          class="card-title font-black opacity-100 text-neutral-950/80 dark:text-neutral-100/70 text-[1.15rem]"
        >
          Szemelyés adatok:
        </h2>
        <h1 class="text-neutral-950/80 dark:text-neutral-100/70 text-[1.05rem]">
          Név:
        </h1>
        <p
          class="text-[0.85rem] font-normal text-neutral-950/80 dark:text-neutral-100/70 break-all leading-tight"
        >
          {{ authStore.userName }}
        </p>
        <h1 class="text-neutral-950/80 dark:text-neutral-100/70 text-[1.05rem]">
          Email:
        </h1>
        <p
          class="text-[0.85rem] font-normal text-neutral-950/80 dark:text-neutral-100/70 break-all leading-tight"
        >
          {{ authStore.userEmail }}
        </p>
      </div>
    </section>
    <Card class="rounded-4xl">
      <div class="mx-auto my-3.5 grid grid-cols-3 gap-5">
        <RouterLink
          class="p-5 py-6 md:py-3 btn btn-sm btn-outline dark:hover:text-neutral-950/100 dark:hover:bg-neutral-100/80 shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
          :to="{ name: 'publisher' }"
          >Videojáték-kiadó</RouterLink
        >
        <RouterLink
          class="p-5 py-6 md:py-3 btn btn-sm btn-outline dark:hover:text-neutral-950/100 dark:hover:bg-neutral-100/80 shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
          :to="{ name: 'games.post' }"
          >Videojáték-kiadó: Játék</RouterLink
        >
        <RouterLink
          class="p-5 py-6 md:py-3 btn btn-sm btn-outline dark:hover:text-neutral-950/100 dark:hover:bg-neutral-100/80 shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
          :to="{ name: 'collectibles.post' }"
          >Videojáték-kiadó: Gyűjthető dolog</RouterLink
        >
      </div>
    </Card>
    <div class="mt-5.5">
      <RouterView v-slot="{ Component, route }">
        <Transition
          name="fade"
          mode="out-in"
          :enter-active-class="
            (route.meta.enterClass as string) ||
            'animate__animated animate__fadeIn'
          "
          :leave-active-class="
            (route.meta.enterClass as string) ||
            'animate__animated animate__fadeIn'
          "
        >
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Transition } from "vue";
import Card from "../components/pages/Card.vue";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
</script>

<style scoped></style>
