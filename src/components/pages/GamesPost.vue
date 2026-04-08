<template>
  <div>
    <FromWrapper @submit="handleSubmit" :intial-value="initialValue">
      <h1 class="text-lg mb-8 font-semibold">Játék</h1>
      <FormField
        placeholder=""
        type="text"
        label="Név"
        name="name"
        :validator="yup.string().required('Kötelező mező')"
      />
      <FormField
        placeholder=""
        type="number"
        label="Év kiadó"
        name="release_year"
        :validator="
          yup
            .number()
            .min(1970, '1970 előtti játék nem rögzíthetők')
            .max(new Date().getFullYear(), 'A jövőben adhatsz ki játékot!!!')
            .required('Kötelező mező')
        "
      />
      <SelectField
        label="Műfaj"
        name="genre"
        :validator="yup.string().required('Választani kell egy műfajt!')"
        :options="genreOptions"
      />
      <SelectField
        label="Válassz egy cégnév"
        name="publisher_id"
        :validator="yup.string().required('Választani kell egy játékot!')"
        :options="publishersName"
      />
      <CheckBoxField
        name="platforms"
        label="Platformok"
        :validator="
          yup.array().min(1, 'Legalább egy platformot ki kell választani!')
        "
        :options="Platforms"
      />
      <UploadField
        class="mt-10"
        label="Kép URL (borító)"
        name="cover"
        type="url"
        :validator="imageValidator"
      />
      <UploadField
        label="kép URL (optionális)"
        name="freetogame_url"
        type="url"
        :validator="
          yup.string().url('Hibás link formátum').notRequired().nullable()
        "
      />
      <SubmitButton :loading="gamesStore.isLoading"
        >{{ gamesStore.isLoading ? "mentés..." : "küldés" }}
      </SubmitButton>
    </FromWrapper>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useGamesStore } from "../../stores/gamesStore";
import { usepublishersStore } from "../../stores/publisherStore";
import FromWrapper from "../Forms/FromWrapper.vue";
import * as yup from "yup";
import SelectField from "../validators/SelectField.vue";
import genreOptions from "../../datas/genreOptions.json";
import FormField from "../validators/FormField.vue";
import UploadField from "../validators/UploadField.vue";
import CheckBoxField from "../validators/CheckBoxField.vue";
import Platforms from "../../datas/platforms.json";
import SubmitButton from "../Forms/SubmitButton.vue";
import { useRoute, useRouter } from "vue-router";

const gamesStore = useGamesStore();
const publishersStore = usepublishersStore();

const route = useRoute();
const router = useRouter();
const props = defineProps<{ id: number }>();

const gameId = computed(() => {
  return route.params.id ? Number(route.params.id) : null;
});
const isEditMode = computed(() => !!gameId.value);

const initialValue = ref<any>(null);

const publishersName = computed(() => {
  if (!publishersStore.publishers.length) return [];
  return publishersStore.publishers.map((pub) => ({
    label: pub.name,
    value: pub.id,
  }));
});

const imageValidator = yup
  .mixed()
  .required("Kép megadása kötelező!")
  .test(
    "file or url",
    "Érvénytelen formátum vagy túl nagy fájl",
    (values: any) => {
      if (!isEditMode.value && typeof values === "string") return true;
      if (!values) return false;

      if (typeof values === "string") {
        const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
        return urlRegex.test(values);
      }

      if (values instanceof File) {
        const maxSize = 5 * 1024 * 1024;
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        return values.size <= maxSize && allowedTypes.includes(values.type);
      }
      return false;
    },
  );

const handleSubmit = async (values: any) => {
  let result;
  if (isEditMode.value && gameId.value) {
    result = await gamesStore.PATCHgames(gameId.value, values);
  } else {
    result = await gamesStore.POSTgames(
      values.name,
      values.release_year,
      values.genre,
      values.publisher_id,
      values.platforms,
      values.cover,
      values.freetogame_url,
    );
  }
  if (result.success) {
    alert(isEditMode.value ? "sikeres frissítés!" : "sikeres mentés");
    router.push({ name: "games.list" });
  } else {
    alert("sikertelen mentés");
  }
  console.log("sikeres mentés: ", values);
};

onMounted(async () => {
  await publishersStore.GETallpublishers();
  await gamesStore.GETallgames();
  const gameToEdit = gamesStore.games.find(
    (g) => Number(g.id) === gameId.value,
  );

  if (gameToEdit) {
    initialValue.value = { ...gameToEdit };
  }

  console.log("Betöltött kiadók:", publishersStore.publishers);
  console.log("Betöltött játékok:", gamesStore.games);
});
</script>

<style scoped></style>
