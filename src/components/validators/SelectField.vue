<template>
    <div>
        <select v-if="props.type==='string'" :name="props.name"  @blur="handleBlur" v-model="value">
            <option value="" selected>Válassz egy videójátékot...</option>
            <option v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</option>
        </select>
        <span v-if="errorMessage">{{ errorMessage }}</span>
    </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { ref,  watch, } from 'vue';
import type { StringSchema } from 'yup';

interface Props {
    label: string,
    type: string,
    name: string,
    options?:{label:string,value:number|string},
    validator?: StringSchema<string> | undefined,
    rules?: any
}

const props = defineProps<Props>()
const labelClass = ref<string>('text-zinc-600')
const inputClass = ref<string>('text-zinc-600')

const { value, errorMessage, validate } = useField(props.name, props.rules)

watch(errorMessage, (error) => {
    if (error) {
        labelClass.value = 'text-red-500';
        inputClass.value = 'border-red-500 bg-red-50';
    } else if (value.value) {
        labelClass.value = 'text-green-700';
        inputClass.value = 'border-green-500 bg-green-50';
    } else {
        labelClass.value = 'text-zinc-600';
        inputClass.value = 'border-zinc-300';
    }
});


const handleBlur = () => validate();
</script>

<style scoped></style>