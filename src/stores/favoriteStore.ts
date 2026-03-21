import { defineStore } from "pinia";
import { ref } from "vue";
import { API } from "../services";
import type { Favorite } from "../types";
import { AxiosError } from "axios";


export const useFavoriteStore = defineStore('Favorites', () => {

    const Favorites = ref<Favorite[]>([])
    const isLoading = ref<boolean>(false)
    const isMessage=ref<string | null>(null)



    async function GETallFavorites() {
        try {
            isLoading.value = true;
            isMessage.value=null;
            const res = await API.favorite.getFavorites();
            if (Array.isArray(res.data)) {
                Favorites.value = res.data;
            }else{
                Favorites.value=[]
                isMessage.value=res.data.message || 'Ismeretlen hiba'
            }
        } catch (error) {

            const _error = error as AxiosError<{message:string}>;
            isMessage.value=_error?.response?.data.message || "Hiba a kapcsolódás során";
            return {
                success: false,
                status: _error.response?.status,
                content: null,
            };
        } finally {
            isLoading.value = false
        }
    }


    async function GETFavorite(favoriteID: number) {
        try {
            isLoading.value = true;
            const res = await API.favorite.getFavoritesById(favoriteID);
            Favorites.value = res.data;
        } catch (error) {
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: null,
            };
        } finally {
            isLoading.value = false
        }
    }

    async function ToggleFavorite(gameId: number) {
        try {
            isLoading.value = true;
            const index = Favorites.value.findIndex((f) => Number(f.game_id) === gameId)
            if (index !==-1) {
                await API.favorite.deleteFavorite(gameId)
                Favorites.value.splice(index,1)
            } else {
                await API.favorite.postFavorite(gameId);
                Favorites.value.push({ game_id: gameId, user_id: 0 })
            }
            await GETallFavorites()
        } catch (error) {
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: null,
            };
        } finally {
            isLoading.value = false
        }
    }


    return {
        Favorites,
        isLoading,
        isMessage,
        GETallFavorites,
        GETFavorite,
        ToggleFavorite,
    }
})