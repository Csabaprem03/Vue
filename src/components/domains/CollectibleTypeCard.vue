<template>
  <div v-if="filteredCollectibles.length === 0">
    <Icon
      icon="line-md:emoji-cry"
      class="dark:text-gray-200/[95.0%] text-gray-950/[95.4%]"
      height="30"
      width="30"
    />

    <RouterLink to="/games">Vissza a listához</RouterLink>
  </div>
  <div v-else class="game">
    <div v-for="item in filteredCollectibles" :key="item.id">
      <h3>{{ item.description }}</h3>
      <div v-if="getImages(item.images).length === 0 && !item.images">
        <Icon
          icon="line-md:image-twotone"
          class="text-gray-200"
          height="30"
          width="30"
        />
      </div>
      <div v-else class="flex flex-wrap gap-2">
        <div
          v-for="img in getImages(item.images)"
          class="grid grid-rows-5"
          :key="img"
        >
          <img :src="img" class="w-20" />
        </div>
      </div>
      <RouterLink
        :to="{ name: 'collectibles.edit', params: { id: Number(item.id) } }"
        >Szerkezetés</RouterLink
      >
    </div>

    <RouterLink to="/games">Vissza a listához</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGamesStore } from "../../stores/gamesStore";
import { slugify } from "../../stores/slugfiy";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";

const props = defineProps<{ slug: string; type: string; gameId?: number }>();
const store = useGamesStore();

if (store.games.length === 0) {
  store.GETallgames();
}
if (store.collectibles.length === 0) {
  store.GETallcollectibles();
}

const getImages = (imagesData: any): Array<string> => {
  if (!imagesData) return [];
  let result: Array<string> = [];
  if (typeof imagesData === "string") {
    try {
      const parsed = JSON.parse(imagesData);
      result = Array.isArray(parsed) ? parsed : [imagesData];
    } catch (error) {
      result = [imagesData];
    }
  } else if (Array.isArray(imagesData)) {
    result = imagesData;
  }
  return result
    .map((url) => {
      if (typeof url === "string") {
        return url.replace(/\\/g, "");
      }
      return url;
    })
    .filter((url) => url && url.startsWith("http"));
};

const filteredCollectibles = computed(() => {
  const game = store.games.find((g) => slugify(g.name) === props.slug);
  if (!game) return [];

  const itemsOfGame = store.collectibles.filter(
    (c) => Number(c.game_id) === Number(game.id),
  );

  if (props.type === "all") {
    return itemsOfGame;
  }

  return itemsOfGame.filter((c) => slugify(c.type) === props.type);
});
</script>
