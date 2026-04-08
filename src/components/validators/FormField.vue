<template>
  <section class="my-3">
    <div class="grid grid-rows-3 -my-6.5">
      <label
        :class="[
          'text-sm font-black transition-colors duration-300',
          labelClass,
        ]"
        >{{ props.label }}</label
      >
      <input
        :placeholder="props.placeholder ?? ''"
        @blur="handleBlur"
        :type="props.type"
        :class="inputClass"
        :name="props.name"
        class="outline-none border rounded-md block bg-yellow-700/10 dark:bg-blue-950/20 w-[400px] h-[45px] text-sm text-gray-950/60 dark:text-neutral-50/80 pl-4"
        v-model="value"
      />
      <div class="text-red-500 dark:text-red-950 font-bold text-sm mt-1 ml-1">
        {{ errorMessage }}
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { defineRule, useField } from "vee-validate";
import { ref, toRef, watch } from "vue";
import { StringSchema } from "yup";

interface Props {
  label: string;
  type: "text" | "email" | "password" | "number";
  placeholder: string | null;
  name: string;
  validator?: StringSchema<string> | undefined;
  validateOnChange?: boolean;
  rules?: string;
}

defineRule("confirmed", (value: any, [target]: any) => {
  if (!value) {
    return "köletező mező";
  }
  if (value === target) {
    return true;
  }
  return "A jelszavak nem egyeznek";
});

const props = withDefaults(defineProps<Props>(), {
  validator: undefined,
  validateOnChange: false,
});

const labelClass = ref<string>("text-zinc-600 dark:text-zinc-200");
const inputClass = ref<string>("text-zinc-600 dark:text-zinc-200");

const validateOnChange = toRef(props, "validateOnChange");

const { value, errorMessage, validate } = useField(
  props.name,
  props.rules ?? props.validator,
  {
    validateOnValueUpdate: props.validateOnChange,
  },
);

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
