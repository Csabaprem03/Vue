<template>
  <button
    type="submit"
    :disabled="props.loading"
    class="btn btn-sm btn-outline dark:btn-primary shadow-lg hover:shadow-gray-950/50 dark:hover:shadow-neutral-50/50 mt-2.5"
  >
    <!-- eset v-if és v-else  -->
    <span v-if="props.loading"> betöltés... </span>
    <span v-else>
      <slot />
    </span>
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{ loading: boolean }>();
</script>
