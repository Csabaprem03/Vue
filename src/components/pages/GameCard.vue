<script setup lang="ts">
import { RouterLink } from "vue-router";
import Card from "./Card.vue";
import List from "./List.vue";
import { slugify } from "../../stores/slugfiy";
import { useGamesStore } from "../../stores/gamesStore";
import FavoriteButton from "./FavoriteButton.vue";
import type { Game } from "../../types";
import { useAuthStore } from "../../stores/authStore";
import defaultImage from "../../svg/icons8-default-image-50.svg";
import {
  getPlatforms,
  getPlatformsColor,
  parsePlatform,
} from "../../stores/platforms";
import { Icon } from "@iconify/vue";

const props = defineProps<{ data: Game[] }>();

// a pinia-k használat

const store = useGamesStore();
const authStore = useAuthStore();

// a slug vizsgálat és találat

const getFirstType = (id: number) => {
  if (!store.collectibles || store.collectibles.length === 0) return "all";
  const found = store.collectibles.find(
    (c) => Number(c.game_id) === Number(id),
  );
  return found ? slugify(found.type) : "all";
};

function handleDelete(id: number, name: string): void {
  if (confirm(`Biztosan törölni szeretnéd: ${name}`)) {
    store.DELETEgames(id);
  }
}
</script>
// újrahasznosítás: List.vue, Card.ve és slot használat // prophoz ez a
GameView.vue komponensnek
<template>
  <List :items="props.data">
    <template #default="{ item }">
      <!-- A kártya formája  -->
      <div
        class="card-flex-wrapper mx-auto my-auto hover:outline-2 hover:outline-offset-2 hover:outline-[#24252b] dark:hover:outline-2 dark:hover:outline-offset-2 dark:hover:outline-[#133b43] shadow-lg dark:hover:shadow-blue-950/90 hover:shadow-gray-950/90 transition-shadow duration-300"
      >
        <Card class="card-flex-content py-4 px-2">
          <div
            :class="[!authStore.token ? 'hidden' : 'block']"
            class="absolute top-1 -left-1 -right-1 px-2 flex justify-between items-center z-30"
          >
            <button @click="handleDelete(item.id, item.name)">
              <Icon
                icon="line-md:trash"
                class="text-red-700/90 animate-none hover:animate-wiggle transition-all duration-100"
                height="30"
                width="30"
              />
            </button>
            <RouterLink
              :to="{ name: 'games.edit', params: { id: Number(item.id) } }"
            >
              <Icon
                icon="line-md:edit-filled"
                class="text-gray-950/100 animate-none hover:animate-wiggle transition-all duration-100 dark:text-neutral-100"
                height="30"
                width="30"
            /></RouterLink>
          </div>
          <div class="my-1 mt-10">
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
                :src="item.cover || defaultImage"
                :alt="item.name"
                @error="
                  (e) => ((e.target as HTMLImageElement).src = defaultImage)
                "
                class="w-45 max-h-50 object-fill hover:box-border shadow hover:shadow-xl/40 transition-transform duration-300 rotate-0 hover:rotate-12 rounded motion-reduce:transition-none"
              />
            </RouterLink>
          </div>
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
          <h1 class="text-xl font-bold break-normal text-center">
            {{ item.name }}
          </h1>
          <p class="text-sm text-gray-500">{{ item.genre }}</p>

          <div class="mt-auto">
            <FavoriteButton
              :game-id="item.id"
              class="animate-none hover:animate-wiggle transition-all duration-100"
            />
          </div>
        </Card>
      </div>
    </template>
  </List>
</template>
