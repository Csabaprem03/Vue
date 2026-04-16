// kép Id alapján képet keres, ha nincs találat: üres marad
<template>
  <div>
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

    <!-- kattintás a képnek mutatás  -->
    <div v-else-if="item" class="max-w-6xl mx-auto p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="space-y-4">
          <div class="hover-3d">
            <figure
              class="h-100 rounded-2xl shadow-2xl shadow-gray-950/30 dark:shadow-neutral-50/20"
            >
              <img
                :src="activeImage || item.images[0] || defaultImage"
                @error="
                  (e) => ((e.target as HTMLImageElement).src = defaultImage)
                "
                class="w-full h-full object-contain"
              />
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

          <div class="grid grid-cols-4 gap-2">
            <!-- igaz-hamis logika alapján színváltozás -->
            <div
              v-for="(img, index) in item.images"
              :key="index"
              @click="activeImage = img"
              :class="[
                'cursor-pointer rounded-lg appearance-none overflow-hidden border-2 transition',
                activeImage === img
                  ? 'shadow-lg border-gray-950/80 shadow-gray-950/20 dark:shadow-neutral-50/20 dark:border-blue-950/90'
                  : 'border-transparent',
              ]"
            >
              <img
                v-if="img"
                :src="img || defaultImage"
                @error="
                  (e) => ((e.target as HTMLImageElement).src = defaultImage)
                "
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div
          class="p-4 space-y-6 dark:bg-blue-950/20 rounded-3xl shadow-2xl shadow-gray-950/30 dark:shadow-neutral-50/20 inset-shadow-2xs dark:inset-shadow-emerald-700/80 inset-shadow-emerald-950/70"
        >
          <div>
            <span
              class="text-yellow-700/50 font-bold text-shadow-2xs text-shadow-amber-600/20 dark:text-shadow-blue-950/40"
              >{{ item.type }}</span
            >
            <h1 class="text-4xl font-black mt-2">{{ item.description }}</h1>
          </div>

          <!-- tömb koordinátái: szelesség, hosszúság  -->
          <div v-if="item.map_location" class="p-2">
            <h4 class="text-gray-400 text-xs uppercase mb-3">
              Lelőhely (Koordináták)
            </h4>
            <div id="map" class="h-64 w-full rounded-lg z-0"></div>
            <p class="font-mono text-xl">
              Szelesség: {{ item.map_location[0] }}
            </p>
            <p class="font-mono text-xl">
              Hosszúság: {{ item.map_location[1] }}
            </p>
          </div>
          <div v-else>
            <img
              src="../../svg/no-map-svgrepo-com.svg"
              class="w-60 h-60 mx-auto p-2"
            />
            <p
              class="text-center text-3xl/4 italic font-extralight text-shadow-2xs dark:text-shadow-blue-950/20 text-shadow-yellow-600"
            >
              Nincs térképet!
            </p>
          </div>

          <!-- RouterLink vissza az útvonalhoz  -->
          <RouterLink
            to="/collectibles"
            class="animate-none hover:animate-wiggle btn btn-outline dark:btn-primary hover:text-neutral-50 shadow-lg dark:shadow-neutral-50/20 dark:inset-shadow-2xs dark:inset-shadow-neutral-50/90 shadow-gray-950/50 inset-shadow-2xs inset-shadow-yellow-600/70 px-6 py-3"
            >Vissza a gyűjthetői dolgokhoz</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from "vue";
import { useGamesStore } from "../../stores/gamesStore";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import defaultImage from "../../svg/icons8-default-image-50.svg";

// propok

const props = defineProps<{ id: number }>();

// a pina-k használat

const store = useGamesStore();
const activeImage = ref("");

// item vizsgálat az id azonosító alapján

let map: L.Map | null = null;

const item = computed(() => {
  return store.collectibles.find((c) => c.id === Number(props.id));
});

const initMap = async () => {
  if (!item.value?.map_location) return;

  const loc = item.value.map_location;

  if (loc[0] === null || loc[1] === null) return;

  const coords: [number, number] = [Number(loc[0]), Number(loc[1])];

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

// onMounted GETBYID ha talál, nincs találat esetén üres
onMounted(async () => {
  await store.GETallcollectibles();
  await initMap();
});

watchEffect(() => {
  if (item.value && item.value.images?.length > 0) {
    activeImage.value = item.value.images[0];
  } else if (!item.value && !store.isLoading) {
    store.GETCollectibleById(Number(props.id));
  }
});
</script>
<style scoped>
.leaflet-default-icon-path {
  background-image: url(https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png);
}
</style>
