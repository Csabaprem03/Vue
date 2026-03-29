<template>
    <div>
        <FromWrapper>
            <SelectField name="game_id" label="Név játék" :options="collectibleNames" :validator="yup.number().required('Választani kell egy játékot!')"/>
            <FormField placeholder="" type="text" name="type" label="Típus" :validator="yup.string().max(100,'A 100 betű karakter').required('Kötelező mező')"/>
            <UploadField type="url" label="Kép URL" name="images" :validator="imageValidator"/>
            <MapPicker name="map_location" label="Válaszd ki a lelőhelyet a térképen!" :validator="yup.array().min(2, 'Kattints a térképre a helyszín megjelöléséhez!').required()" />
        </FromWrapper>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FromWrapper from '../Forms/FromWrapper.vue';
import * as yup from 'yup';
import { useGamesStore } from '../../stores/gamesStore';
import SelectField from '../validators/SelectField.vue';
import FormField from '../validators/FormField.vue';
import UploadField from '../validators/UploadField.vue';
import MapPicker from '../validators/MapPicker.vue';

const gamesStore=useGamesStore()

const collectibleNames=computed(()=>{
    if(!gamesStore.games.length) return []
    return gamesStore.games.map(game=>({label:game.name,value:game.id}))
})

const imageValidator = yup.mixed()
    .required('Kép megadása kötelező!')
    .test('file or url', 'Érvénytelen formátum vagy túl nagy fájl', (values: any) => {
        if (!values) return true 

        if (typeof values === 'string') {
            const url = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
            return url.test(values)
        }

        if (values instanceof File) {
            const maxSize = 5 * Math.pow(1024, 2)
            const allowedTypes = ['image/webp', 'image/png', 'image/jpg'];
            return values.size <= maxSize && allowedTypes.includes(values.type)
        }
        return false
    })
</script>

<style scoped></style>