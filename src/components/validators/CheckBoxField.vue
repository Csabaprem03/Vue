<template>
    <div>
        <ul  :name="props.name"  >
            <li v-for="item in sortedOptions" :key="item.value">
                <input @blur="handleBlur" :id="item.label" type="checkbox" v-model="value" :value="item.value" />
                <label :for="item.label">{{ item.label }}</label>
        </li>
        </ul>
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
}


const props = defineProps<Props>()
const labelClass = ref<string>('text-zinc-600')
const inputClass = ref<string>('text-zinc-600')

const { value, errorMessage, validate } = useField<Array<string>>(props.name, props.validator,{initialValue:[]})

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