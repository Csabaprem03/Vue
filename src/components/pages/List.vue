<template>
    <div v-for="item in items" :key="item.id">
        <slot :item="item" />
    </div>
</template>
<script setup lang="ts">
defineProps<{
    items: any[]
}>()
</script>