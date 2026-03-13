<script setup lang="ts">

import {  onMounted } from 'vue';
import GameGrid from '../components/pages/GameGrid.vue';
import GameCard from '../components/pages/GameCard.vue';
import { useSettingStore } from '../stores/settingsStore';
import { useGamesStore } from '../stores/gamesStore';
import {Icon} from '@iconify/vue'




const store = useGamesStore()
const setting = useSettingStore()

onMounted(async()=>{
    store.GETallgames();
    store.GETallcollectibles();
    })
</script>

<template>
    <div>
        <button @click="setting.toggleMenu">
            <template v-if="setting.isOpen">
                <Icon icon="material-symbols-light:flex-wrap" height="40" width="40"/>
            </template>
            <template v-else>
                <Icon icon="gridicons:grid" height="40" width="40"/>
            </template>
        </button>
        <div v-if="setting.isOpen" class="my-4 mx-4 grid grid-cols-7 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2">
            <GameGrid :data="store.games"/>
        </div>
        <div v-else class="my-4 mx-4 flex flex-row gap-5">
            <GameCard :data="store.games"/>
            
        </div>
    </div>
</template>
