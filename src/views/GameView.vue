<script setup lang="ts">
import GameGrid from '../components/pages/GameGrid.vue';
import GameCard from '../components/pages/GameCard.vue';
import { useSettingStore } from '../stores/settingsStore';
import { useGamesStore } from '../stores/gamesStore';
import { useGamesFilterPanel } from '../components/composables/useGamesFilterPanel';
import GamesFiltered from '../components/pages/GamesFiltered.vue';
import SkeletonLoading from '../components/pages/SkeletonLoading.vue';
import MessagePanel from '../components/validators/MessagePanel.vue';
import { useFavoriteStore } from '../stores/favoriteStore';


const store = useGamesStore()
const setting = useSettingStore()
const favStore = useFavoriteStore()
const { FilteredGamesOrder, allGenre, filteredActive, resetGame, applyFiltered } = useGamesFilterPanel(store.games)


applyFiltered(filteredActive.value)

store.GETallgames()
</script>

<template>
    <div class="w-mx-auto">
        <GamesFiltered :settings="setting" :genres="allGenre" v-model="filteredActive" @reset="resetGame"
            @apply="applyFiltered" />
        <MessagePanel :show="!!favStore.isMessage" :message="favStore.isMessage" @close="favStore.isMessage=null"/>

        <div v-if="store.isLoading"
            class="my-4 mx-4 grid grid-cols-7 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-4">
            <SkeletonLoading v-for="n in store.games.length" :key="n" />
        </div>

        <template v-else>
            <div v-if="setting.isOpen" class="my-4 mx-4 grid grid-cols-7 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2">
                <GameGrid :data="FilteredGamesOrder" />
            </div>
            <div v-else class="my-4 mx-4 flex flex-row gap-5">
                <GameCard :data="FilteredGamesOrder" />
            </div>
        </template>
    </div>
</template>