<template>
  <div>
    <Card class="rounded-4xl">
      <div class="mx-auto my-3.5 grid grid-cols-3 gap-5">
        <RouterLink
          class="p-5 py-6 md:py-3 btn btn-sm btn-outline dark:btn-primary shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
          :to="{ name: 'publisher' }"
          >Videojáték-kiadó</RouterLink
        >
        <RouterLink
          class="p-5 py-6 md:py-3 btn btn-sm btn-outline dark:btn-primary shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
          :to="{ name: 'games.post' }"
          >Videojáték-kiadó: Játék</RouterLink
        >
        <RouterLink
          class="p-5 py-6 md:py-3 btn btn-sm btn-outline dark:btn-primary shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
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
</script>

<style scoped></style>
