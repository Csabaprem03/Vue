<template>
  <div>
    <!-- a feszültség default (alapértelmezett) és fallback (visszaesés), alapértelemezett 
komponenshez, visszaesés idő és lassú betöltés „lusta betöltés (lazy loading)” 
a slug prop kapcsolatként  -->
    <Suspense>
      <template #default>
        <!-- a slug prop kapcsolatként  -->
        <GameDetails :slug="slug" :key="slug" />
      </template>
      <template #fallback> betöltése... </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

defineProps<{ slug: string }>();

// a defineAsyncComponent Vue importálnak, mint lusta betöltés, egy import, késleltetés, túlidőzítő
const GameDetails = defineAsyncComponent({
  loader: async () => {
    return await import("../components/domains/GameDetails.vue");
  },
  delay: 200,
});
</script>

<style scoped></style>
