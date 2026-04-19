<template>
  <div
    class="mb-4 md:mb-[8.35rem] flex flex-row md:flex-row justify-between items-center my-4 mx-4 relative"
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
    <div
      v-if="store.isOpen || !isMobile"
      :class="[
        'w-120 md:w-auto absolute md:absolute top-full right-0 left-auto md:z-[30] z-[90] mt-2 md:bg-transparent p-6 md:p-0 rounded-b-2xl shadow-2xl md:shadow-none',
        store.isOpen
          ? 'flex flex-col items-center'
          : 'hidden md:flex md:flex-row',
      ]"
    >
      <Transition name="fade">
        <form @submit.prevent="handleSubmit" class="mx-auto w-full">
          <FilterPanel
            class="md:w-[43.845rem] w-60 md:max-w-none item rounded-2xl justify-center md:justify-start flex flex-row flex-wrap md:justify-evenly px-4 md:px-[1.65rem] py-4 mb-6 gap-5 shadow-sm shadow-gray-950/20 dark:shadow-neutral-50/20"
          >
            >
            <template #filteredSelect>
              <div class="flex flex-col items-start gap-0.5">
                <label
                  class="text-sm text-shadow-2xs/20 text-shadow-blue-950/60 font-medium"
                  >Típusok:</label
                >
                <select
                  name="__osszes__"
                  v-model="localType"
                  class="bg-neutral-50 dark:bg-[#0C0519] select-large appearance-none select select-neutral w-51.5 dark:border-neutral-50 shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50"
                >
                  <option selected value="__osszes__">Összes</option>
                  <option
                    v-for="(type, index) in types"
                    :key="index"
                    :value="type"
                  >
                    {{ type }}
                  </option>
                </select>
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
                    v-model="localDescription"
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
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import type { FilteredCollectibles } from "../../types";
import { useSettingStore } from "../../stores/settingsStore";
import FilterPanel from "./FilterPanel.vue";
import { Icon } from "@iconify/vue";

const store = useSettingStore();
const isMobile = ref(window.innerWidth < 768);
const checkMobile = () => (isMobile.value = window.innerWidth < 768);

interface Props {
  types: Array<string>;
  modelValue: FilteredCollectibles;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  "update:modelValue": [value: FilteredCollectibles];
  apply: [value: FilteredCollectibles];
  reset: [];
}>();

const localType = ref<string>(props.modelValue.nameType);
const localDescription = ref<string>(props.modelValue.nameDescription);
const localOrder = ref<string>(props.modelValue.order);

function handleSubmit(): void {
  const appropriate: FilteredCollectibles = {
    nameType: localType.value,
    nameDescription: localDescription.value,
    order: localOrder.value,
  };
  emits("update:modelValue", appropriate);
  emits("apply", appropriate);
}
function handleReset(): void {
  localType.value = "__osszes__";
  localDescription.value = "";
  localOrder.value = "a-z";
  const appropriate: FilteredCollectibles = {
    nameType: "__osszes__",
    nameDescription: "",
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
    localType.value = newValue.nameType;
    localDescription.value = newValue.nameDescription;
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
@media (min-width: 768px) {
  /* Kényszerítjük a konténert a jobb szélre */
  .md\:absolute {
    right: 0 !important;
    left: auto !important;
  }

  /* A form tartalmát is jobbra toljuk */
  form {
    display: flex;
    justify-content: flex-end;
  }
}
@media (max-width: 768px) {
  :deep(.item) {
    width: 75% !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 2rem !important;
  }
}
</style>
