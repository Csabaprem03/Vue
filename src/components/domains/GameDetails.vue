<script setup lang="ts">
import Card from '../pages/Card.vue';
import List from '../pages/List.vue';
import { Game } from '../../types';
import { ref } from 'vue';

const games=ref<Game[]>([])
</script>

<template>
    <List :item="games">
        <template #default="{item}">
            <Card>
                <h1>{{ item.name }}</h1>
            </Card>
        </template>
    </List>
</template>
