<template>
  <div v-if="store.isLoading">
    <div
      class="my-4 mx-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mx-auto"
    >
      <div v-for="n in store.collectibles.length" :key="n">
        <SkeletonLoadingCollectible />
      </div>
    </div>
  </div>
  <div v-else>
    <CollectibleGrid :data="store.collectibles" />
  </div>
</template>

<script setup lang="ts">
import CollectibleGrid from "../components/pages/CollectibleGrid.vue";
import SkeletonLoading from "../components/pages/SkeletonLoading.vue";
import SkeletonLoadingCollectible from "../components/pages/SkeletonLoadingCollectible.vue";
import { useGamesStore } from "../stores/gamesStore";

const store = useGamesStore();

store.GETallcollectibles();
console.log(store.collectibles);
</script>

<style scoped></style>
