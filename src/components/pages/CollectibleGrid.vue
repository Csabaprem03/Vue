<template>
  <div
    class="my-2 mx-2 md:my-4 md:mx-4 gap-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
  >
    <List :items="props.data">
      <template #default="{ item }">
        <div class="card-grid-collectible-wrapper">
          <div
            class="card-grid-collectible-content card hover:outline-2 hover:outline-offset-2 hover:outline-[#24252b] dark:hover:outline-2 dark:hover:outline-offset-2 dark:hover:outline-[#133b43] shadow-lg dark:hover:shadow-blue-950/90 hover:shadow-gray-950/90 transition-shadow duration-300"
          >
            <figure class="hover-gallery aspect-square group relative">
              <template v-if="ImageSplit(item.images).length > 0">
                <div
                  v-for="(img, index) in ImageSplit(item.images)"
                  class="py-auto my-auto transition-opacity duration-500 absolute inset-0"
                  :key="index"
                  :class="
                    index === 0
                      ? 'opacity-100 group-hover:opacity-0'
                      : 'opacity-0 group-hover:opacity-100 '
                  "
                >
                  <RouterLink
                    :to="{
                      name: 'collectible.id',
                      params: { id: Number(item.id) },
                    }"
                  >
                    <img
                      v-if="img"
                      :src="img"
                      class="w-full h-full object-cover"
                    />
                  </RouterLink>
                </div>
                <div
                  class="flex items-center justify-center absolute inset-0 opacity-0 group-hover:opacity-100 transiton-opacity duration-300 p-1 pointer-events-none z-20 group-hover:bg-yellow-700/30 dark:group-hover:bg-blue-950/10"
                >
                  <Icon
                    icon="line-md:search"
                    class="text-gray-950/100 dark:text-blue-950/90"
                    height="30"
                    width="40"
                  />
                </div>
              </template>
              <div
                v-else
                class="w-full w-full flex items-center justify-center"
              >
                <Icon
                  icon="line-md:image-twotone"
                  class="text-gray-950/100 dark:text-blue-950/90"
                  height="30"
                  width="40"
                />
              </div>
            </figure>
            <button
              class="absolute z-30 top-[-1%] right-0 animate-none hover:animate-wiggle"
              @click="handleDelete(item.id, item.type)"
            >
              <Icon
                icon="line-md:trash"
                class="text-red-950/100"
                height="30"
                width="30"
              />
            </button>
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

const authStore = useAuthStore();
const store = useGamesStore();
const props = defineProps<{ data: any[] }>();

function handleDelete(id: number, type: string): void {
  if (!authStore.token) {
    alert("A játékhez be kell jelentkezni");
    return;
  }

  if (confirm(`Biztosan törölni szeretnéd: ${type}`)) {
    store.DELETEcollectible(id);
  }
}

function filename(url: string): string {
  if (!url) return "";
  return url.split("/").pop() || "";
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

<style scoped></style>
