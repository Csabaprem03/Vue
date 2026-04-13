<script setup lang="ts">
import { computed } from "vue";
import { useGamesStore } from "../../stores/gamesStore";
import { slugify } from "../../stores/slugfiy";
import NotFound from "../pages/NotFound.vue";

const props = defineProps<{ slug: string }>();
const store = useGamesStore();

if (store.games.length === 0) {
  store.GETallgames();
}
store.GETallcollectibles();
const game = computed(() => {
  return store.games.find((g) => slugify(g.name) === props.slug);
});

console.log("URL slug:", props.slug);
console.log(
  "Store games:",
  store.games.map((g) => slugify(g.name)),
);
</script>

<template>
  <div v-if="game">
    <h2
      class="text-center text-5xl mt-5 font-extralight text-shadow-lg/20 dark:text-shadow-blue-950/90 text-shadow-yellow-700/80"
    >
      {{ game.name }}
    </h2>

    <RouterView
      :gameId="game?.id"
      class="mx-auto flex flex-col items-center h-dvh"
    />
  </div>

  <div v-else>
    <NotFound />
  </div>
</template>
