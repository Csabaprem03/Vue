<script setup lang="ts">
import { slugify } from '../../stores/slugfiy';
import Card from './Card.vue';
import List from './List.vue';

const props=defineProps<{data:any[]}>()
</script>

<template>
    <List :items="props.data">
            <template #default="{ item }">
                <RouterLink :key="item.id" :to="{name:'game.collectibles.type',params:{slug:slugify(item.name),type:'all'}}">
                    <Card
                        class="flex flex-col items-center justify-center my-4  border border-neutral-800 p-3 py-4 h-80 w-[198px]">
                        <div class="my-1">
                            <img v-if="item.cover" :src="item.cover" :alt="item.name"
                                class="w-43 max-h-54 object-cover rou">
                        </div>
                        <h1 class="text-xl font-bold break-all">{{ item.name }}</h1>
                        <p class="text-sm text-gray-500">{{ item.genre }}</p>
                    </Card>
                </RouterLink>
            </template>
        </List>
</template>