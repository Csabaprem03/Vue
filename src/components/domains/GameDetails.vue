<script setup lang="ts">
import { computed } from 'vue';
import { useGamesStore } from '../../stores/gamesStore';
import { slugify } from '../../stores/slugfiy';
import NotFound from '../pages/NotFound.vue';
import { RouterLink } from 'vue-router';

const props=defineProps<{slug:string}>()
const store=useGamesStore()

const game=computed(()=>{
    return store.games.find((g)=>slugify(g.name)===props.slug)
})
</script>

<template>
    <div v-if="game">
        <h2>{{ game.name }}</h2>
        <RouterView :gameId="game?.id"/>
    </div>
    <div v-else>
        <NotFound />
        <RouterLink to="/games">Vissza a listához</RouterLink>
    </div>
</template>
