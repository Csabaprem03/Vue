<template>
    <div>
        <label :class="labelClass">{{ props.label }}</label>
        <input @blur="handleBlur" :type="props.type" :class="inputClass" :name="props.name"
            class="outline-none border rounded-md block w-[400px] h-[45px] text-sm text-zinc-600 pl-4" v-model="value">
    </div>
    <div class="text-red-500 text-sm mt-1">
        {{ errorMessage }}
    </div>
</template>
<script setup lang="ts">
import { defineRule, useField } from 'vee-validate';
import { ref, toRef } from 'vue';
import { StringSchema } from 'yup';

interface Props {
    label: string,
    type: 'text' | 'email' | 'password',
    name: string,
    validator?: StringSchema<string> | undefined,
    validateOnChange?: boolean,
    rules?: string
}

defineRule('confirmed', (value:any, [target]:any) => {
    if (!value) {
        return 'köletező mező'
    }
    if (value === target) {
        return true
    }
    return 'A jelszavak nem egyeznek'
})

const props = withDefaults(defineProps<Props>(), {
    validator: undefined,
    validateOnChange: false

})

const labelClass = ref<string>('text-zinc-600')
const inputClass = ref<string>('text-zinc-600')

const validateOnChange = toRef(props, 'validateOnChange')

const { value, errorMessage, validate } = useField(props.name, props.rules ?? props.validator, {
    validateOnValueUpdate: props.validateOnChange
})

async function handleBlur() {
    if (!validateOnChange.value) {
        const { valid } = await validate()
        if (valid) {
            labelClass.value = 'text-green-700'
            inputClass.value = 'border-green-500'
        } else {
            labelClass.value = 'text-red-500'
            inputClass.value = 'border-red-500'
        }
    }
}
</script>
<style scoped></style>