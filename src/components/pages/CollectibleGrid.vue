<template>
  <div
    class="my-2 mx-2 md:my-4 md:mx-4 gap-5 md:gap-7 grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8"
  >
    <List :items="props.data">
      <!-- újrahasznosítás: List.vue, Card.vue és slot használat  -->
      <template #default="{ item }">
        <div class="card-grid-collectible-wrapper">
          <div
            class="card-grid-collectible-content card hover:outline-2 hover:outline-offset-2 hover:outline-[#24252b] dark:hover:outline-2 dark:hover:outline-offset-2 dark:hover:outline-[#133b43] dark:hover:shadow-blue-950/90 hover:shadow-gray-950/90 group relative aspect-square overflow-hidden rounded-lg shadow-lg transition-all duration-300"
            @mouseenter="handleMouseEnter(item.id)"
            @mouseleave="handleMouseLeave"
          >
            <!-- <div
                  v-for="(img, index) in ImageSplit(item.images)"
                  class=" transition-opacity w-full h-full flex items-center justify-center  duration-500 absolute inset-0"
                  :key="index"
                  :class="
                    index === 0
                      ? 'opacity-100 group-hover:opacity-0'
                      : 'opacity-0 group-hover:opacity-100 '
                  "
                > -->
            <RouterLink
              :to="{ name: 'collectible.id', params: { id: Number(item.id) } }"
              class="w-full h-full block relative bg-gray-200 dark:bg-gray-800"
            >
              <img
                :src="ImageSplit(item.images)[0] || defaultImage"
                @error="
                  (e) => ((e.target as HTMLImageElement).src = defaultImage)
                "
                class="w-full h-full absolute inset-0 object-cover transition-opacity duration-500 z-10"
                :class="
                  ImageSplit(item.images).length > 1
                    ? 'group-hover:opacity-0'
                    : 'opacity-100'
                "
              />

              <img
                v-if="ImageSplit(item.images).length > 1"
                :src="ImageSplit(item.images)[1] || defaultImage"
                @error="
                  (e) => ((e.target as HTMLImageElement).src = defaultImage)
                "
                :style="
                  activeId === item.id
                    ? {
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${randomStyle.x}%), calc(-50% + ${randomStyle.y}%))`,
                      }
                    : {
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }
                "
                class="w-[130%] h-[130%] absolute max-w-none transition-all duration-700 opacity-0 group-hover:opacity-100 z-0 object-cover"
              />
            </RouterLink>

            <div class="absolute top-0 right-0 z-30">
              <button
                class="bg-Color"
                @click="handleDelete(item.id, item.type)"
              >
                <Icon
                  :class="[!authStore.token ? 'hidden' : 'block']"
                  icon="line-md:trash"
                  class="text-red-700/90 animate-none hover:animate-wiggle"
                  height="30"
                  width="30"
                />
              </button>
            </div>
          </div>
        </div>
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useAuthStore } from "../../stores/authStore";
import { useGamesStore } from "../../stores/gamesStore";
import List from "./List.vue";
import defaultImage from "../../svg/icons8-default-image-50.svg";

import type { Collectible } from "../../types";
import { ref } from "vue";

const authStore = useAuthStore();
const store = useGamesStore();
const props = defineProps<{ data: Collectible[] }>();

const activeId = ref<number | null>(null);
const randomStyle = ref({ x: 0, y: 0 });

function handleMouseEnter(id: Number) {
  activeId.value = id as number;
  randomStyle.value = {
    x: Math.random() * 20 - 12,
    y: Math.random() * 20 - 12,
  };
}
function handleMouseLeave() {
  activeId.value = null;
}

function handleDelete(id: number, type: string): void {
  if (!authStore.token) {
    alert("A játékhez be kell jelentkezni");
    return;
  }

  if (confirm(`Biztosan törölni szeretnéd: ${type}`)) {
    store.DELETEcollectible(id);
  }
}

function ImageSplit(ImageData: any): string[] {
  if (!ImageData) return [];
  if (Array.isArray(ImageData)) return ImageData;
  if (typeof ImageData === "string") {
    return ImageData.split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
  return [];
}
</script>

<style scoped>
.bg-Color {
  background-color: oklab(0.842 0.009 0.003);
}
.dark .bg-Color {
  background-color: oklab(0% 0 0 / 0.97);
}
</style>
