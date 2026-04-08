<template>
  <div class="w-full mx-w-[1480px] mx-auto py-4 px-4">
    <CollectiblesFiltered
      :types="allType"
      @reset="resetGame"
      @apply="applyFiltered"
      v-model="filteredActive"
    />
    <div
      v-if="
        store.collectibles.length > 0 && FilteredCollectiblesOrder.length === 0
      "
      class="flex flex-col justify-center items-center"
    >
      <div class="card my-1.5 mx-auto">
        <div class="card-body my-3">
          <Icon icon="line-md:filter-off" class="w-20 h-20 my-4 mx-auto" />
          <p class="my-4 text-sm dark:text-neutral-50 text-gray-950">
            Nem a szűrésnek megfelelője gyűjthető dolgok
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
    <div v-else-if="store.isLoading">
      <div
        class="my-4 mx-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mx-auto"
      >
        <div v-for="n in store.collectibles.length" :key="n">
          <SkeletonLoadingCollectible />
        </div>
      </div>
    </div>
    <div v-else>
      <CollectibleGrid :data="FilteredCollectiblesOrder" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useColectiblesFilterPanel } from "../components/composables/useCollectiblesFilterPanel";
import CollectibleGrid from "../components/pages/CollectibleGrid.vue";
import CollectiblesFiltered from "../components/pages/CollectiblesFiltered.vue";
import SkeletonLoadingCollectible from "../components/pages/SkeletonLoadingCollectible.vue";
import { useGamesStore } from "../stores/gamesStore";

const store = useGamesStore();
const {
  applyFiltered,
  allType,
  FilteredCollectiblesOrder,
  filteredActive,
  resetGame,
} = useColectiblesFilterPanel(store.collectibles);

store.GETallcollectibles();
console.log(store.collectibles);
</script>

<style scoped></style>
