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
</script>

<template>
  <div v-if="game">
    <h2>{{ game.name }}</h2>
    <RouterView :gameId="game?.id" />
  </div>
  <div v-else>
    <NotFound />
  </div>
</template>
