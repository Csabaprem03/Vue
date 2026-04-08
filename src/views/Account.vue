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
      <RouterView v-slot="{ Component, route }">
        <Transition
          name="fade"
          mode="out-in"
          :enter-active-class="route.meta.enterClass"
          :leave-active-class="route.meta.leaveClass"
        >
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Transition } from "vue";
import Card from "../components/pages/Card.vue";
</script>

<style scoped></style>
