<template>
    <div >
        <CollectibleGrid :data="store.collectibles" />
    </div>
</template>

<script setup lang="ts">
import CollectibleGrid from '../components/pages/collectibleGrid.vue';
import { useGamesStore } from '../stores/gamesStore';

const store=useGamesStore()

</script>

<style scoped></style>