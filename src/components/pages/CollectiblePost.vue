<template>
  <div>
    <FromWrapper @submit="handleSubmit" :intial-value="initialValue">
      <h1 class="text-lg mb-8 font-semibold">Gyűjthető dolog</h1>
      <SelectField
        name="game_id"
        label="Név játék"
        :options="collectibleNames"
        :validator="yup.string().required('Választani kell egy játékot!')"
      />
      <FormField
        placeholder=""
        type="text"
        name="type"
        label="Típus"
        :validator="
          yup.string().max(100, 'A 100 betű karakter').required('Kötelező mező')
        "
      />
      <FormField
        placeholder="Rövid írj le!!!"
        type="text"
        name="description"
        label="Leírás"
        :validator="
          yup.string().max(100, 'A 100 betű karakter').required('Kötelező mező')
        "
      />
      <UploadField
        type="url"
        label="Kép URL"
        name="images"
        :validator="imageValidator"
      />
      <MapPicker
        name="map_location"
        label="Válaszd ki a lelőhelyet a térképen!"
        :validator="
          yup
            .array()
            .nullable()
            .min(2, 'Kattints a térképre a helyszín megjelöléséhez!')
            .notRequired()
        "
      />
      <SubmitButton :loading="gamesStore.isLoading">{{
        gamesStore.isLoading ? "mentés..." : "Küldés"
      }}</SubmitButton>
    </FromWrapper>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import FromWrapper from "../Forms/FromWrapper.vue";
import * as yup from "yup";
import { useGamesStore } from "../../stores/gamesStore";
import SelectField from "../validators/SelectField.vue";
import FormField from "../validators/FormField.vue";
import UploadField from "../validators/UploadField.vue";
import MapPicker from "../validators/MapPicker.vue";
import { useRoute, useRouter } from "vue-router";
import SubmitButton from "../Forms/SubmitButton.vue";

const router = useRouter();
const route = useRoute();
const gamesStore = useGamesStore();

const collectibleId = computed(() => {
  return route.params.id ? Number(route.params.id) : null;
});
const isEditMode = computed(() => !!collectibleId.value);

const initialValue = ref<any>(null);

const collectibleNames = computed(() => {
  if (!gamesStore.games.length) return [];
  return gamesStore.games.map((game) => ({ label: game.name, value: game.id }));
});

const imageValidator = yup
  .mixed()
  .required("Kép megadása kötelező!")
  .test(
    "file or url",
    "Érvénytelen formátum vagy túl nagy fájl",
    (values: any) => {
      if (!values) return true;

      if (typeof values === "string") {
        const url = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
        return url.test(values);
      }

      if (values instanceof File) {
        const maxSize = 5 * Math.pow(1024, 2);
        const allowedTypes = ["image/webp", "image/png", "image/jpg"];
        return values.size <= maxSize && allowedTypes.includes(values.type);
      }
      return false;
    },
  );

const handleSubmit = async (values: any) => {
  let result;
  const formattedImages = Array.isArray(values.images)
    ? values.images
    : [values.images];
  const formattedLocation =
    values.map_location && values.map_location.length >= 2
      ? values.map_location
      : null;

  if (isEditMode.value && collectibleId.value) {
    result = await gamesStore.PATCHcollectible(collectibleId.value, {
      ...values,
      formattedImages,
      formattedLocation,
    });
  } else {
    result = await gamesStore.POSTCollectibles(
      values.game_id,
      values.type,
      values.description,
      formattedImages,
      formattedLocation,
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
  await gamesStore.GETallcollectibles();
  const collectibleToEdit = gamesStore.collectibles.find(
    (g) => Number(g.id) === collectibleId.value,
  );

  if (collectibleToEdit) {
    initialValue.value = { ...collectibleToEdit };
  }

  console.log("Betöltött játékok:", gamesStore.collectibles);
});
</script>

<style scoped></style>
