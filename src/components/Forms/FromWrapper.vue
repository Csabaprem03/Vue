<template>
    <form class="flex flex-col items-center justify-center my-10 " @submit.prevent="onSubmit">
        <div class="border border-b border-neutral-400 p-5 rounded-3xl shadow-2xl ">
            <slot />
        </div>
    </form>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { watch, watchEffect } from 'vue';

const props=defineProps<{intialValue?:any}>()

const emit = defineEmits<{
    (e: 'submit', value: any): void
}>()

const { handleSubmit,setValues } = useForm({initialValues:props.intialValue})

watch(()=>props.intialValue,(newValues)=>{
    if (newValues) {
        setValues(newValues)
    }
})

const onSubmit = handleSubmit(
    (values) => {
        console.log("Küldés indul...", values);
        emit('submit', values);
    },
    ({ errors }) => {
        console.error("hiba:", errors);
        alert("Hibás kitöltés!");
    }
)
</script>