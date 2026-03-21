<template>
    <div v-if="store.isLoading">
        <div v-for="n in store.collectibles.length" class="my-4 mx-4 gtid grid-rows-4" :key="n">
            <SkeletonLoading />
        </div>
    </div>
    <div v-else>
        <CollectibleGrid :data="store.collectibles" />
    </div>
</template>

<script setup lang="ts">
import CollectibleGrid from '../components/pages/CollectibleGrid.vue';
import SkeletonLoading from '../components/pages/SkeletonLoading.vue';
import { useGamesStore } from '../stores/gamesStore';

const store=useGamesStore()

    store.GETallcollectibles()
console.log(store.collectibles);




</script>

<style scoped></style>