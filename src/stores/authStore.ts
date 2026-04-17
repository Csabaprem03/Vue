import { defineStore } from "pinia";
import { ref } from "vue";
import { API } from "../services";
import type { LoginCredentials, RegisterData, User, UserName } from "../types";
import { AxiosError } from "axios";
import type { APIResponse } from "../services/types";
import { useFavoriteStore } from "./favoriteStore";

export const useAuthStore = defineStore("Authentication", () => {
  const user = ref<User | null>(null);
  const userName = ref<string>(localStorage.getItem("userName") || "");
  const userEmail = ref<string>(localStorage.getItem("userEmail") || "");
  const token = ref<string | null>(localStorage.getItem("accessToken"));
  const isLoading = ref<boolean>(false);

  async function Registration(
    register: RegisterData,
  ): Promise<APIResponse<null>> {
    try {
      const res = await API.auth.Register(register);
      const data = res.data as unknown as UserName;
      if ((res.status === 200 || res.status === 201) && data) {
        return {
          success: true,
          content: null,
        };
      }
      if (data && data.token) {
        token.value = data.token;
        userName.value = data.user.name;
        userEmail.value = data.user.email;
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
      }
      return { success: false, content: null, status: res.status };
    } catch (error) {
      const _error = error as AxiosError;
      return {
        success: false,
        content: null,
        status: _error.response?.status,
      };
    } finally {
      isLoading.value = false;
    }
  }

  async function Login(
    credentails: LoginCredentials,
  ): Promise<APIResponse<null>> {
    try {
      isLoading.value = true;
      const res = await API.auth.Login(credentails);
      const data = res.data as unknown as UserName;
      if ((res.status === 200 || res.status === 201) && data) {
        token.value = data.token;
        userName.value = data.user.name;
        userEmail.value = data.user.email;
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      const _error = error as AxiosError;
      return {
        success: false,
        content: null,
        status: _error.response?.status,
      };
    } finally {
      isLoading.value = false;
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function logout() {
    try {
      await API.auth.Logout();
    } finally {
      const FavStore = useFavoriteStore();
      token.value = null;
      user.value = null;
      FavStore.Favorites = [];
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
    }
  }

  return {
    user,
    userName,
    userEmail,
    token,
    isLoading,
    Login,
    logout,
    Registration,
  };
});
