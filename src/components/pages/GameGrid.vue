<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useAuthStore } from "../../stores/authStore";
import { useGamesStore } from "../../stores/gamesStore";
import { slugify } from "../../stores/slugfiy";
import type { Game } from "../../types";
import Card from "./Card.vue";
import FavoriteButton from "./FavoriteButton.vue";
import List from "./List.vue";
import defaultImage from "../../svg/icons8-default-image-50.svg";
import {
  getPlatforms,
  getPlatformsColor,
  parsePlatform,
} from "../../stores/platforms";

const props = defineProps<{ data: Game[] }>();

// a pinia-k használat

const store = useGamesStore();
const authStore = useAuthStore();

// a slug vizsgálata és találat

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
  <!-- újrahasznosítás: List.vue, Card.ve és slot használat  -->

  <!-- prophoz ez a GameView.vue komponensnek -->
  <List :items="props.data">
    <template #default="{ item }">
      <!-- a Grid formája  -->
      <div
        class="card-wrapper mx-auto my-2 hover:outline-2 hover:outline-offset-2 hover:outline-[#24252b] dark:hover:outline-2 dark:hover:outline-offset-2 dark:hover:outline-[#133b43] shadow-lg dark:hover:shadow-blue-950/90 hover:shadow-gray-950/90 transition-shadow duration-300"
      >
        <Card class="card-content py-4 px-2">
          <div
            :class="[!authStore.token ? 'hidden' : 'block']"
            class="grid grid-cols-2 py-3 gap-2 my-auto absolute z-30 top-[-1%] right-0 animate-none *:hover:animate-wiggle"
          >
            <RouterLink
              :to="{ name: 'games.edit', params: { id: Number(item.id) } }"
              class=""
            >
              <Icon
                icon="line-md:edit-filled"
                class="text-gray-950/100 dark:text-blue-950/90"
                height="30"
                width="30"
            /></RouterLink>
            <button class="" @click="handleDelete(item.id, item.name)">
              <Icon
                icon="line-md:trash"
                class="text-red-950/100"
                height="30"
                width="30"
              />
            </button>
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
