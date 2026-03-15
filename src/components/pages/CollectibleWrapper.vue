<template>
    <div>
        <Suspense>
            <template #default>
                <CollectibleDetails :id="id"/>
            </template>
            <template #fallback>
                betöltése...
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import SkeletonLoading from './SkeletonLoading.vue';

defineProps<{id:number}>()
const CollectibleDetails=defineAsyncComponent({
    loader: ()=>import('../domains/CollectibleDetails.vue'),
    delay:200,
    timeout:3000
})

</script>

<style scoped>

</style>