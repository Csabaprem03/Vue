<template>
  <div class="grid grid-rows-3">
    <label
      :class="[
        ' mb-5 text-sm font-black transition-colors duration-300',
        labelClass,
      ]"
      >{{ props.label }}</label
    >
    <input
      @blur="handleBlur"
      @change="handleChange"
      :type="props.type === 'url' ? 'text' : props.type"
      :name="props.name"
      :class="inputClass"
      class="outline-none border rounded-md block bg-yellow-700/10 dark:bg-blue-950/20 w-[400px] h-[45px] text-sm text-gray-950/60 dark:text-neutral-50/80 pl-4"
    />
    <div v-if="errorMessage" class="text-red-500 font-bold text-sm mt-1 ml-1">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { ref, toRef, watch } from "vue";

interface Props {
  label: string;
  type: "url";
  name: string;
  validator?: any;
  validateOnChange?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  validator: undefined,
  validateOnChange: false,
});
const labelClass = ref<string>("text-zinc-600 dark:text-zinc-200");
const inputClass = ref<string>("text-zinc-600 dark:text-zinc-200");

const validateOnChange = toRef(props, "validateOnChange");

const {
  value,
  errorMessage,
  handleChange: vhandleChange,
  validate,
} = useField(props.name, props.validator, {
  validateOnValueUpdate: props.validateOnChange,
});

watch(errorMessage, (newError) => {
  if (newError) {
    labelClass.value = "text-red-500 ";
    inputClass.value = "border-red-500 ";
  } else if (value.value && value.value !== "") {
    labelClass.value = "text-green-700 0";
    inputClass.value = "border-green-500 ";
  } else {
    labelClass.value = "text-zinc-600 ";
    inputClass.value = "border-zinc-300 ";
  }
});

async function handleChange(e: Event) {
  const target = e.target as HTMLInputElement;
  vhandleChange(target.value);
}

async function handleBlur() {
  if (!validateOnChange.value) {
    const { valid } = await validate();
    if (valid) {
      labelClass.value = "text-green-700 0";
      inputClass.value = "border-green-500 ";
    } else {
      labelClass.value = "text-red-500 ";
      inputClass.value = "border-red-500 ";
    }
  }
}
</script>

<style scoped></style>
