import { defineStore } from "pinia";
import { ref } from "vue";
import { API } from "../services";
import type { LoginCredentials, RegisterData, User } from "../types";
import { AxiosError } from "axios";
import type { APIResponse } from "../services/types";
import { useFavoriteStore } from "./favoriteStore";


export const useAuthStore = defineStore('Authentication', () => {

    const user = ref<User | null>(null)
    const token = ref<string | null>(localStorage.getItem('accessToken'))
    const isLoading = ref<boolean>(false)

    async function Registration(register: RegisterData): Promise<APIResponse<any>> {
        try {
            const res = await API.auth.Register(register)
            const data = res.data
            if ((res.status === 200 || res.status === 201) && data) {
                return {
                    success: true,
                    content: null,
                }
            }
            if (data && data.token) {
                token.value = data.token;
                user.value = data.user;
                localStorage.setItem('accessToken', data.token);
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
            isLoading.value = false
        }



    }

    async function Login(credentails: LoginCredentials): Promise<APIResponse<any>> {
        try {
            isLoading.value = true;
            const FavStore=useFavoriteStore()
            const res = await API.auth.Login(credentails);
            const data = res.data;
            if ((res.status === 200 || res.status === 201) && data) {
                token.value = data.token
                user.value = data.user
                localStorage.setItem('accessToken', data.token)
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
            isLoading.value = false
        }
        return {
            success: false,
            content: null,
            status: 400,
        }

    }

    async function logout() {
        try {
            await API.auth.Logout()
        } finally {
            const FavStore=useFavoriteStore()
            token.value = null
            user.value = null
            FavStore.Favorites=[]
            localStorage.removeItem('accessToken')
        }
    }



    return {
        user,
        token,
        isLoading,
        Login,
        logout,
        Registration,
    }
})