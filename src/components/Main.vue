<script setup lang="ts">
import { Transition } from 'vue';
import { RouterView } from 'vue-router';

</script>

<template>
    <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in" :enter-active-class="route.meta.enterClass"
            :leave-active-class="route.meta.leaveClass">
            <component :is="Component" />
        </Transition>
    </RouterView>
</template>

<style scoped>
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