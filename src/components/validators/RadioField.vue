<template>
  <section class="my-3">
    <div class="grid grid-rows-3 -my-4.4">
      <label
        :class="[
          'text-sm font-black transition-colors duration-300',
          labelClass,
        ]"
        >{{ props.label }}</label
      >
      <div
        class="w-4 h-4.5 rounded-4xl flex flex-col items-start justify-center ml-4.5 has-checked:bg-gray-950/10 has-checked:text-gray-900/20 has-checked:ring-gray-950/20 dark:has-checked:bg-blue-950/20 dark:has-checked:text-blue-800/20 dark:has-checked:ring-neutral-50/70"
      >
        <input
          @blur="handleBlur"
          type="radio"
          :name="props.name"
          :value="props.radioValue"
          v-model="value"
          class="checked:border-indigo-500"
        />
      </div>
      <div
        v-if="errorMessage"
        class="text-red-500 dark:text-red-950 font-bold text-sm mt-1 ml-1"
      >
        {{ errorMessage }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { ref, toRef, watch } from "vue";

interface Props {
  label: string;
  name: string;
  radioValue: any;
  validator: any;
  validateOnChange?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  validator: undefined,
  validateOnChange: false,
});
const labelClass = ref<string>("text-zinc-600 dark:text-zinc-200");

const validateOnChange = toRef(props, "validateOnChange");

const { value, errorMessage, validate } = useField(
  props.name,
  props.validator,
  {
    type: "radio",
    checkedValue: props.radioValue,
    validateOnValueUpdate: props.validateOnChange,
  },
);

watch(errorMessage, (newError) => {
  if (newError) {
    labelClass.value = "text-red-500 dark:text-red-950";
  } else if (value.value !== undefined) {
    labelClass.value = "text-green-700 dark:text-emerald-950";
  }
});

async function handleBlur() {
  if (!validateOnChange.value) {
    const { valid } = await validate();
    if (valid) {
      labelClass.value = "text-green-700 dark:text-emerald-950";
    } else {
      labelClass.value = "text-red-500 dark:text-red-950";
    }
  }
}
</script>

<style scoped></style>
