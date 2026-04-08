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
import { Icon } from "@iconify/vue";

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
      v-if="!store.isLoading && store.games.length === 0"
      class="flex flex-col justify-center items-center"
    >
      <div class="card my-1.5 mx-auto">
        <div class="card-body my-3">
          <Icon icon="mdi:server" class="w-20 h-20" />
          <p class="text-sm dark:text-neutral-50 text-gray-950">
            A szerver nem válaszol
          </p>
          <button
            @click="store.GETallgames"
            class="btn btn-sm btn-outline dark:btn-primary shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
          >
            Töltsd újra!!!
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="store.games.length > 0 && FilteredGamesOrder.length === 0"
      class="flex flex-col justify-center items-center"
    >
      <div class="card my-1.5 mx-auto">
        <div class="card-body my-3">
          <Icon icon="line-md:filter-off" class="w-20 h-20 my-4 mx-auto" />
          <p class="my-4 text-sm dark:text-neutral-50 text-gray-950">
            Nem a szűrésnek megfelelője játék
          </p>
          <button
            @click="resetGame"
            class="my-0.5 btn btn-sm btn-outline dark:btn-primary shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
          >
            Szűrések törlése
          </button>
        </div>
      </div>
    </div>
    <div
      v-else-if="store.isLoading"
      :class="[
        'my-2 mx-0.5',
        setting.isGrid
          ? 'grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-3.5 lg:gap-4 xl:gap-5'
          : ' flex flex-column flex-wrap order-5 gap-2 sm:gap-3 md:gap-3.5 lg:gap-4 xl:gap-5',
      ]"
    >
      <SkeletonLoading v-for="n in store.games.length" :key="n" />
    </div>

    <template v-else>
      <div
        v-if="setting.isGrid"
        class="my-2 mx-0.5 grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-3.5 lg:gap-4 xl:gap-5"
      >
        <GameGrid :data="FilteredGamesOrder" />
      </div>
      <div
        v-else
        class="my-2 mx-0.5 flex flex-column flex-wrap order-5 gap-2 sm:gap-3 md:gap-3.5 lg:gap-4 xl:gap-5"
      >
        <GameCard :data="FilteredGamesOrder" />
      </div>
    </template>
  </div>
</template>
