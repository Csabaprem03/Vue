<template>
    <div>
        <Card class="rounded-4xl">
            <RouterLink :to="{name:'publisher'}">Videojáték-kiadó</RouterLink>
            <RouterLink :to="{name:'games.post'}">Videojáték-kiadó: Játék</RouterLink>
            <RouterLink :to="{name:'collectibles.post'}">Videojáték-kiadó: Gyűjthető dolog</RouterLink>
            <RouterView v-slot="{ Component, route }">
            <Transition name="fade" mode="out-in" :enter-active-class="route.meta.enterClass"
                :leave-active-class="route.meta.leaveClass">
                <component :is="Component" :key="route.path"/>
            </Transition>
        </RouterView>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { Transition } from 'vue';
import Card from '../components/pages/Card.vue';


</script>

<style scoped>

</style>