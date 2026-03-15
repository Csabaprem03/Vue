<template>
    <div v-if="store.isLoading">
        <List :items="store.collectibles.length" class="my-4 mx-4 gtid grid-rows-4">
            <SkeletonLoading />
        </List>
    </div>
    <div v-else>
        <CollectibleGrid :data="store.collectibles" />
    </div>
</template>

<script setup lang="ts">
import CollectibleGrid from '../components/pages/collectibleGrid.vue';
import List from '../components/pages/List.vue';
import SkeletonLoading from '../components/pages/SkeletonLoading.vue';
import { useGamesStore } from '../stores/gamesStore';

const store=useGamesStore()



store.GETallcollectibles();

</script>

<style scoped></style>