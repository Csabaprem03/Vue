<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Card from './Card.vue';
import List from './List.vue';
import { slugify } from '../../stores/slugfiy';
import { useGamesStore } from '../../stores/gamesStore';
import FavoriteGames from '../domains/FavoriteGames.vue';
import FavoriteButton from './FavoriteButton.vue';

const props = defineProps<{ data: any[] }>()

const store = useGamesStore()

const getFirstType = (id: number) => {
    const found = store.collectibles.find((c) => Number(c.game_id) === Number(id))
    return found ? slugify(found.type) : 'all'
}

</script>

<template>
    <List :items="props.data">
        <template #default="{ item }">
            <Card
                class="flex flex-col items-center justify-center my-4 rounded-2xl border border-neutral-800 p-3 py-4 h-80 w-[198px]">
                <div class="my-1">
                    <RouterLink :key="item.id"
                        :to="{ name: 'game.collectibles.type', params: { slug: slugify(item.name), type: getFirstType(item.id) } }">
                    <img v-if="item.cover" :src="item.cover" :alt="item.name" class="w-43 max-h-54 object-cover rou">
                    </RouterLink>
                </div>
                <h1 class="text-xl font-bold break-all">{{ item.name }}</h1>
                <p class="text-sm text-gray-500">{{ item.genre }}</p>
                <div class="mt-auto">
                    <FavoriteButton :game-id="item.id"/>
                </div>
            </Card>
        </template>
    </List>
</template>