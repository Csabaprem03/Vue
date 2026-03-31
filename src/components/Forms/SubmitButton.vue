<template>
  <button
    type="submit"
    :disabled="props.loading"
    class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
  >
    <span v-if="props.loading"> betöltés... </span>
    <span v-else>
      <slot />
    </span>
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{ loading: boolean }>();
</script>
