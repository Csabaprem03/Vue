<script setup lang="ts">
import GameGrid from "../components/pages/GameGrid.vue";
import GameCard from "../components/pages/GameCard.vue";
import { useSettingStore } from "../stores/settingsStore";
import { useGamesStore } from "../stores/gamesStore";
import { useGamesFilterPanel } from "../components/composables/useGamesFilterPanel";
import GamesFiltered from "../components/pages/GamesFiltered.vue";
import SkeletonLoading from "../components/pages/SkeletonLoading.vue";
import MessagePanel from "../components/validators/MessagePanel.vue";
import { useFavoriteStore } from "../stores/favoriteStore";

const store = useGamesStore();
const setting = useSettingStore();
const favStore = useFavoriteStore();
const {
  FilteredGamesOrder,
  allGenre,
  allplatform,
  filteredActive,
  resetGame,
  applyFiltered,
} = useGamesFilterPanel(store.games);

//watchEffect(()=>
//     applyFiltered(filteredActive.value)
// )

store.GETallgames();
// applyFiltered(filteredActive.value)
</script>

<template>
  <div class="w-full mx-w-[1480px] mx-auto py-4 px-4">
    <GamesFiltered
      :settings="setting"
      :genres="allGenre"
      :platforms="allplatform"
      v-model="filteredActive"
      @reset="resetGame"
      @apply="applyFiltered"
    />
    <MessagePanel
      :show="!!favStore.isMessage"
      :message="favStore.isMessage"
      @close="favStore.isMessage = null"
    />

    <div
      v-if="store.isLoading"
      :class="[
        'my-4 mx-4',
        setting.isGrid
          ? 'grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-3'
          : 'flex flex-column flex-wrap order-5 gap-5',
      ]"
    >
      <SkeletonLoading v-for="n in store.games.length" :key="n" />
    </div>

    <template v-else>
      <div
        v-if="setting.isGrid"
        class="my-4 mx-4 grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-3"
      >
        <GameGrid :data="FilteredGamesOrder" />
      </div>
      <div v-else class="my-4 mx-4 flex flex-column flex-wrap order-5 gap-5">
        <GameCard :data="FilteredGamesOrder" />
      </div>
    </template>
  </div>
</template>
