<template>
    <div>
        <Suspense>
            <template #default>
                <GameDetails :slug="slug" :key="slug" />
            </template>
            <template #fallback>
                betöltése...
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import { useGamesStore } from '../../stores/gamesStore';

defineProps<{ slug: string }>()

const GameDetails = defineAsyncComponent({
    loader: async () => {

        return await import('../components/domains/GameDetails.vue')
    },
    delay: 200,


})

</script>

<style scoped></style>