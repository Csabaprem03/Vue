<template>
<div v-if="favStore.isLoading || gamesStore.isLoading">betöltés...</div>
<div v-else-if="favStore.Favorites.length === 0">{{ favStore.isMessage }}</div>
<div v-else>
    <draggable v-model="favStore.Favorites" v-if="favStore.Favorites"  v-bind="dragOptions" item-key="game_id" >
        <template #item="{ element }">
            <div class="table-row-group">
                <div class="table-row" v-if="FoundGame(element.game_id)">
                    <div class="table-cell"><img :src="FoundGame(element.game_id)?.cover" /></div>
                    <div class="table-cell">{{ FoundGame(element.game_id)?.name }}</div>
                    <div class="table-cell">
                        <button @click="favStore.ToggleFavorite(element.game_id)">
                            <Icon icon="line-md:close-small" class="text-red-500 w-10 h-10" />
                        </button>
                    </div>
                </div>

            </div>
        </template>
    </draggable>
</div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useFavoriteStore } from '../../stores/favoriteStore';
import { useGamesStore } from '../../stores/gamesStore';
import draggable from 'vuedraggable'
import { Icon } from '@iconify/vue';
import { useSettingStore } from '../../stores/settingsStore';


const favStore = useFavoriteStore()
const gamesStore = useGamesStore()

const dragOptions = computed(() => ({
animation: 400,
ghostClass: "ghost",
dragClass: 'drag'
}))

const FoundGame = (gameId: number) => {
return gamesStore.games.find(game => Number(game.id) === Number(gameId)
)
}


onMounted(() => {
if (gamesStore.games.length === 0) {
    gamesStore.GETallgames()
}
favStore.GETallFavorites()
})
</script>

<style scoped>
.table-row-group {
transition: all 0.5s ease;
}

.flip-list-move {
    transition: transform 0.5s ease;
}

.ghost {
opacity: 0.5;
background: #c8ebfb;
}

.no-move {
    transition: transform 0s;
}

.fade-move {
transition: all 0.5s ease;
}
</style>