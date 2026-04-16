<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useGamesStore } from "../../stores/gamesStore";
import { slugify } from "../../stores/slugfiy";
import NotFound from "../pages/NotFound.vue";

const props = defineProps<{ slug: string }>();
const store = useGamesStore();

onMounted(async () => {
  if (store.games.length === 0) {
    await store.GETallgames();
  }
  await store.GETallcollectibles();
});
const game = computed(() => {
  const found = store.games.find((g) => slugify(g.name) === props.slug);

  if (!found && store.games.length > 0) {
    console.error("DEBUG: Nincs találat erre a slugra:", props.slug);
    console.log(
      "Elérhető slugok a store-ban:",
      store.games.map((g) => slugify(g.name)),
    );
  }
  return found;
});
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
