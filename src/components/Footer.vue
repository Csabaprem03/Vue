<template>
  <footer
    class="bg-stone-900/10 dark:bg-amber-200/80 mt-50 mx-auto py-16 px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
  >
    <div
      v-for="(col, colindex) in LinkColumns"
      class="flex flex-col"
      :key="colindex"
    >
      <section v-for="section in col" class="flex flex-col mb-8">
        <h3
          class="font-extrabold dark:text-gray-950 text-amber-600/75 text-[1.25rem] tracking-widest mb-4 uppercase opacity-70"
        >
          {{ section.title }}
        </h3>
        <div
          class="flex flex-col gap-2"
          :class="{
            'columns-1': section.links.length < 10,
            'md:columns-2 lg:columns-1': section.links.length >= 10,
          }"
        >
          <a
            v-for="link in sortedText(section.links)"
            target="_blank"
            :href="link.to"
            class="transition-all break-all duration-200 dark:text-gray-950/70 dark:hover:underline dark:hover:underline-offset-2 dark:hover:decoration-blue-950/60 hover:underline hover:underline-offset-2 hover:decoration-slate-950/70 decoration-1 text-[0.79rem]"
            >{{ link.text }}</a
          >
        </div>
      </section>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import sourceData from "../datas/link.json";
import type { LinkColumn, LinkItem } from "../types";

const LinkColumns = ref<LinkColumn[][]>(
  sourceData.linkcolumns as LinkColumn[][],
);

const sortedText = (links: LinkItem[]) => {
  return [...links].sort((a, b) => a.text.localeCompare(b.text));
};
</script>

<style scoped></style>
