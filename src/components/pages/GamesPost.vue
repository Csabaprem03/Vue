<template>
    <div>
        <FromWrapper>
            <FormField placeholder="" type="text" label="Név" name="name"
                :validator="yup.string().required('Kötelező mező')" />
            <FormField placeholder="" type="number" label="Év kiadó" name="release_year"
                :validator="yup.number().required('Kötelező mező')" />
            <SelectField label="Válassz játékot a gyűjthető tárgyhoz" name="genre"
                :validator="yup.number().required('Választani kell egy játékot!')" :options="genreOptions" />
            <SelectField label="Válassz egy játékot" name="publisher_id"
                :validator="yup.number().required('Választani kell egy játékot!')" :options="publishersName" />
                <UploadField label="Kép" name="cover" type="file" :validator="imageValidator"/>
                <UploadField label="Url" name="freetogame_url" type="url" :validator="imageValidator"/>
        </FromWrapper>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { useGamesStore } from '../../stores/gamesStore';
import { usepublishersStore } from '../../stores/publisherStore';
import FromWrapper from '../Forms/FromWrapper.vue';
import * as yup from 'yup';
import SelectField from '../validators/SelectField.vue';
import genreOptions from '../../datas/genreOptions.json'
import FormField from '../validators/FormField.vue';
import UploadField from '../validators/UploadField.vue';

const gamesStore = useGamesStore()
const authStore = useAuthStore()
const publishersStore = usepublishersStore()

const publishersName = computed(() => {
    if (!publishersStore.publishers.length) return []
    return publishersStore.publishers.map(pub => ({ label: pub.name, value: pub.id }))
})


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

const handleSubmit=async (values:any)=>{
        const result=await gamesStore.POSTgames(values.name,values.release_year,values.genre,values.publisher_id,values.cover,values.freetogame_url)
    if (result.success) {
        alert('sikeres mentés')
    } else{
        alert('sikertelen mentés')
    }
    console.log(values);
}

onMounted(async () => {
    await publishersStore.GETallpublishers()
    await gamesStore.GETallgames()
    console.log('Betöltött kiadók:', publishersStore.publishers);
    console.log('Betöltött játékok:', gamesStore.games);

})
</script>

<style scoped></style>