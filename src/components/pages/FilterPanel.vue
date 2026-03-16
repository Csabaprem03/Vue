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
        <div >
            <button>
                <slot name="fileredButton" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>