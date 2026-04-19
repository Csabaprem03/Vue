<template>
  <div
    v-if="favStore.isLoading || gamesStore.isLoading"
    class="my-15 dark:text-neutral-50/90 text-gray-950/90 flex flex-col flex-wrap items-center"
  >
    <img
      src="../../svg/vecteezy_cute-illustration-designs-for-the-characters-in-the-super_27969806.svg"
      class="h-10 w-10 animate-bounce"
      alt=""
    />
    <div class="flex flex-row flex-wrap">
      <p>Betöltés</p>
      <span class="loading loading-dots loading-sm ml-0.5 my-1"></span>
    </div>
  </div>
  <div v-else-if="favStore.Favorites.length === 0">
    <div class="flex items-center justify-center p-[28.125rem]">
      {{ favStore.isMessage || "Nincsenek kedvencek még." }}
    </div>
  </div>
  <div v-else class="flex flex-col items-center pt-20 pb-10 w-full px-4">
    <h1 class="text-3xl font-bold mb-8 text-center">Kedvenc játékaim</h1>

    <div class="w-full max-w-lg mx-auto">
      <draggable
        v-model="favStore.Favorites"
        item-key="game_id"
        class="flex flex-col gap-4"
        :animation="400"
        @end="favStore.saveToLocalStorage"
      >
        <template #item="{ element }">
          <div class="card-favorite-wrapper mx-auto">
            <div class="card-favorite-content flex items-center gap-4 p-4">
              <img
                v-if="FoundGame(element.game_id)"
                :src="FoundGame(element.game_id)?.cover || defaultImage"
                class="w-20 h-[90px] object-cover rounded shadow"
              />

              <div class="flex-1 font-bold">
                {{ FoundGame(element.game_id)?.name }}
              </div>

              <button
                @click.stop="favStore.ToggleFavorite(element.game_id)"
                class="p-1 cursor-pointer"
              >
                <Icon icon="line-md:close-small" class="text-red-500 w-9 h-9" />
              </button>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useFavoriteStore } from "../../stores/favoriteStore";
import { useGamesStore } from "../../stores/gamesStore";
import draggable from "vuedraggable";
import { Icon } from "@iconify/vue";
import defaultImage from "../../svg/icons8-default-image-50.svg";

const favStore = useFavoriteStore();
const gamesStore = useGamesStore();

const FoundGame = (gameId: number) => {
  return gamesStore.games.find((game) => Number(game.id) === Number(gameId));
};

onMounted(() => {
  if (gamesStore.games.length === 0) {
    gamesStore.GETallgames();
  }
  favStore.GETallFavorites();
});
</script>

<style scoped>
.table-row-group {
  transition: all 0.5s ease;
}

.flip-list-move {
  transition: transform 0.5s ease;
}

.ghost {
  opacity: 0.5;
  background: oklab(0.92 -0.029 -0.031);
}

.no-move {
  transition: transform 0s;
}

.fade-move {
  transition: all 0.5s ease;
}
</style>
