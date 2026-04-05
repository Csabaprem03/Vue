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
    <button
      @click="store.toggleMenu"
      type="button"
      class="flex flex-col p-2 w-10 h-10 text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading"
    >
      <Icon
        icon="line-md:menu"
        height="30"
        width="30"
        class="dark:text-white text-gray-800"
      />
    </button>
    <div
      :class="[
        'w-full md:w-auto',
        store.isOpen ? 'flex flex-col' : 'hidden md:flex md:flex-row ',
      ]"
    >
      <form @submit.prevent="handleSubmit" class="mx-auto">
        <FilterPanel
          class="md:w-160 w-70 item rounded-2xl flex md:flex-row flex-col justify-evenly px-2.5 py-2.5 gap-5 shadow-sm shadow-gray-950/20 dark:shadow-neutral-50/20"
        >
          <template #filteredSelect>
            <div class="grid md:grid-cols-2 gap-5">
              <div class="flex flex-col items-start gap-0.5">
                <label
                  class="text-sm text-shadow-2xs/20 text-shadow-blue-950/60 font-medium"
                  >Műfajok:</label
                >
                <select
                  name="__osszes__"
                  v-model="localGenre"
                  class="bg-neutral-50 dark:bg-[#0C0519] select-large appearance-none select select-neutral dark:select-primary shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
                >
                  <option selected value="__osszes__">Összes</option>
                  <option
                    v-for="(genre, index) in genres"
                    :key="index"
                    :value="genre"
                  >
                    {{ genre }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col items-start gap-0.5">
                <label
                  class="text-sm text-shadow-2xs text-shadow-blue-950/40 font-medium"
                  >Platformok:</label
                >
                <select
                  name="__osszes__"
                  v-model="localPlatform"
                  class="bg-neutral-50 dark:bg-[#0C0519] select-large appearance-none select select-neutral dark:select-primary shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
                >
                  <option selected value="__osszes__">Összes</option>
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
            <div class="flex flex-col items-start gap-0.5">
              <label
                class="text-sm text-shadow-2xs text-shadow-blue-950/40 font-medium"
                >Kereső:</label
              >
              <label
                class="input bg-neutral-50 dark:bg-[#0C0519] input-neutral dark:input-primary"
              >
                <Icon
                  icon="line-md:search"
                  class="text-gray-950/100 dark:text-blue-950/90"
                  height="15"
                  width="15"
                />
                <input v-model="localTitle" type="search" class="w-30" />
              </label>
            </div>
          </template>
          <template #fileredOption>
            <div class="flex flex-col items-start gap-0.5">
              <label
                class="text-sm text-shadow-2xs text-shadow-blue-950/40 font-medium"
                >Rendezés:</label
              >
              <select
                v-model="localOrder"
                class="bg-neutral-50 dark:bg-[#0C0519] select-large appearance-none select select-neutral dark:select-primary w-26 shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
              >
                <option selected value="a-z">Név: A-Z</option>
                <option value="z-a">Név: Z-A</option>
              </select>
            </div>
          </template>
          <template #fileredButton>
            <div class="flex flex-col justify-items-start items-center gap-2">
              <button
                type="submit"
                class="btn w-[89.56px] btn-sm btn-outline dark:btn-primary shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
              >
                Szűrés
              </button>
              <button
                type="button"
                @click="handleReset"
                class="btn btn-sm btn-outline dark:btn-primary shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
              >
                Alaphelyzet
              </button>
            </div>
          </template>
        </FilterPanel>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { FilteredGames } from "../../types";
import FilterPanel from "./FilterPanel.vue";
import { Icon } from "@iconify/vue";
import { useSettingStore } from "../../stores/settingsStore";

const store = useSettingStore();

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
