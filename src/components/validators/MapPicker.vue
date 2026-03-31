<template>
  <div>
    <label>{{ props.label }}</label>
    <div id="picker-map" class="h-64 w-full rounded-lg mb-4 z-0"></div>
    <input type="hidden" :name="props.name" v-model="coords" />
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <label>Szelesség:</label>
        <input
          type="number"
          v-model="manualLat"
          step="any"
          @input="updateFormInput"
        />
      </div>
      <div class="space-y-2">
        <label>Hosszúság:</label>
        <input
          type="number"
          v-model="manualLng"
          step="any"
          @input="updateFormInput"
        />
      </div>
    </div>
    <p v-if="errorMessage" class="text-red-500 text-xs mt-1">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { onMounted, ref, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
interface Props {
  label: string;
  name: string;
  modelValue?: Array<[number, number]>;
  validator?: any;
}

const props = defineProps<Props>();
const manualLat = ref<number | string>("");
const manualLng = ref<number | string>("");
const labelClass = ref<string>("text-zinc-600");
const inputClass = ref<string>("text-zinc-600");
const emit = defineEmits<{
  (e: "update:modelValue", value: [number, number] | null): void;
}>();

let map: L.Map | null = null;
let marker: L.Marker | null = null;

const {
  value: coords,
  errorMessage,
  validate,
} = useField<[number, number] | null>(props.name, props.validator);

const updateMarker = (lat: number, lng: number) => {
  if (!map) return;

  const newPos = new L.latLng(lat, lng);
  if (marker) {
    marker.setLatLng(newPos);
  } else {
    marker = L.circleMarker(newPos, {
      radius: 8,
      fillColor: "#ce9c31",
      color: "#fff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
    }).addTo(map!);
  }
  map.setView(newPos, map.getZoom());
};

const updateFormInput = () => {
  const lat = parseFloat(manualLat.value.toString());
  const lng = parseFloat(manualLng.value.toString());

  if (!isNaN(lat) && !isNaN(lng)) {
    const newCoords: [number, number] = [lat, lng];
    coords.value = newCoords;
    emit("update:modelValue", newCoords);
    updateMarker(lat, lng);
  }
};

onMounted(() => {
  const startprop: [number, number] = props.modelValue || [47.1625, 19.5033];

  map = L.map("picker-map").setView(startprop, 13);
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
  ).addTo(map);
  map.on("click", (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    coords.value = [lat, lng];
    manualLat.value = lat.toFixed(5);
    manualLng.value = lng.toFixed(5);
    emit("update:modelValue", [lat, lng]);
    updateMarker(lat, lng);
  });

  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue) {
        manualLat.value = newValue[0];
        manualLng.value = newValue[1];
        updateMarker(newValue[0], newValue[1]);
      } else if (marker && map) {
        map.removeLayer(marker);
        marker = null;
        manualLat.value = "";
        manualLng.value = "";
      }
    },
  );
});

watch(errorMessage, (error) => {
  if (error) {
    labelClass.value = "text-red-500";
    inputClass.value = "border-red-500 bg-red-50";
  } else if (coords.value) {
    labelClass.value = "text-green-700";
    inputClass.value = "border-green-500 bg-green-50";
  } else {
    labelClass.value = "text-zinc-600";
    inputClass.value = "border-zinc-300";
  }
});

const handleBlur = () => validate();
</script>

<style scoped>
.leaflet-default-icon-path {
  background-image: url(https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png);
}
</style>
