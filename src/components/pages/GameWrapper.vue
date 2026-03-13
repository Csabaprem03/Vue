<template>
    <div>
        <Suspense>
            <template #default>
                <GameDetails :slug="slug" />
            </template>
            <template #fallback>
                <SkeletonLoading v-for="n in 4" :key="n" />
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useGamesStore } from '../../stores/gamesStore';
import List from './List.vue';
import SkeletonLoading from './SkeletonLoading.vue';

defineProps<{ slug: string }>()

const store = useGamesStore()

const GameDetails = defineAsyncComponent({
    loader: () => import('../components/domains/GameDetails.vue'),
    delay: 200,
    timeout: 5000
})
</script>

<style scoped></style>