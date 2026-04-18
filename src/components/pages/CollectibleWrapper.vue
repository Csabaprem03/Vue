<template>
  <div>
    <!-- a feszültség default (alapértelmezett) és fallback (visszaesés), alapértelemezett komponenshez, visszaesés idő és lassú betöltés „lusta betöltés (lazy loading)” -->
    <Suspense>
      <template #default>
        <!-- az id azonosító prop kapcsolatnak  -->
        <CollectibleDetails :id="id" />
      </template>
      <template #fallback> betöltése... </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

defineProps<{ id: number }>();

// a defineAsyncComponent Vue importálnak, mint lusta betöltés, egy import, késleltetés, túlidőzítő
const CollectibleDetails = defineAsyncComponent({
  loader: () => import("../domains/CollectibleDetails.vue"),
  delay: 300,
  timeout: 3000,
});
</script>

<style scoped></style>
