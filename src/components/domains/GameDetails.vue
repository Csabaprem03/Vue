<script setup lang="ts">
import Card from '../pages/Card.vue';
import List from '../pages/List.vue';
import { useGamesStore } from '../../stores/gamesStore';
import { computed, onMounted, watch } from 'vue';
import { useSettingStore } from '../../stores/settingsStore';



const props = defineProps<{ id: number }>()
const store = useGamesStore()

const setting = useSettingStore()

const gameSlug = computed(() => {
    store.games.find((g) => g.id === props.id)
})
const gamebyid = async () => {
    await store.GETById(props.id)
}

onMounted(async () => {
    await store.GETallgames()
})
watch(()=>
    props.id,gamebyid
)
console.log(store.GETallgames);
</script>

<template>
    <button @click="setting.toggleMenu">{{ setting.isOpen ? 'Kártyák' : 'Rácsok' }}</button>
    <div v-if="setting.isOpen" class="my-4 mx-4 grid grid-cols-7 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2">
        <List :items="store.games">
            <template #default="{ item }">
                <Card
                    class="flex flex-col items-center justify-center my-4  border border-neutral-800 p-3 py-4 h-80 w-[198px]">
                    <div class="my-1">
                        <img v-if="item.cover" :src="item.cover" :alt="item.name"
                            class="w-43 max-h-54 object-cover rou">
                    </div>
                    <h1 class="text-xl font-bold break-all">{{ item.name }}</h1>
                    <p class="text-sm text-gray-500">{{ item.genre }}</p>
                </Card>
            </template>
        </List>
    </div>
    <div v-else class="my-4 mx-4 flex flex-row gap-5">
        <List :items="store.games">
            <template #default="{ item }">
                <Card
                    class="flex flex-col items-center justify-center my-4 rounded-2xl border border-neutral-800 p-3 py-4 h-80 w-[198px]">
                    <div class="my-1">
                        <img v-if="item.cover" :src="item.cover" :alt="item.name"
                            class="w-43 max-h-54 object-cover rou">
                    </div>
                    <h1 class="text-xl font-bold break-all">{{ item.name }}</h1>
                    <p class="text-sm text-gray-500">{{ item.genre }}</p>

                </Card>
            </template>
        </List>
    </div>
</template>
