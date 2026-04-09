<template>
  <footer
    class="bg-stone-900/10 dark:bg-neutral-50/70 mt-32 mx-auto py-32 grid grid-cols-1 md:grid-cols-3 gap-8"
  >
    <div
      v-for="(col, colindex) in LinkColumns"
      class="col-span-3 lg:col-span-1"
      :key="colindex"
    >
      <section v-for="section in col" class="flex flex-col mb-4">
        <h3
          class="font-medium dark:text-blue-950/60 text-gray-950/80 uppercase opacity-50"
        >
          {{ section.title }}
        </h3>
        <a
          v-for="link in section.links"
          target="_blank"
          :href="link.to"
          class="dark:text-gray-950/70 dark:hover:underline dark:hover:underline-offset-2 dark:hover:decoration-blue-950/60 hover:underline hover:underline-offset-2 hover:decoration-slate-950/70"
          >{{ link.text }}</a
        >
      </section>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import sourceData from "../datas/link.json";
import type { LinkColumn } from "../types";

const LinkColumns = ref<LinkColumn[][]>(
  sourceData.linkcolumns as LinkColumn[][],
);
</script>

<style scoped></style>
