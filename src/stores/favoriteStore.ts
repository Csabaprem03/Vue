import { defineStore } from "pinia";
import { ref } from "vue";
import { API } from "../services";
import type { Favorite } from "../types";
import { AxiosError } from "axios";
import type { APIResponse } from "../services/types";

export const useFavoriteStore = defineStore("Favorites", () => {
  const Favorites = ref<Favorite[]>([]);
  const isLoading = ref<boolean>(false);
  const isMessage = ref<string | null>(null);

  function saveToLocalStorage(): void {
    const datas = {
      games: Favorites.value,
    };
    localStorage.setItem("favoriteStore", JSON.stringify(datas));
  }

  function loadFromLocalStorage(): void {
    const saved = localStorage.getItem("favoriteStore");

    if (saved) {
      const parsed = JSON.parse(saved);
      Favorites.value = parsed.games;
    }
  }

  async function GETallFavorites() {
    try {
      isLoading.value = true;
      isMessage.value = null;
      const res = await API.favorite.getFavorites();
      let favoritesData: Favorite[] | (APIResponse<Favorite[]> & any[]) = [];

      if (res.data?.content && Array.isArray(res.data.content)) {
        favoritesData = res.data.content;
      } else if (Array.isArray(res.data)) {
        favoritesData = res.data;
      }
      Favorites.value = favoritesData;
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>;
      isMessage.value =
        _error?.response?.data.message || "Hiba a kapcsolódás során";
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    } finally {
      isLoading.value = false;
      saveToLocalStorage();
    }
  }

  // async function GETFavorite(favoriteID: number) {
  //   try {
  //     isLoading.value = true;
  //     const res = await API.favorite.getFavoritesById(favoriteID);
  //     if (res.data && Array.isArray(res.data.content)) {
  //     Favorites.value = res.data.content;
  //   } else {
  //     Favorites.value = [];
  //     isMessage.value = "Nincsenek kedvencek.";
  //   }
  //   } catch (error) {
  //     const _error = error as AxiosError<string>;
  //     return {
  //       success: false,
  //       status: _error.response?.status,
  //       content: null,
  //     };
  //   } finally {
  //     isLoading.value = false;
  //     saveToLocalStorage();
  //   }
  // }

  async function ToggleFavorite(gameId: number) {
    try {
      isLoading.value = true;
      isMessage.value = null;
      const index = Favorites.value.findIndex(
        (f) => Number(f.game_id) === gameId,
      );
      if (index !== -1) {
        await API.favorite.deleteFavorite(gameId);
        // Favorites.value.splice(index,1)
      } else {
        await API.favorite.postFavorite(gameId);
        // Favorites.value.push({ game_id: gameId, user_id: 0 })
      }
      await GETallFavorites();
    } catch (error) {
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    } finally {
      isLoading.value = false;
      saveToLocalStorage();
    }
  }
  GETallFavorites();
  loadFromLocalStorage();
  return {
    Favorites,
    isLoading,
    isMessage,
    GETallFavorites,
    saveToLocalStorage,
    ToggleFavorite,
  };
});
