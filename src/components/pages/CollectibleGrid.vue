<template>
  <List :items="props.data">
    <template #default="{ item }">
      <div class="my-4 mx-4 grid grid-cols-4">
        <div v-for="(img, index) in ImageSplit(item.images)" :key="index">
          <RouterLink
            :to="{ name: 'collectible.id', params: { id: Number(item.id) } }"
          >
            <img v-if="img" :src="img" class="w-20" />{{ img }}
          </RouterLink>
        </div>
      </div>
    </template>
  </List>
</template>

<script setup lang="ts">
import List from "./List.vue";

const props = defineProps<{ data: any[] }>();

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
