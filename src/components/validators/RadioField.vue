<template>
  <div>
    <label :class="labelClass">{{ props.label }}</label>
    <input
      @blur="handleBlur"
      type="radio"
      :name="props.name"
      :value="props.radioValue"
      v-model="value"
    />
    <span v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { ref, watch } from "vue";

interface Props {
  label: string;
  name: string;
  radioValue: any;
  validator: any;
}

const props = defineProps<Props>();
const labelClass = ref<string>("text-zinc-600");

const { value, errorMessage, validate } = useField(
  props.name,
  props.validator,
  {
    type: "radio",
    checkedValue: props.radioValue,
  },
);

watch(errorMessage, (error) => {
  labelClass.value = error ? "text-red-500" : "text-zinc-600";
});

const handleBlur = () => validate();
</script>

<style scoped></style>
