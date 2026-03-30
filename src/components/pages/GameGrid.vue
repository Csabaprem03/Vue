<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore';
import { useGamesStore } from '../../stores/gamesStore';
import { slugify } from '../../stores/slugfiy';
import type { Game } from '../../types';
import Card from './Card.vue';
import FavoriteButton from './FavoriteButton.vue';
import List from './List.vue';

const props = defineProps<{ data: Game[] }>()

const store = useGamesStore()
const authStore = useAuthStore()

const getFirstType = (id: number) => {
    const found = store.collectibles.find((c) => c.game_id === Number(id))
    return found ? slugify(found.type) : 'all'
}

function handleDelete(id: number, name: string): void {
    if (!authStore.token) {
        alert("A játékhez be kell jelentkezni");
        return;
    }

    if (confirm(`Biztosan törölni szeretnéd: ${name}`)) {
        store.DELETEgames(id)
    }
}

</script>


<template>
    <List :items="props.data">
        <template #default="{ item }">
            <Card
                class="flex flex-col items-center justify-center my-4  border border-neutral-800 p-3 py-4 h-80 w-[198px]">
                <div class="my-1">
                    <RouterLink :key="item.id"
                        :to="{ name: 'game.collectibles.type', params: { slug: slugify(item.name), type: getFirstType(item.id) } }">
                        <img v-if="item.cover" :src="item.cover" :alt="item.name"
                            class="w-43 max-h-54 object-cover rou">
                    </RouterLink>
                </div>
                <h1 class="text-xl font-bold break-all">{{ item.name }}</h1>
                <p class="text-sm text-gray-500">{{ item.genre }}</p>
                <div class="grid grid-cols-2">
                    <RouterLink :to="{name:'games.edit',params:{id:Number(item.id)}}">Szerkezetés</RouterLink>
                    <button @click="handleDelete(item.id, item.name)">Törlés</button>
                </div>
                <div class="mt-auto">
                    <FavoriteButton :game-id="item.id"/>
                </div>
            </Card>
        </template>
    </List>
</template>