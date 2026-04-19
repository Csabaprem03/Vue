<script setup lang="ts">
// a yup sémák importálása
import { string } from "yup";
import FromWrapper from "../components/Forms/FromWrapper.vue";
import FormField from "../components/validators/FormField.vue";
import SubmitButton from "../components/Forms/SubmitButton.vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const route = useRouter();

const handleSubmit = async (values: any) => {
  const login = {
    email: values.email,
    password: values.password,
  };

  const result = await authStore.Login(login);

  if (result.success) {
    // settingStore.toggleUserAccount()

    route.push("/games");
  } else {
    alert("Hibás felhasználónév vagy jelszó!");
  }

  console.log(values);
};
</script>

<template>
  <!-- FromWrapper.vue komponenshez és slot-hoz, az űrlappal, saját függvénnyel -->
  <FromWrapper @submit="handleSubmit">
    <h1 class="text-lg mb-8 font-semibold">Bejelentkezés</h1>
    <!-- FromWrapper komponenshez és propokhoz, kötelező validáció és hibaüzentek  -->
    <FormField
      placeholder=""
      label="Email"
      type="email"
      name="email"
      :validator="
        string()
          .required('köletező az email!')
          .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Érvénytelen email formátum (pl. pelda@domain.hu)',
          )
          .email('Email érvényes')
      "
    />
    <FormField
      placeholder="..."
      label="Jelszó"
      type="password"
      name="password"
      :validator="
        string()
          .trim()
          .required('köletező a jelszó!')
          .min(8, 'Minimum 8 karakter')
      "
    />
    <!-- SubmitButton.vue komponenshez és slot-hoz kapcsolja -->
    <SubmitButton :loading="authStore.isLoading"
      >{{ authStore.isLoading ? "Bejelentkezés..." : "Küldés" }}
    </SubmitButton>
  </FromWrapper>
</template>
