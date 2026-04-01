<template>
  <div v-if="item" class="max-w-6xl mx-auto p-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div class="space-y-4">
        <div class="">
          <img
            :src="activeImage || item.images[0]"
            class="w-full h-full object-contain"
          />
        </div>

        <div class="grid grid-cols-4 grid-cols-4 gap-2">
          <div
            v-for="(img, index) in item.images"
            :key="index"
            @click="activeImage = img"
            :class="[
              'cursor-pointer rounded-lg overflow-hidden border-2 transition',
              activeImage === img ? 'border-blue-500' : 'border-transparent',
            ]"
          >
            <img
              :src="img"
              class="w-full h-20 object-cover opacity-70 hover:opacity-100"
            />
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <span class="text-blue-500">{{ item.type }}</span>
          <h1 class="text-4xl font-black mt-2">{{ item.description }}</h1>
        </div>

        <div v-if="item.map_location" class="p-4">
          <h4 class="text-gray-400 text-xs uppercase mb-3">
            Lelőhely (Koordináták)
          </h4>
          <div id="map" class="h-64 w-full rounded-lg mb-4 z-0"></div>
          <p class="font-mono text-xl">Lat: {{ item.map_location[0] }}</p>
          <p class="font-mono text-xl">Lng: {{ item.map_location[1] }}</p>
        </div>

        <RouterLink to="/collectibles" class="px-6 py-3">Vissza</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from "vue";
import { useGamesStore } from "../../stores/gamesStore";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const props = defineProps<{ id: number }>();
const store = useGamesStore();
const activeImage = ref("");

let map: L.map | null = null;
const item = computed(() => {
  return store.collectibles.find((c) => c.id === Number(props.id));
});

const initMap = async () => {
  if (!item.value?.map_location) return;

  const coords = item.value.map_location as [number, number];

  if (!map) {
    map = L.map("map", {
      minZoom: 3,
      maxZoom: 18,
    }).setView(coords, 13);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
    ).addTo(map);
  } else {
    map.setView(coords, 13);
  }

  L.marker(coords)
    .addTo(map)
    .bindPopup(`${item.value.description} helyszíne`)
    .openPopup();
};

onMounted(async () => {
  await initMap();
});

watchEffect(() => {
  if (!item.value) {
    store.GETCollectibleById(Number(props.id));
  }
  if (
    !item.value &&
    item.value.images.length > 0 &&
    typeof item.value === "string"
  ) {
    item.value.activeImage = item.value.images[0];
  }
  console.log(item.value);
});
</script>
<style scoped>
.leaflet-default-icon-path {
  background-image: url(https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png);
}
</style>
