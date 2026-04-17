<template>
  <div
    class="flex flex-row md:flex-row justify-between items-center my-4 mx-4 relative"
  >
    <button
      @click="store.toggleMenu"
      type="button"
      class="flex flex-col p-2 w-10 h-10 text-sm text-body rounded-base md:hidden z-50"
    >
      <Icon
        :icon="store.isOpen ? 'line-md:close' : 'line-md:menu'"
        height="30"
        width="30"
        class="dark:text-white text-gray-800"
      />
    </button>
    <button
      @click="settings.toggleButton"
      class="z-50 hover:scale-110 transition-transform"
    >
      <template v-if="settings.isGrid">
        <Icon icon="material-symbols-light:flex-wrap" height="40" width="40" />
      </template>
      <template v-else>
        <Icon
          icon="fluent:layout-column-two-32-filled"
          height="40"
          width="40"
        />
      </template>
    </button>
    <Transition name="fade">
      <div
        v-if="store.isOpen || !isMobile"
        :class="[
          'w-full md:w-auto absolute md:relative top-full left-0 md:z-[30] z-[90] mt-2  md:bg-transparent p-6 md:p-0 rounded-b-2xl shadow-2xl md:shadow-none',
          store.isOpen ? 'flex flex-col' : 'hidden md:flex md:flex-row',
        ]"
      >
        <form @submit.prevent="handleSubmit" class="mx-auto w-full">
          <FilterPanel
            class="md:w-[46.850rem] w-70 item rounded-2xl justify-start flex md:flex-row flex-wrap flex-row md:justify-evenly px-9.5 md:px-2.5 py-2.5 gap-5 shadow-sm shadow-gray-950/20 dark:shadow-neutral-50/20"
          >
            <template #filteredSelect>
              <div class="grid md:grid-cols-2 grid-cols-2 gap-6">
                <div class="flex flex-col items-start gap-0.5">
                  <label
                    class="text-sm text-shadow-2xs/20 text-shadow-blue-950/60 font-medium"
                    >Műfajok:</label
                  >
                  <select
                    name="__osszes__"
                    v-model="localGenre"
                    class="bg-neutral-50 dark:bg-[#0C0519] select-large appearance-none select select-neutral dark:border-neutral-50 shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50 w-[5.99rem] md:w-[6.001rem]"
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
                    class="bg-neutral-50 dark:bg-[#0C0519] select-large appearance-none select select-neutral dark:border-neutral-50 shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50 w-[5.99rem] md:w-[6.001rem]"
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
                  class="input bg-neutral-50 dark:bg-[#0C0519] input-neutral dark:border-neutral-50"
                >
                  <Icon
                    icon="line-md:search"
                    class="text-gray-950/100 dark:text-neutral-100/80"
                    height="15"
                    width="15"
                  />
                  <input
                    v-model="localTitle"
                    type="search"
                    class="w-40.5 md:w-30"
                  />
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
                  class="bg-neutral-50 dark:bg-[#0C0519] select-large appearance-none select select-neutral dark:border-neutral-50 w-26 shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
                >
                  <option selected value="a-z">Név: A-Z</option>
                  <option value="z-a">Név: Z-A</option>
                </select>
              </div>
            </template>
            <template #fileredButton>
              <div
                class="flex md:flex-col flex-row justify-items-start items-center gap-2"
              >
                <button
                  type="submit"
                  class="btn w-[6.563rem] btn-sm btn-outline dark:hover:text-neutral-950/100 dark:hover:bg-neutral-100/80 shadow-sm hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
                >
                  Szűrés/Rendezés
                </button>
                <button
                  type="button"
                  @click="handleReset"
                  class="btn w-[6.563rem] btn-sm btn-outline dark:hover:text-neutral-950/100 dark:hover:bg-neutral-100/80 shadow-sm hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
                >
                  Alaphelyzet
                </button>
              </div>
            </template>
          </FilterPanel>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import type { FilteredGames } from "../../types";
import FilterPanel from "./FilterPanel.vue";
import { Icon } from "@iconify/vue";
import { useSettingStore } from "../../stores/settingsStore";

const store = useSettingStore();
const isMobile = ref(window.innerWidth < 768);
const checkMobile = () => (isMobile.value = window.innerWidth < 768);

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

onMounted(() => window.addEventListener("resize", checkMobile));
onUnmounted(() => window.removeEventListener("resize", checkMobile));

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

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  :deep(.item) {
    width: 85% !important;
  }
}
</style>
