<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useAuthStore } from "../../stores/authStore";
import { useGamesStore } from "../../stores/gamesStore";
import { slugify } from "../../stores/slugfiy";
import type { Game } from "../../types";
import Card from "./Card.vue";
import FavoriteButton from "./FavoriteButton.vue";
import List from "./List.vue";
import {
  getPlatforms,
  getPlatformsColor,
  parsePlatform,
} from "../../stores/platforms";

const props = defineProps<{ data: Game[] }>();

const store = useGamesStore();
const authStore = useAuthStore();

const getFirstType = (id: number) => {
  const found = store.collectibles.find((c) => c.game_id === Number(id));
  return found ? slugify(found.type) : "all";
};

function handleDelete(id: number, name: string): void {
  if (!authStore.token) {
    alert("A játékhez be kell jelentkezni");
    return;
  }

  if (confirm(`Biztosan törölni szeretnéd: ${name}`)) {
    store.DELETEgames(id);
  }
}
</script>

<template>
  <List :items="props.data">
    <template #default="{ item }">
      <div class="card-wrapper mx-auto my-2">
        <Card
          class="card-content py-4 px-2 transform transition hover:-translate-y-1"
        >
          <div class="my-1">
            <RouterLink
              :key="item.id"
              :to="{
                name: 'game.collectibles.type',
                params: {
                  slug: slugify(item.name),
                  type: getFirstType(item.id),
                },
              }"
            >
              <img
                v-if="item.cover"
                :src="item.cover"
                :alt="item.name"
                class="w-45 max-h-50 object-fill hover:box-border shadow hover:shadow-xl/40 transition-transform duration-300 rotate-0 hover:rotate-12 rounded motion-reduce:transition-none"
              />
            </RouterLink>
          </div>
          <h1 class="text-xl font-bold break-all">{{ item.name }}</h1>
          <p class="text-sm text-gray-500">{{ item.genre }}</p>
          <div
            class="flex flex-wrap justify-center gap-y-1 gap-x-0.5 my-auto mx-auto"
          >
            <span
              v-for="(icon, index) in parsePlatform(item.platforms)"
              :key="index"
            >
              <Icon
                :icon="getPlatforms(icon)"
                :class="getPlatformsColor(icon)"
              />
            </span>
          </div>
          <div class="grid grid-cols-2 py-3 gap-2 my-auto mx-auto">
            <RouterLink
              :to="{ name: 'games.edit', params: { id: Number(item.id) } }"
              class="bg-[#b6cbd5] rounded-full p-1 transiton delay-150 duration-300 hover:-translate-y-1 ease-in-out hover:scale-112 hover:bg-[#cedce3]"
              >Szerkezetés</RouterLink
            >
            <button
              class="bg-[#b6cbd5] rounded-full transiton delay-150 duration-300 hover:-translate-y-1 ease-in-out hover:scale-112 hover:bg-[#cedce3]"
              @click="handleDelete(item.id, item.name)"
            >
              Törlés
            </button>
          </div>
          <div class="mt-auto">
            <FavoriteButton :game-id="item.id" />
          </div>
        </Card>
      </div>
    </template>
  </List>
</template>
