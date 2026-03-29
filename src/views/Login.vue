<script setup lang="ts">

import { string } from 'yup';
import FromWrapper from '../components/Forms/FromWrapper.vue';
import FormField from '../components/validators/FormField.vue';
import SubmitButton from '../components/Forms/SubmitButton.vue';
import { useAuthStore } from '../stores/authStore';
import { useSettingStore } from '../stores/settingsStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const route = useRouter()

const handleSubmit = async (values: any) => {

    const login = {
        email: values.email,
        password: values.password,
    }

    const result = await authStore.Login(login)

    if (result.success) {
        // settingStore.toggleUserAccount()
        route.push('/games')
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
        <FormField placeholder="" label="Email" type="email" name="email"
            :validator="string().required('köletező az email!').email('Email érvényes')"  />
        <FormField placeholder="..." label="Jelszó" type="password" name="password"
            :validator="string().required('köletező a jelszó!').min(8, 'Minimum 8 karakter')" />
        <SubmitButton :loading="authStore.isLoading">{{ authStore.isLoading ? 'Bejelentkezés...' : 'Küldés' }}
        </SubmitButton>
    </FromWrapper>
</template>