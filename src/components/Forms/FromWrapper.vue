<template>
    <form class="flex flex-col items-center justify-center my-10 " @submit.prevent="onSubmit">
        <div class="border border-b border-neutral-400 p-5 rounded-3xl shadow-2xl ">
            <slot />
        </div>
    </form>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';

const emit = defineEmits<{
    (e: 'submit', value: any): void
}>()

const { handleSubmit } = useForm()
const onSubmit = handleSubmit(
    (values) => {
        console.log("VALID: Küldés indul...", values);
        emit('submit', values);
    },
    ({ errors }) => {
        console.error("INVALID FORM! Ezek a hibák:", errors);
        alert("Nézd meg a piros mezőket, valami hiányzik!");
    }
)
</script>