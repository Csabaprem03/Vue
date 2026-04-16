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
      {{ favStore.isMessage }}
    </div>
  </div>
  <div v-else>
    <draggable
      v-model="favStore.Favorites"
      v-if="favStore.Favorites"
      v-bind="dragOptions"
      item-key="game_id"
      class="flex flex-col items-center justify-center"
    >
      <template #item="{ element }">
        <div
          class="card-favorite-wrapper rounded-2xl shadow-lg dark:shadow-neutral-50/30 shadow-gray-950/20 w-80 mx-auto my-2.5 hover:outline-2 hover:outline-offset-2 hover:outline-[#24252b] dark:hover:outline-2 dark:hover:outline-offset-2 dark:hover:outline-[#133b43] dark:hover:shadow-blue-950/70 hover:shadow-gray-950/90 transition-shadow duration-300"
        >
          <div class="card-favorite-content">
            <template v-if="FoundGame(element.game_id)">
              <div class="ml-4">
                <img
                  class="w-20 shadow-lg shadow-yellow-700/20 dark:shadow-neutral-50/10 inset-shadow-yellow-600 h-[90px] object-fill"
                  :src="FoundGame(element.game_id)?.cover"
                />
              </div>
              <div
                class="font-bold text-shadow-yellow-600/30 text-center mx-auto p-0 px-3 w-2/3 break-normal text-lg text-shadow-lg/90 dark:text-shadow-blue-950/70 text-shadow--950/70"
              >
                {{ FoundGame(element.game_id)?.name }}
              </div>
              <div class="relative animate-none hover:animate-wiggle">
                <button @click="favStore.ToggleFavorite(element.game_id)">
                  <Icon
                    icon="line-md:close-small"
                    class="text-red-500 w-10 h-10"
                  />
                </button>
              </div>
            </template>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useFavoriteStore } from "../../stores/favoriteStore";
import { useGamesStore } from "../../stores/gamesStore";
import draggable from "vuedraggable";
import { Icon } from "@iconify/vue";
import { useSettingStore } from "../../stores/settingsStore";

const favStore = useFavoriteStore();
const gamesStore = useGamesStore();

const dragOptions = computed(() => ({
  animation: 400,
  ghostClass: "ghost",
  dragClass: "drag",
}));

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
