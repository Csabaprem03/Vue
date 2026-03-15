<template>
    <div class="game">
        <div v-for="item in filteredCollectibles" :key="item.id">
            <h3>{{ item.description }}</h3>
            <div v-for="img in item.images" class="grid grid-rows-5" :key="img">
                <img  :src="img" class="w-20">
            </div>
        </div>
        <RouterLink to="/games">Vissza a listához</RouterLink>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGamesStore } from '../../stores/gamesStore';
import { slugify } from '../../stores/slugfiy';

const props = defineProps<{ slug: string,type:string,gameId?:number }>();
const store = useGamesStore();

if (store.games.length === 0) {
    store.GETallgames(); 
}
if (store.collectibles.length === 0) {
    store.GETallcollectibles();
}

const filteredCollectibles = computed(() => {

    const game =store.games.find((g) => slugify(g.name) === props.slug);
    if (!game) return [];

    const itemsOfGame=store.collectibles.filter((c)=>Number(c.game_id)===Number(game.id))

    if (props.type==='all') {
        return itemsOfGame
    }

    return itemsOfGame.filter((c)=>slugify(c.type)===props.type);
});

</script>