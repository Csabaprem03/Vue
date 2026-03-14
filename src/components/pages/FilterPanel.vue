<template>
    <div class="border border-2 border-neutral-950/50">
        <div>
            <slot name="filteredSelect" />
        </div>
        <div>
            <slot name="fileredInput" />
        </div>
        <div>
            <slot name="fileredOption" />
        </div>
        <div class="flex flex-col items-center justify-center">
            <slot name="fileredButton" />
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>