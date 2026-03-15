<script setup lang="ts">

import { string } from 'yup';
import FromWrapper from '../components/Forms/FromWrapper.vue';
import FormField from '../components/validators/FormField.vue';
import SubmitButton from '../components/Forms/SubmitButton.vue';
import { useAuthStore } from '../stores/authStore';
import { useSettingStore } from '../stores/settingsStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const settingStore = useSettingStore()
const route = useRouter()

const handleSubmit = async (values: any) => {

    const login = {
        name: values.name,
        password: values.password,
    }

    const result = await authStore.Login(login)

    if (result.success) {
        settingStore.toggleUserAccount()
        route.push('/')
    }
    else {
        alert('Hibás felhasználónév vagy jelszó!')
    }

    console.log(values);
}
</script>

<template>
    <FromWrapper @submit="handleSubmit">
        <h1>Bejelentkezés</h1>
        <FormField label="Név" type="text" name="name"
            :validator="string().required('köletező a név').min(3, 'Minimum 3 karakter')" />
        <FormField label="Jelszó" type="password" name="password"
            :validator="string().required('köletező a jelszó!').min(8, 'Minimum 8 karakter')" />
        <SubmitButton :disabled="authStore.isLoading">{{ authStore.isLoading ? 'Bejelentkezés...' : 'Küldés' }}
        </SubmitButton>
    </FromWrapper>
</template>