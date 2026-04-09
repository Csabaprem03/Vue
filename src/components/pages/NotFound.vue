<template>
  <div class="flex flex-col items-center justify-center m-4">
    <Icon icon="nrk:404" class="w-30 h-30" />
    <p
      class="my-2 font-light italic text-shadow-2xs dark:text-shadow-blue-950/70 text-shadow-yellow-700/20"
    >
      Nincs találat
    </p>
    <RouterLink
      class="animate-none hover:animate-wiggle btn btn-outline dark:btn-primary hover:text-neutral-50 shadow-lg dark:shadow-neutral-50/20 dark:inset-shadow-2xs dark:inset-shadow-neutral-50/90 shadow-gray-950/50 inset-shadow-2xs inset-shadow-yellow-600/70 my-[48.23px]"
      to="/games"
      >Vissza a listához</RouterLink
    >
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { RouterLink } from "vue-router";
</script>

<style scoped></style>
