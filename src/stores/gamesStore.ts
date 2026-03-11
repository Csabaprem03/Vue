import { defineStore } from "pinia";
import type { Collectible, Game } from "../types";
import { API } from '../services/index';
import { computed, ref } from "vue";
import type { APIResponse } from "../services/types";
import type { AxiosError } from "axios";
import { slugify } from "./slugfiy";

export const useGamesStore = defineStore('gamesStore', () => {

    const games = ref<Game[]>([])
    const collectibles = ref<Collectible[]>([])

    

    function initGames(data: Game[]) {
        games.value = data || [];
    }

    function initCollectibles(data: Collectible[]) {
        collectibles.value = data || [];
    }


    async function GETById(id: number): Promise<APIResponse<null>> {
        try {
            const res = await API.games.getGameById(id)
            const data = await res.data
            if (res.status == 400 && data) {
                return {
                    success: true,
                    content: null
                };
            } else if (res.status == 404 && data) {
                return {
                    success: false,
                    content: null,
                };
            }
            initGames(data)
        } catch (error) {
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: null,
            };
        }
        return {
            success: false,
            content: null,
            status: 400,
        }
    }

    async function GETallgames(): Promise<APIResponse<null>> {
        try {
            const res = await API.games.getGames();
            const data = await res.data.data;
            if (res.status === 200 && data) {
                initGames(data)
                return {
                    success: true,
                    content: null,
                };
            }
        } catch (error) {
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: null,
            };
        }
        return {
            success: false,
            content: null,
            status: 400,
        }
    }

    async function GETColById(id: number): Promise<APIResponse<null>> {
        try {
            const res = await API.collectibles.getCollectibleById(id)
            const data = await res.data
            if (res.status == 400 && data) {
                return {
                    success: true,
                    content: null
                };
            } else if (res.status == 404 && data) {
                return {
                    success: false,
                    content: null,
                };
            }
        } catch (error) {
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: null,
            };
        }
        return {
            success: false,
            content: null,
            status: 400,
        }
    }

    async function GETallcollectibles(): Promise<APIResponse<null>> {
        try {
            const res = await API.collectibles.getColectibles();
            const data = await res.data;
            if (res.status === 200 && data) {
                initCollectibles(data)
                return {
                    success: true,
                    content: null,
                };
            }
        } catch (error) {
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: null,
            };
        }
        return {
            success: false,
            content: null,
            status: 400,
        }
    }

    return {
        games,
        collectibles,
        initCollectibles,
        initGames,
        GETallgames,
        GETallcollectibles,
        GETById,
        GETColById,
        
    }
})