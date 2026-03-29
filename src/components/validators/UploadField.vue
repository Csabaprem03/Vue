<template>
    <div>
        <label :class="labelClass">{{ props.label }}</label>
        <input @blur="handleBlur" @change="handleChange" :type="props.type" :name="props.name" :class="inputClass"/>
        <span v-if="errorMessage">{{ errorMessage }}</span>
    </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { ref,  watch, } from 'vue';
import type { StringSchema } from 'yup';

interface Props {
    label: string,
    type: 'file' | 'url'|'text',
    name: string,
    validator?: any,

}

const props = defineProps<Props>()
const labelClass = ref<string>('text-zinc-600')
const inputClass = ref<string>('text-zinc-600')

const { value, errorMessage,handleChange: vhandleChange, validate } = useField(props.name, props.validator)

watch(errorMessage, (error) => {
    if (error) {
        labelClass.value = 'text-green-700'
        inputClass.value = 'border-green-500'
    } else {
        labelClass.value = 'text-red-500'
        inputClass.value = 'border-red-500'
    }
})

async function handleChange(e:Event) {
    const target=e.target as HTMLInputElement
    if (target.files && props.type==='file') {
        vhandleChange(target.files[0])
    } else{
        vhandleChange(target.value)
    }
}


const handleBlur = () => validate();
</script>

<style scoped></style>