<script setup lang="ts">
import { Transition } from "vue";
import { useRoute } from "vue-router";
// vue-router importálása: RouterView
import { RouterView } from "vue-router";
const route = useRoute();
</script>

<template>
  <main>
    <!-- átalakulás (transition), fade - homályos, out-in - eltűnés, összekötve v-bind: animáció és az
animate.css importálása  -->

    <!-- css és tailwindcss -> osztályok szabályai:  .fade-enter-from és .fade-enter-to homályos és 
eltűnés, .fade-enter-active,.fade-leave-active: @keyframes beállítás, és animációs 
sebesség, áttűnéssel mutat vagy kitakar -->

    <Transition
      mode="out-in"
      :enter-active-class="
        (route.meta.enterClass as string) || 'animate__animated animate__fadeIn'
      "
      :leave-active-class="
        (route.meta.leaveClass as string) ||
        'animate__animated animate__fadeOut'
      "
    >
      <RouterView />
    </Transition>
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
