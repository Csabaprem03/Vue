import { defineStore } from "pinia";
import type { Collectible, Game } from "../types";
import { API } from '../services/index';
import { ref } from "vue";
import type { APIResponse } from "../services/types";
import type { AxiosError } from "axios";


export const useGamesStore = defineStore('gamesStore', () => {

    const games = ref<Game[]>([])
    const collectibles = ref<Collectible[]>([])
    const isLoading=ref<boolean>(false)

    function initGames(data: Game[]) {
        games.value = data || [];
    }
    function initCollectibles(data: Collectible[]) {
        collectibles.value = data || [];
    }

    function saveToLocalStorage():void {
        const datas={
            games:games.value,
            collectibles:collectibles.value
        }
        localStorage.setItem('gamesStore',JSON.stringify(datas))
    }

    function loadFromLocalStorage():void {
        const saved=localStorage.getItem("gamesStore")

        if (saved) {
            games.value=JSON.parse(saved)
            collectibles.value=JSON.parse(saved)
        }
    }


    async function GETById(id: number): Promise<APIResponse<null>> {
        try {
            const res = await API.games.getGameById(id)
            const data = await res.data
            if (res.status == 200 && data) {
                return {
                    success: true,
                    content: null
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
            isLoading.value=true;
            const res = await API.games.getGames();
            const data = await res.data;
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
        } finally{
            isLoading.value=false
            saveToLocalStorage()
        }
        return {
            success: false,
            content: null,
            status: 400,
        }
        
    }

    async function GETCollectibleById(id: number): Promise<APIResponse<null>> {
        try {
            const res = await API.collectibles.getCollectibleById(id)
            const data = await res.data
            if (res.status == 200 && data) {
                return {
                    success: true,
                    content: null
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
            isLoading.value=true;
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
        } finally{
            isLoading.value=false
            saveToLocalStorage()
        }
        return {
            success: false,
            content: null,
            status: 400,
        }
    }
    loadFromLocalStorage()
    
    return {
        games,
        isLoading,
        collectibles,
        initCollectibles,
        initGames,
        GETCollectibleById,
        GETById,
        GETallgames,
        GETallcollectibles,

    }
})