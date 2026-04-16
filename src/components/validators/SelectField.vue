<template>
  <div class="grid grid-rows-3">
    <label
      :class="['text-sm font-black transition-colors duration-300', labelClass]"
      >{{ props.label }}</label
    >
    <select
      :class="[
        'outline-none border rounded-md block bg-yellow-700/10 dark:bg-blue-950/20 w-[400px] h-[45px] text-sm text-gray-950/60 dark:text-neutral-50/80 pl-4',
        inputClass,
      ]"
      :name="props.name"
      @blur="handleBlur"
      v-model="value"
    >
      <option
        class="bg-yellow-700/10 dark:bg-blue-950/50 text-gray-950/60 dark:text-neutral-50/80"
        value=""
        disabled
      >
        Válassz egy videójátékot...
      </option>
      <option
        class="bg-yellow-700/10 dark:bg-blue-950/50 text-gray-950/60 dark:text-neutral-50/80"
        v-for="item in sortedOptions"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <div class="text-red-500 dark:text-red-950 font-bold text-sm mt-1 ml-1">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { computed, ref, toRef, watch } from "vue";

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  label: string;

  name: string;
  options: Array<Option>;
  validator: any;
  validateOnChange?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  validator: undefined,
  validateOnChange: false,
});

const labelClass = ref<string>("text-zinc-600 dark:text-zinc-200");
const inputClass = ref<string>("text-zinc-600 dark:text-zinc-200");

const validateOnChange = toRef(props, "validateOnChange");

const { value, errorMessage, validate } = useField(
  props.name,
  props.validator,
  { initialValue: "", validateOnValueUpdate: props.validateOnChange },
);

const sortedOptions = computed(() => {
  return [...props.options].sort((a, b) => a.label.localeCompare(b.label));
});

watch(errorMessage, (newError) => {
  if (newError) {
    labelClass.value = "text-red-500 dark:text-red-950";
    inputClass.value = "border-red-500 dark:border-red-900";
  } else if (value.value !== undefined) {
    labelClass.value = "text-green-700 dark:text-emerald-950";
    inputClass.value = "border-green-500 dark:border-emerald-900";
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

<style scoped></style>
