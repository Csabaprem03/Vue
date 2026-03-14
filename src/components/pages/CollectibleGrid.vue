<template>
    <List :items="props.data">
        <template #default="{ item }">
            <div class="my-4 mx-4 flex flex-row flex-3">

                <div v-for="(img,index) in  ImageSplit(item.images)" :key="index">
                    <RouterLink :to="{name:'collectible.id',params:{id:Number(item.id)}}">
                        <img v-if="img" referrerpolicy="no-referrer" :src="img" class="w-20">{{ img }}
                    </RouterLink>
                </div>
            </div>
        </template>
    </List>
</template>

<script setup lang="ts">
import List from './List.vue';

const props = defineProps<{ data: any[] }>()



function ImageSplit(ImageData:any) {
    if (!ImageData) return [];
    if (Array.isArray(ImageData)) return ImageData;
    if (typeof ImageData=='string') {
        return ImageData.split(',').map((image:string)=>image.trim()).filter((image:string) => image.length > 0)
    }
    return ImageData
}
</script>

<style scoped></style>