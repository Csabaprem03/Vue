<template>
  <div>
    <FromWrapper @submit="handleSubmit">
      <h1 class="text-lg mb-8 font-semibold">Videójáték-kiadó</h1>
      <FormField
        placeholder=""
        label="Cégnév"
        type="text"
        name="name"
        :validator="
          string()
            .required('A kiadó neve kötelező.')
            .max(255, 'A név maximum 255 karakter lehet.')
            .test(
              'unique',
              'Ez a kiadó név már létezik',
              (value: string | any) => {
                return !store.publishers.some(
                  (p) => p.name.toLowerCase() === value.toLowerCase(),
                );
              },
            )
        "
      />
      <FormField
        placeholder="Város, ország"
        label="Székhely"
        type="text"
        name="headquarters"
        :validator="
          string()
            .required('kötelező mező')
            .max(255, 'A név maximum 255 karakter lehet.')
        "
      />
      <div>
        <RadioField
          label="Aktív"
          name="is_active"
          :radio-value="1"
          :validator="
            number().required('Az is_active mező csak 0 vagy 1 lehet.')
          "
        />
        <RadioField
          label="Inaktív"
          name="is_active"
          :radio-value="0"
          :validator="
            number().required('Az is_active mező csak 0 vagy 1 lehet.')
          "
        />
      </div>
      <SubmitButton :loading="store.isLoading">{{
        store.isLoading ? "mentés..." : "Küldés"
      }}</SubmitButton>
    </FromWrapper>
  </div>
</template>

<script setup lang="ts">
import { string, number } from "yup";
import FromWrapper from "../Forms/FromWrapper.vue";
import SubmitButton from "../Forms/SubmitButton.vue";
import FormField from "../validators/FormField.vue";
import RadioField from "../validators/RadioField.vue";
import { usepublishersStore } from "../../stores/publisherStore";

const store = usepublishersStore();

const handleSubmit = async (values: any) => {
  const result = await store.POSTpublishers(
    values.name,
    values.headquarters,
    values.is_active,
  );
  if (result.success) {
    alert("sikeres mentés");
  } else {
    alert("sikertelen mentés");
  }
  console.log(values);
};
</script>

<style scoped></style>
