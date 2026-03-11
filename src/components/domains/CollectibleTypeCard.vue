<template>
    ok
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { Game } from '../../types';
import { slugify } from '../../stores/slugfiy';
import { useGamesStore } from '../../stores/gamesStore';
const props=defineProps<{slug:string}>()

const store=useGamesStore()

const getGamesBySlug=computed(()=>{
        return store.games.find((g)=>slugify(g.name)===props.slug)
})


</script>