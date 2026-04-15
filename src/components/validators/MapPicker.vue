<template>
  <div class="flex flex-col gap-y-2.5">
    <label>{{ props.label }}</label>
    <div id="picker-map" class="h-64 w-[400px] rounded-lg mb-4 z-0"></div>
    <input type="hidden" :name="props.name" v-model="coords" />
    <div class="grid grid-rows-2 gap-4">
      <div class="space-y-2">
        <label>Szelesség:</label>
        <input
          type="number"
          v-model="manualLat"
          step="any"
          @input="updateFormInput"
          class="outline-none border rounded-md block bg-yellow-700/10 dark:bg-blue-950/20 h-[45px] text-sm text-gray-950/60 dark:text-neutral-50/80 pl-4"
        />
      </div>
      <div class="space-y-2">
        <label>Hosszúság:</label>
        <input
          type="number"
          v-model="manualLng"
          step="any"
          @input="updateFormInput"
          class="outline-none border rounded-md block bg-yellow-700/10 dark:bg-blue-950/20 h-[45px] text-sm text-gray-950/60 dark:text-neutral-50/80 pl-4"
        />
      </div>
    </div>
    <div class="text-red-500 dark:text-red-950 font-bold text-sm mt-1 ml-1">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { onMounted, ref, toRef, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
interface Props {
  label: string;
  name: string;
  modelValue?: Array<[number, number]>;
  validator?: any;
  validateOnChange?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  validator: undefined,
  validateOnChange: false,
});
const manualLat = ref<number | string>("");
const manualLng = ref<number | string>("");

const labelClass = ref<string>("text-zinc-600 dark:text-zinc-200");
const inputClass = ref<string>("text-zinc-600 dark:text-zinc-200");

const validateOnChange = toRef(props, "validateOnChange");

const emit = defineEmits<{
  (e: "update:modelValue", value: [number, number] | null): void;
}>();

let map: L.Map | null = null;
let marker: L.Marker | null = null;

const {
  value: coords,
  errorMessage,
  validate,
} = useField<[number, number] | null>(props.name, props.validator, {
  validateOnValueUpdate: props.validateOnChange,
});

const updateMarker = (lat: number, lng: number) => {
  if (!map) return;

  const newPos = new L.latLng(lat, lng);
  if (marker) {
    marker.setLatLng(newPos);
  } else {
    marker = L.circleMarker(newPos, {
      radius: 8,
      fillColor: "oklab(.722 .018 .131)",
      color: "oklab(1 0 0)",
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

async function handleBlur() {
  if (!validateOnChange.value) {
    const { valid } = await validate();
    if (valid) {
      labelClass.value = "text-green-700 dark:text-emerald-950";
      inputClass.value = "border-green-500 dark:border-emerald-900";
    } else {
      labelClass.value = "text-red-500 dark:text-red-950";
      inputClass.value = "border-red-500 dark:border-red-900";
    }
  }
}
</script>

<style scoped>
.leaflet-default-icon-path {
  background-image: url(https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png);
}
</style>
