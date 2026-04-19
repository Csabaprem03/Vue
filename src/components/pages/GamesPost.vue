<template>
  <div>
    <FromWrapper @submit="handleSubmit" :intial-value="initialValue">
      <h1 class="text-lg mb-8 font-semibold">Játék</h1>
      <FormField
        placeholder=""
        type="text"
        label="Név"
        name="name"
        :validator="nameValidator"
      />
      <FormField
        placeholder=""
        type="number"
        label="Év kiadó"
        name="release_year"
        :validator="
          isEditMode
            ? yup.number().nullable().notRequired()
            : yup
                .number()
                .required('A megjelenési év megadása kötelező.')
                .min(1970, 'Csak 1970 utáni játékokat rögzíthetsz.')
                .max(2030, 'A megjelenési év nem lehet 2030-nál későbbi.')
        "
      />
      <SelectField
        label="Műfaj"
        name="genre"
        :validator="
          isEditMode
            ? yup.string().nullable()
            : yup.string().required('Választani kell egy műfajt!')
        "
        :options="genreOptions"
      />
      <SelectField
        label="Válassz egy cégnév"
        name="publisher_id"
        :validator="
          isEditMode
            ? yup.string().nullable()
            : yup.string().required('Választani kell egy játékot!')
        "
        :options="publishersName"
      />
      <CheckBoxField
        name="platforms"
        label="Platformok"
        :validator="
          isEditMode
            ? yup.array().nullable().notRequired()
            : yup
                .array()
                .required('Legalább egy platformot meg kell adnod.')
                .min(1, 'Legalább egy platformot válassz ki.')
        "
        :options="Platforms"
      />
      <UploadField
        class="mt-10"
        label="Kép URL (borító)"
        name="cover"
        type="url"
        :validator="isEditMode ? yup.string().url().nullable() : imageValidator"
      />
      <UploadField
        label="kép URL (optionális)"
        name="freetogame_url"
        type="url"
        :validator="
          yup
            .string()
            .url('A FreeToGame linknek érvényes URL-nek kell lennie.')
            .notRequired()
            .nullable()
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

const nameValidator = computed(() => {
  let schema = yup.string().max(255, "A név maximum 255 karakter lehet.");

  if (!isEditMode.value) {
    schema = schema.required("A játék nevének megadása kötelező.");
  }

  return schema.test("unique", "Ez a játék már szerepel", (value) => {
    if (!value) return true;
    const duplicate = gamesStore.games.find(
      (g) => g.name.toLowerCase() === value.toLowerCase(),
    );
    if (!duplicate) return true;
    return isEditMode.value && duplicate.id === gameId.value;
  });
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
    (values: any) => {
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
