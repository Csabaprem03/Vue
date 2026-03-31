<template>
  <FromWrapper @submit="handleSubmit">
    <h1>Regisztráció</h1>
    <FormField
      label="Név"
      type="text"
      name="name"
      :validator="
        string().required('köletező a név').min(3, 'Minimum 3 karakter')
      "
    />
    <FormField
      label="Email"
      type="email"
      name="email"
      :validator="
        string().required('köletező az email!').email('Email érvényes')
      "
    />
    <FormField
      label="Jelszó"
      type="password"
      name="password"
      :validator="
        string().required('köletező a jelszó!').min(8, 'Minimum 8 karakter')
      "
    />
    <!-- <FormField label="Jelszó Megerősítés" type="password" name="confirmPassword" rules="confirmed:@password"
            :validator="string().required('köletező az megérősítés!')" /> -->
    <SubmitButton>Küldés</SubmitButton>
  </FromWrapper>
</template>
<script setup lang="ts">
import FromWrapper from "../components/Forms/FromWrapper.vue";
import { string } from "yup";
import FormField from "../components/validators/FormField.vue";
import SubmitButton from "../components/Forms/SubmitButton.vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const route = useRouter();

const handleSubmit = async (values: any) => {
  const register = {
    name: values.name,
    email: values.email,
    password: values.password,
  };

  const result = await authStore.Registration(register);

  if (result.success) {
    alert("Sikeres regisztráció!");
    route.push("/user/login");
  } else {
    alert(
      "Hiba történt a regisztráció során. Lehet, hogy már létezik ez a felhasználó?",
    );
  }
  console.log(values);
};
</script>
<style scoped></style>
