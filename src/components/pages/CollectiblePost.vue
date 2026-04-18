<template>
  <div>
    <FromWrapper @submit="handleSubmit" :intial-value="initialValue">
      <h1 class="text-lg mb-8 font-semibold">Gyűjthető dolog</h1>
      <SelectField
        name="game_id"
        label="Játék név"
        :options="collectibleNames"
        :validator="yup.string().required('Választani kell egy játékot!')"
      />
      <FormField
        placeholder=""
        type="text"
        name="type"
        label="Típus"
        :validator="
          yup
            .string()
            .required(
              'A kollekció típusának megadása kötelező (pl. Weapon Skin, Character Skin).',
            )
            .max(100, 'A típus maximum 100 karakter hosszú lehet.')
        "
      />
      <FormField
        placeholder="Rövid írj le!!!"
        type="text"
        name="description"
        label="Leírás"
        :validator="
          yup
            .string()
            .required('A leírás megadása kötelező.')
            .min(10, 'A leírás legalább 10 karakter hosszú kell legyen.')
            .max(500, 'A leírás maximum 500 karakter lehet.')
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
            .notRequired()
            .of(
              yup.number().typeError('A koordinátáknak számoknak kell lenniük'),
            )
            .test(
              'coords',
              'Kattints a térképre a helyszín megjelöléséhez!',
              (value: number | any) => {
                if (!value) return true;
                return value.length === 2;
              },
            )
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
  .nullable()
  .notRequired()
  .test(
    "length",
    "Az URL túl hosszú (max 500 karakter)",
    (value: string | any) => {
      if (typeof value === "string") return value.length <= 500;
      return true;
    },
  )
  .test("url", "Minden képnek érvényes URL-nek kell lennie.", (values: any) => {
    if (!isEditMode.value && typeof values === "string") return true;
    if (!values || values === "") return true;

    if (typeof values === "string") {
      const urlRegex =
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|avif|heic|heif))$/i;
      return urlRegex.test(values);
    }

    if (values instanceof File) {
      const maxSize = 5 * 1024 * 1024;
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/avif",
        "image/heic",
        "image/heif",
      ];
      return values.size <= maxSize && allowedTypes.includes(values.type);
    }
    return false;
  });

const handleSubmit = async (values: any) => {
  let result;
  const formattedImages = Array.isArray(values.images)
    ? values.images
    : [values.images];
  const formattedLocation =
    values.map_location && values.map_location.length >= 2
      ? values.map_location.map((val: any) => Number(val))
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
  } else if (route.query.gameId) {
    initialValue.value = {
      game_id: Number(route.query.gameId),
      type: route.query.type || "",
      description: route.query.description || "",
      images: [],
      map_location: null,
    };
  }

  console.log("Betöltött játékok:", gamesStore.collectibles);
});
</script>

<style scoped></style>
