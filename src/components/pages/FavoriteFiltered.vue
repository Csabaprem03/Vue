<template>
    <form @submit.prevent="handleSubmit">
                <FilterPanel class="w-150 rounded-2xl flex flex-row justify-evenly py-1.5">
                    <template #fileredOption>
                        <div class="flex flex-col items-start">
                            <label>renderezés</label>
                            <select v-model="localOrder">
                                <option value="a-z">Név: A-Z</option>
                                <option value="z-a">Név: Z-A</option>
                            </select>
                        </div>
                    </template>
                    <template #fileredButton>
                        <div class="flex flex-col justify-items-start items-center">
                            <button type="submit">szűrés</button>
                            <button type="button" @click="handleReset">Alaphelyzet</button>
                        </div>
                    </template>
                </FilterPanel>
            </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { FilteredGames } from '../../types';
import FilterPanel from './FilterPanel.vue';

interface Props {
    modelValue: FilteredGames;
    settings:any
}
const props = defineProps<Props>()
const emits = defineEmits<{
    'update:modelValue': [value: Partial<FilteredGames>]
    'apply': [value: Partial<FilteredGames>];
    'reset': []
}>()


const localOrder = ref<string>(props.modelValue.order)

function handleSubmit(): void {
    const appropriate: Partial<FilteredGames> = {
        order: localOrder.value
    }
    emits('update:modelValue', appropriate)
    emits('apply', appropriate)
}
function handleReset(): void {

    localOrder.value = 'a-z';
    const appropriate: Partial<FilteredGames> = {
        order: 'a-z'
    }
    emits('update:modelValue', appropriate)
    emits('reset'),
        emits('apply', appropriate)
}

watch(() => props.modelValue, (newValue) => {
        localOrder.value = newValue.order;
})
</script>

<style scoped>

</style>