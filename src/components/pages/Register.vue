<template>
    <FromWrapper @submit="handleSubmit">
        <h1>Regisztráció</h1>
        <FormField label="Email" type="email" name="email" :validator="string().required('köletező az email!').email('Email érvényes')" />
        <FormField label="Jelszó" type="password" name="password" :validator="string().required('köletező a jelszó!').min(8,'Minimum 8 karakter')" />
        <FormField label="Jelszó Megerősítés" type="password" name="confirmPassword" rules="confirmed:@password" :validator="string().required('köletező az megérősítés!')" />
        <SubmitButton>Küldés</SubmitButton>
    </FromWrapper>
</template>
<script setup lang="ts">
import FromWrapper from '../Forms/FromWrapper.vue';
import SubmitButton from '../Forms/SubmitButton.vue';
import FormField from '../validators/FormField.vue';
import {string} from 'yup'

const handleSubmit=(value:any)=>{
    console.log(value);
}

</script>
<style scoped>
    
</style>