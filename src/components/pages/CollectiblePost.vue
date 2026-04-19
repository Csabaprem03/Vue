<template>
  <div>
    <FromWrapper @submit="handleSubmit" :intial-value="initialValue">
      <h1 class="text-lg mb-8 font-semibold">Gyűjthető dolog</h1>
      <SelectField
        name="game_id"
        label="Játék név"
        :options="collectibleNames"
        :validator="
          isEditMode
            ? yup.string().nullable()
            : yup.string().required('Választani kell egy játékot!')
        "
      />
      <FormField
        placeholder=""
        type="text"
        name="type"
        label="Típus"
        :validator="
          isEditMode
            ? yup.string().nullable()
            : yup
                .string()
                .required('A kollekció típusának megadása kötelező')
                .max(100, 'A típus maximum 100 karakter hosszú lehet.')
        "
      />
      <FormField
        placeholder="Rövid írj le!!!"
        type="text"
        name="description"
        label="Leírás"
        :validator="
          isEditMode
            ? yup.string().nullable()
            : yup
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
          isEditMode
            ? yup.array().nullable()
            : yup
                .array()
                .nullable()
                .notRequired()
                .of(
                  yup
                    .number()
                    .typeError('A koordinátáknak számoknak kell lenniük'),
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
  .test(
    "url",
    "A borítóképnek érvényes URL-nek kell lennie.",
    (values: string | any) => {
      if (
        !values ||
        values === "" ||
        (Array.isArray(values) && values.length === 0)
      )
        return true;

      if (typeof values === "string") {
        const urlRegex =
          /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|avif|heic|heif))/i;
        return urlRegex.test(values.split(",")[0].trim());
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
      return true;
    },
  );

const handleSubmit = async (values: any) => {
  let result;
  let formattedImages: Array<string> = [];

  if (values.images) {
    if (Array.isArray(values.images)) {
      formattedImages = values.images.filter(
        (img: string) => img && String(img).trim() !== "",
      );
    } else if (
      typeof values.images === "string" &&
      values.images.trim() !== ""
    ) {
      formattedImages = values.images
        .split(",")
        .map((img: string) => img.trim())
        .filter((img: string) => img !== "");
    }
  }

  const formattedLocation =
    values.map_location && values.map_location.length >= 2
      ? values.map_location.map((val: number) => Number(val))
      : null;

  const payload = {
    game_id: Number(values.game_id),
    type: values.type,
    description: values.description,
    images: formattedImages,
    map_location: formattedLocation,
  };

  if (isEditMode.value && collectibleId.value) {
    result = await gamesStore.PATCHcollectible(collectibleId.value, payload);
  } else {
    result = await gamesStore.POSTCollectibles(
      payload.game_id,
      payload.type,
      payload.description,
      payload.images,
      payload.map_location,
    );
  }

  if (result.success) {
    alert(isEditMode.value ? "Sikeres frissítés!" : "Sikeres mentés!");
    router.push({ name: "games.list" });
  } else {
    alert("Sikertelen mentés!");
  }
};

onMounted(async () => {
  await gamesStore.GETallcollectibles();
  const collectibleToEdit = gamesStore.collectibles.find(
    (g) => Number(g.id) === collectibleId.value,
  );

  if (collectibleToEdit) {
    initialValue.value = {
      ...collectibleToEdit,
      images:
        typeof collectibleToEdit.images === "string"
          ? [collectibleToEdit.images]
          : collectibleToEdit.images || [],
    };
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
