<template>
  <div class="flex flex-row justify-between my-4 mx-4">
    <button @click="settings.toggleButton">
      <template v-if="settings.isGrid">
        <Icon icon="material-symbols-light:flex-wrap" height="40" width="40" />
      </template>
      <template v-else>
        <Icon icon="line-md:grid-3-filled" height="40" width="40" />
      </template>
    </button>
    <form @submit.prevent="handleSubmit">
      <FilterPanel
        class="w-150 rounded-2xl flex flex-row justify-evenly py-1.5"
      >
        <template #filteredSelect>
          <div class="grid grid-cols-2">
            <div class="flex flex-col items-start">
              <label>Műfaj</label>
              <select name="__osszes__" v-model="localGenre">
                <option value="__osszes__">Összes</option>
                <option
                  v-for="(genre, index) in genres"
                  :key="index"
                  :value="genre"
                >
                  {{ genre }}
                </option>
              </select>
            </div>
            <div class="flex flex-col items-start">
              <label>platformok</label>
              <select name="__osszes__" v-model="localPlatform">
                <option value="__osszes__">Összes</option>
                <option
                  v-for="(platform, index) in platforms"
                  :key="index"
                  :value="platform"
                >
                  {{ platform }}
                </option>
              </select>
            </div>
          </div>
        </template>
        <template #fileredInput>
          <div class="flex flex-col items-start">
            <label>kereső</label>
            <input v-model="localTitle" type="text" class="w-30" />
          </div>
        </template>
        <template #fileredOption>
          <div class="flex flex-col items-start">
            <label>renderező</label>
            <select v-model="localOrder">
              <option value="a-z">Név: A-Z</option>
              <option value="z-a">Név: Z-A</option>
            </select>
          </div>
        </template>
        <template #fileredButton>
          <div class="flex flex-col justify-items-start items-center">
            <button type="submit">szűrés</button>
            <button type="button" @click="handleReset">Alaphelyzet</button>
          </div>
        </template>
      </FilterPanel>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { FilteredGames } from "../../types";
import FilterPanel from "./FilterPanel.vue";
import { Icon } from "@iconify/vue";

interface Props {
  genres: Array<string>;
  platforms: Array<string>;
  modelValue: FilteredGames;
  settings: any;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  "update:modelValue": [value: FilteredGames];
  apply: [value: FilteredGames];
  reset: [];
}>();

const localGenre = ref<string>(props.modelValue.nameGenre);
const localPlatform = ref<string>(props.modelValue.namePlatform);
const localTitle = ref<string>(props.modelValue.title);
const localOrder = ref<string>(props.modelValue.order);

function handleSubmit(): void {
  const appropriate: FilteredGames = {
    nameGenre: localGenre.value,
    namePlatform: localPlatform.value,
    title: localTitle.value,
    order: localOrder.value,
  };
  emits("update:modelValue", appropriate);
  emits("apply", appropriate);
}
function handleReset(): void {
  localGenre.value = "__osszes__";
  localPlatform.value = "__osszes__";
  localTitle.value = "";
  localOrder.value = "a-z";
  const appropriate: FilteredGames = {
    nameGenre: "__osszes__",
    namePlatform: "__osszes__",
    title: "",
    order: "a-z",
  };
  emits("update:modelValue", appropriate);
  (emits("reset"), emits("apply", appropriate));
}

watch(
  () => props.modelValue,
  (newValue) => {
    localGenre.value = newValue.nameGenre;
    localPlatform.value = newValue.namePlatform;
    localTitle.value = newValue.title;
    localOrder.value = newValue.order;
  },
);
</script>

<style scoped></style>
