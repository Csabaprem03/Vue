<script setup lang="ts">
import { Transition } from "vue";
// vue-router importálása: RouterView
import { RouterView } from "vue-router";
</script>

<template>
  <main>
    <!-- v-slot dinamikus komponens, mint v-bind  -->
    <RouterView v-slot="{ Component, route }">
      <!-- átalakulás (transition), fade - homályos, out-in - eltűnés, összekötve v-bind: animáció és az
animate.css importálása  -->

      <!-- css és tailwindcss -> osztályok szabályai:  .fade-enter-from és .fade-enter-to homályos és 
eltűnés, .fade-enter-active,.fade-leave-active: @keyframes beállítás, és animációs 
sebesség, áttűnéssel mutat vagy kitakar -->

      <Transition
        name="fade"
        mode="out-in"
        :enter-active-class="route.meta.enterClass"
        :leave-active-class="route.meta.leaveClass"
      >
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
</template>

<style scoped>
@import "animate.css";
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  animation: fade-in-opacity 0.5s ease-in-out;
}

@keyframes fade-in-opacity {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
</style>
