<template>
    <div>
        <select  :name="props.name"  @blur="handleBlur" v-model="value">
            <option value="" disabled>Válassz egy videójátékot...</option>
            <option v-for="item in sortedOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed, ref,  watch, } from 'vue';

interface Option{
    value:number,
    label:string
}

interface Props {
    label: string,

    name: string,
    options:Array<Option>,
    validator:any,
    rules?: any
}

const props = defineProps<Props>()
const labelClass = ref<string>('text-zinc-600')
const inputClass = ref<string>('text-zinc-600')

const { value, errorMessage, validate } = useField(props.name, props.validator,{initialValue:""})

const sortedOptions=computed(()=>{
    return [...props.options].sort((a,b)=>a.label.localeCompare(b.label))
})

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