<template>
    <div v-if="favStore.isLoading || gamesStore.isLoading">betöltés...</div>
    <div v-else-if="favStore.Favorites.length===0">nincs</div>
    <div v-else>
        <div v-for="fav in FilteredGameList">
            <div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useFavoriteStore } from '../../stores/favoriteStore';
import { useGamesStore } from '../../stores/gamesStore';



const favStore=useFavoriteStore()
const gamesStore=useGamesStore()

const FilteredGameList=computed(()=>{
    return gamesStore.games.filter(game=>
        favStore.Favorites.some(fav=>Number(fav.game_id)===Number(game.id))
    )
})



onMounted(async ()=>{
    if (gamesStore.games.length===0) {
        await gamesStore.GETallgames()
    }
    await favStore.GETallFavorites()
})
</script>

<style scoped>

</style>