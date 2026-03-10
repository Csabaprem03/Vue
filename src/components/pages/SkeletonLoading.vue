<script setup lang="ts">
import Card from './Card.vue';
import List from './List.vue';

</script>

<template>
    <div class="my-4 mx-4 flex flex-row gap-5">
        <List :items="">
            <template #default="{ item }">
                <Card
                    class="flex flex-col items-center justify-center my-4  border border-neutral-800 p-3 py-4 h-80 w-[198px]">
                    <div class="my-1">
                        <img
                            class="w-43 max-h-54 object-cover rou">
                    </div>
                    <h1 class=""></h1>
                    <p class=""></p>
                </Card>
            </template>
        </List>
    </div>
</template>