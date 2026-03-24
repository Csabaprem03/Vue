<template>
    <div>
        <FromWrapper>


        </FromWrapper>
    </div>
</template>

<script setup lang="ts">
import FromWrapper from '../Forms/FromWrapper.vue';
import yup from 'yup';

const imageValidator = yup.mixed()
    .required('Kép megadása kötelező!')
    .test('file or url', 'Érvénytelen formátum vagy túl nagy fájl', (values: any) => {
        if (!values) return

        if (typeof values === 'string') {
            const url = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
            return url.test(values)
        }

        if (values instanceof File) {
            const maxSize = 2 * Math.pow(1024, 2)
            const allowedTypes = ['image/webp', 'image/png', 'image/jpg'];
            return values.size <= maxSize && allowedTypes.includes(values.type)
        }
    })

</script>

<style scoped></style>