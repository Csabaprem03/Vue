<template>
  <div
    v-if="store.isLoading"
    class="my-15 dark:text-neutral-50/90 text-gray-950/90 flex flex-col flex-wrap items-center"
  >
    <img
      src="../../svg/vecteezy_cute-illustration-designs-for-the-characters-in-the-super_27969806.svg"
      class="h-10 w-10 animate-bounce"
      alt=""
    />
    <div class="flex flex-row flex-wrap">
      <p>Betöltés</p>
      <span class="loading loading-dots loading-sm ml-0.5 my-1"></span>
    </div>
  </div>
  <div v-else-if="filteredCollectibles.length === 0">
    <Icon
      icon="line-md:emoji-cry"
      class="dark:text-gray-200/[95.2%] text-gray-950/[95.4%] my-[150px]"
      height="50"
      width="50"
    />
    <p
      class="text-2xl/10 font-extrabold italic text-shadow-lg/20 dark:text-shadow-blue-950/90 text-shadow-yellow-700/80"
    >
      Nincs találat a gyűjthető dolgot!
    </p>
    <RouterLink
      class="animate-none hover:animate-wiggle btn btn-outline dark:btn-primary hover:text-neutral-50 shadow-lg dark:shadow-neutral-50/20 dark:inset-shadow-2xs dark:inset-shadow-neutral-50/90 shadow-gray-950/50 inset-shadow-2xs inset-shadow-yellow-600/70 my-[48.23px]"
      to="/games"
      >Vissza a listához</RouterLink
    >
  </div>

  <!-- ciklus v-for a pinia-t games és collectible, -->
  <div v-else class="m-w-auto">
    <div
      v-for="item in filteredCollectibles"
      :key="item.id"
      class="relative mt-10 px-3 pt-5 pb-[25%] md:pb-[10%] sm:pb-[16%] lg:pb-[10%] xl:pb-[7%] rounded-2xl flex flex-col gap-y-[30px] items-center w-4/8 bg-[#e2d4c1]/30 shadow-2xl/30 dark:shadow-neutral-50 shadow-gray-950 dark:inset-shadow-emerald-600/80 inset-shadow-emerald-950/80 inset-shadow-sm inset-0.5"
    >
      <h3 class="font-extrabold mt-[5%] font-sans text-2xl/9 break-normal">
        {{ item.description }}
      </h3>
      <div v-if="item.images.length === 0 && !item.images">
        <Icon
          icon="line-md:image-twotone"
          class="text-gray-200"
          height="30"
          width="30"
        />
      </div>
      <div v-else class="flex flex-wrap gap-5">
        <div
          v-for="img in item.images"
          class="flex flex-wrap md:flex-col mx-auto md:mx-auto order-1 sm:items-center sm:justify-center md:order-2 transition-all duration-300"
          :key="img"
        >
          <div class="hover-3d">
            <figure class="w-50 max-h-40 rounded-2xl">
              <img :src="img" class="w-full h-full object-cover" />
            </figure>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>

      <RouterLink
        :class="[!authStore.token ? 'hidden' : 'block']"
        :to="{ name: 'collectibles.edit', params: { id: Number(item.id) } }"
        class="absolute bottom-5.5 md:bottom-2.5 xl:bottom-2.5 right-auto animate-none hover:animate-wiggle btn btn-outline dark:btn-primary hover:text-neutral-50 shadow-lg dark:shadow-neutral-50/20 dark:inset-shadow-2xs dark:inset-shadow-neutral-50/90 shadow-gray-950/50 inset-shadow-2xs inset-shadow-yellow-600/70 mb-5"
      >
        <div class="flex flex-row flex-wrap">
          <Icon
            icon="line-md:edit-filled"
            class="text-gray-950/100 dark:text-blue-950/90 mr-1.5"
            height="20"
            width="20"
          />
          <h1>Szerkezetés</h1>
        </div>
      </RouterLink>
    </div>
    <!-- RouterLink vissza az útvonalhoz  -->

    <RouterLink
      class="animate-none hover:animate-wiggle btn btn-outline dark:btn-primary hover:text-neutral-50 shadow-lg dark:shadow-neutral-50/20 dark:inset-shadow-2xs dark:inset-shadow-neutral-50/90 shadow-gray-950/50 inset-shadow-2xs inset-shadow-yellow-600/70 my-10"
      to="/games"
      >Vissza a listához</RouterLink
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGamesStore } from "../../stores/gamesStore";
import { slugify } from "../../stores/slugfiy";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { useAuthStore } from "../../stores/authStore";

// propok
const props = defineProps<{ slug: string; type: string; gameId?: number }>();

// a pinia-k használat
const store = useGamesStore();
const authStore = useAuthStore();

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

// game és collectible vizsgálat
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
