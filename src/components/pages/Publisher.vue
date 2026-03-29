<template>
    <div>
        <FromWrapper @submit="handleSubmit">
            <FormField placeholder="" label="Cégnév" type="text" name="name" :validator="string().required('kötelező mező')"/>
            <FormField placeholder="Város, ország" label="Székhely" type="text" name="headquarters" :validator="string().required('kötelező mező')"/>
            <div>
                <RadioField label="Aktív" name="is_active" :radio-value="1" :validator="boolean().required('Válassz státuszt')"/>
                <RadioField label="Inaktív" name="is_active" :radio-value="0" :validator="boolean().required('Válassz státuszt')"/>
            </div>
            <SubmitButton :loading="store.isLoading">{{ store.isLoading ?'Bejelentkezés...' : 'Küldés' }}</SubmitButton>
        </FromWrapper>
    </div>
</template>

<script setup lang="ts">
import { boolean, string } from 'yup';
import FromWrapper from '../Forms/FromWrapper.vue';
import SubmitButton from '../Forms/SubmitButton.vue';
import FormField from '../validators/FormField.vue';
import RadioField from '../validators/RadioField.vue';
import { usepublishersStore } from '../../stores/publisherStore';

const store=usepublishersStore()

const handleSubmit=async(values:any)=>{
    const result=await store.POSTpublishers(values.name,values.headquarters,values.is_active)
    if (result.success) {
        alert('sikeres mentés')
    } else{
        alert('sikertelen mentés')
    }
    console.log(values);
    
}
</script>

<style scoped>

</style>