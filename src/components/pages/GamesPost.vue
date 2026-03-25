<template>
    <div>
        <FromWrapper>
            <SelectField label="Melyik játékodhoz van a gyűjthető?" name="publisher_id" :options="gamesWithCompanyNames.map(game=>({label:game.display_name,value:game.id}))" />
            <SelectField label="Válassz játékot a gyűjthető tárgyhoz" name="game_id"
                :validator="yup.number().required('Választani kell egy játékot!')" :options="genreOptions" />
        </FromWrapper>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { useGamesStore } from '../../stores/gamesStore';
import { usepublishersStore } from '../../stores/publisherStore';
import FromWrapper from '../Forms/FromWrapper.vue';
import * as yup from 'yup';
import SelectField from '../validators/SelectField.vue';
import genreOptions from '../../datas/genreOptions.json'

const gamesStore = useGamesStore()
const authStore = useAuthStore()
const publishersStore = usepublishersStore()


const gamesWithCompanyNames = computed(() => {
    return gamesStore.games.map(game => {
        if (!gamesStore.games.length || !publishersStore.publishers.length) return [];
        const company = publishersStore.publishers.find(p => Number(p.id) === Number(game.publisher_id));
        return {
            ...game,
            company_name: company ? company.name : 'Ismeretlen cég'
        };
    });
});



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