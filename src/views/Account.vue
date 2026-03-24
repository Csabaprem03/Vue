<template>
    <div>
        <Card class="rounded-4xl">
            <RouterLink :to="{name:'publisher'}">Videojáték-kiadó</RouterLink>
            <RouterLink :to="{name:'games.post'}">Videojáték-kiadó: Játék</RouterLink>
            <RouterLink :to="{name:'collectibles.post'}">Videojáték-kiadó: Gyűjthető dolog</RouterLink>
            <RouterView />
        </Card>
    </div>
</template>

<script setup lang="ts">
import Card from '../components/pages/Card.vue';


</script>

<style scoped>

</style>