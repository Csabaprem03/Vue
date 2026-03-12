<script setup lang="ts">
import { useGamesStore } from '../../stores/gamesStore';
import {  onMounted } from 'vue';
import { useSettingStore } from '../../stores/settingsStore';
import GameCard from '../pages/GameCard.vue';
import GameGrid from '../pages/GameGrid.vue';



const store = useGamesStore()
const setting = useSettingStore()



onMounted(()=>store.GETallgames())
</script>

<template>
    <button @click="setting.toggleMenu">{{ setting.isOpen ? 'Kártyák' : 'Rácsok' }}</button>
    <div v-if="setting.isOpen" class="my-4 mx-4 grid grid-cols-7 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2">
        <GameGrid :data="store.games"/>
    </div>
    <div v-else class="my-4 mx-4 flex flex-row gap-5">
        <GameCard :data="store.games" />
    </div>
</template>
