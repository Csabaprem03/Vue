<template>
  <form
    class="flex flex-col items-center justify-center my-10"
    @submit.prevent="onSubmit"
  >
    <div
      class="border border-b border-gray-950/20 inset-shadow-2xs dark:inset-shadow-emerald-600/20 inset-shadow-yellow-600/40 dark:shadow-neutral-50/20 p-5 rounded-3xl shadow-2xl"
    >
      <!-- a slot használat  -->
      <slot />
    </div>
  </form>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import { watch } from "vue";

const props = defineProps<{ intialValue?: any }>();

// emit esetek és értekek

const emit = defineEmits<{
  (e: "submit", value: any): void;
}>();

// saját függvény és useForm a veevalidate importálnak

const { handleSubmit, setValues } = useForm({
  initialValues: props.intialValue,
});

watch(
  () => props.intialValue,
  (newValues) => {
    if (newValues) {
      setValues(newValues);
    }
  },
);

const onSubmit = handleSubmit(
  (values) => {
    console.log("Küldés indul...", values);
    emit("submit", values);
  },
  ({ errors }) => {
    console.error("hiba:", errors);
    alert("Hibás kitöltés!");
  },
);
</script>
