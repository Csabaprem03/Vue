<script setup lang="ts">

import { onMounted } from 'vue';
import GameGrid from '../components/pages/GameGrid.vue';
import GameCard from '../components/pages/GameCard.vue';
import { useSettingStore } from '../stores/settingsStore';
import { useGamesStore } from '../stores/gamesStore';
import { Icon } from '@iconify/vue'
import FilterPanel from '../components/pages/FilterPanel.vue';
import { useGamesFilterPanel } from '../components/composables/useGamesFilterPanel';




const store = useGamesStore()
const setting = useSettingStore()
const { FilteredGamesOrder, allGenre, filteredActive,resetGame } = useGamesFilterPanel(store.games)

onMounted(async () => {
    store.GETallgames();
    store.GETallcollectibles();
})
</script>

<template>
    <div>
        <div class="flex flex-row justify-between my-4 mx-4">
            <button @click="setting.toggleMenu">
                <template v-if="setting.isOpen">
                    <Icon icon="material-symbols-light:flex-wrap" height="40" width="40" />
                </template>
                <template v-else>
                    <Icon icon="gridicons:grid" height="40" width="40" />
                </template>
            </button>
            <div>
                <FilterPanel class="w-150 rounded-2xl flex flex-row justify-evenly py-1.5">
                    <template #filteredSelect>
                        <div class="flex flex-col items-start">
                            <label>Műfaj</label>
                            <select name="__osszes__" v-model="filteredActive.nameGenre">
                                <option value="__osszes__">Összes</option>
                                <option v-for="(genre, index) in allGenre" :key="index" :value="genre">{{ genre }}
                                </option>
                            </select>
                        </div>
                    </template>
                    <template #fileredInput>
                        <div class="flex flex-col items-start">
                            <label>kereső</label>
                            <input v-model="filteredActive.title" type="text" class="w-30" />
                        </div>
                    </template>
                    <template #fileredOption>
                        <div class="flex flex-col items-start">
                            <label>renderező</label>
                            <select v-model="filteredActive.order">
                                <option value="a-z">Név: A-Z</option>
                                <option value="z-a">Név: Z-A</option>
                            </select>
                        </div>
                    </template>
                    <template #fileredButton>
                        <button @click="resetGame">Alaphelyzet</button>
                    </template>
                </FilterPanel>
            </div>
        </div>
        <div v-if="setting.isOpen" class="my-4 mx-4 grid grid-cols-7 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2">
            <GameGrid :data="FilteredGamesOrder" />
        </div>
        <div v-else class="my-4 mx-4 flex flex-row gap-5">
            <GameCard :data="FilteredGamesOrder" />

        </div>
    </div>
</template>
