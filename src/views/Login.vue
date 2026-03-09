<script setup lang="ts">

import { string } from 'yup';
import FromWrapper from '../components/Forms/FromWrapper.vue';
import FormField from '../components/validators/FormField.vue';
import SubmitButton from '../components/Forms/SubmitButton.vue';


const handleSubmit = (value: any) => {
    console.log(value);
}

</script>

<template>
    <FromWrapper @submit="handleSubmit">
        <h1>Bejelentkezve</h1>
        <FormField label="Email" type="email" name="email"
            :validator="string().required('köletező az email!').email('Email érvényes')" />
        <FormField label="Jelszó" type="password" name="password"
            :validator="string().required('köletező a jelszó!').min(8, 'Minimum 8 karakter')" />
        <SubmitButton>Küldés</SubmitButton>
    </FromWrapper>
</template>