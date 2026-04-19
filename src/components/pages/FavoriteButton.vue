<template>
  <button
    class="hover:scale-110 transition-transform p-2"
    @click.stop="handleToggle"
    :disabled="favStore.isLoading"
  >
    <template v-if="authStore.token">
      <Icon
        v-if="isFavorite"
        icon="line-md:heart-filled"
        class="text-red-500"
        height="30"
        width="30"
      />
      <Icon
        v-else
        icon="line-md:heart"
        class="text-gray-400"
        height="30"
        width="30"
      />
    </template>
    <template v-else>
      <Icon icon="line-md:heart" class="text-gray-200" height="30" width="30" />
    </template>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { useFavoriteStore } from "../../stores/favoriteStore";
import { Icon } from "@iconify/vue";

const authStore = useAuthStore();
const favStore = useFavoriteStore();
const props = defineProps<{ gameId: number }>();

const isFavorite = computed(() => {
  const id = Number(props.gameId);
  return favStore.Favorites.some((f) => Number(f.game_id) === id);
});

function handleToggle() {
  if (!authStore.token) {
    alert("A kedvencekhez be kell jelentkezni");
    return;
  }
  favStore.ToggleFavorite(props.gameId);
}
</script>

<style scoped></style>
