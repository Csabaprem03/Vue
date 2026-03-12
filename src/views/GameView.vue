<template>
    <div>
        <Suspense>
            <template #default>
                <GameDetails />
            </template>
            <template #fallback>
                betöltése
            </template>
        </Suspense>
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { useGamesStore } from '../stores/gamesStore';
import { Game } from '../types';



const games=ref<Game[]>([])

const GameDetails = defineAsyncComponent({
    loader: () => import('../components/domains/GameDetails.vue'),
    delay: 200,
    timeout: 3000
})
</script>