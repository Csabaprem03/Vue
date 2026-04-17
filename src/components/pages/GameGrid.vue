<script setup lang="ts">
import { useGamesStore } from "../../stores/gamesStore";
import { slugify } from "../../stores/slugfiy";
import type { Game } from "../../types";
import List from "./List.vue";

const props = defineProps<{ data: Game[] }>();

// a pinia-k használat

const store = useGamesStore();

// a slug vizsgálata és találat

const getFirstType = (id: number) => {
  const found = store.collectibles.find((c) => c.game_id === Number(id));
  return found ? slugify(found.type) : "all";
};
</script>
<template>
  <!-- újrahasznosítás: List.vue, Card.ve és slot használat  -->

  <!-- prophoz ez a GameView.vue komponensnek -->
  <List :items="props.data">
    <template #default="{ item }">
      <!-- a Grid formája  -->
      <div class="mx-auto my-2">
        <RouterLink
          :key="item.id"
          :to="{
            name: 'game.collectibles.type',
            params: {
              slug: slugify(item.name),
              type: getFirstType(item.id),
            },
          }"
        >
          <h1
            class="md:w-max w-auto sm:w-max ml-[2.05rem] text-xl font-bold break-normal text-start dark:hover:bg-blue-950/20 p-1.5 hover:p-1.5 shadow-none hover:shadow-md hover:shadow-neutral-50/20 rounded-nones inset-shadow-none hover:inset-shadow-sm dark:hover:inset-shadow-emerald-950/80 ring-0 hover:ring-1 dark:hover:ring-blue-950/50 hover:inset-shadow-yellow-800/80 hover:bg-gray-800/10 hover:ring-amber-600/20 hover:rounded-2xl"
          >
            {{ item.name }}
          </h1>
        </RouterLink>
      </div>
    </template>
  </List>
</template>
