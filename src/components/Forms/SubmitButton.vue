<template>
    <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">

        <span v-if="isSubmitting">
            betöltés...
        </span>
        <span v-else>

            <slot/>
        </span>
    </button>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';

const {isSubmitting} =useForm() 
</script>