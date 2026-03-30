import { defineStore } from "pinia";
import type { Collectible, Game } from "../types";
import { API } from '../services/index';
import { ref } from "vue";
import type { APIResponse } from "../services/types";
import type { AxiosError } from "axios";


export const useGamesStore = defineStore('gamesStore', () => {

    const games = ref<Game[]>([])
    const collectibles = ref<Collectible[]>([])
    const isLoading = ref<boolean>(false)

    function initGames(data: Game[]) {
        games.value = data || [];
    }
    function initCollectibles(data: Collectible[]) {
        collectibles.value = data || [];
    }

    function saveToLocalStorage(): void {
        const datas = {
            games: games.value,
            collectibles: collectibles.value
        }
        localStorage.setItem('gamesStore', JSON.stringify(datas))
    }

    function loadFromLocalStorage(): void {
        const saved = localStorage.getItem("gamesStore")

        if (saved) {
            const parsed = JSON.parse(saved)
            games.value = parsed.games
            collectibles.value = parsed.collectibles
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
            isLoading.value = true;
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
        } finally {
            isLoading.value = false
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

    async function POSTgames(name: string, release_year: number, genre: string, publisher_id: number, platforms: Array<string>, cover: string | File, freetogame_url: string | null): Promise<APIResponse<null>> {
        const addItem: Omit<Game, 'id'> = {
            name,
            release_year,
            genre,
            publisher_id,
            platforms,
            cover: typeof cover === 'string' ? cover : null,
            freetogame_url: freetogame_url || null,
            created_at: new Date(),
            updated_at: new Date(),
        }
        try {
            isLoading.value = true;
            const res = await API.games.postGame(addItem);
            if ((res.status === 200 || res.status === 201)) {
                if (res.data.content && !Array.isArray(res.data.content)) {
                    games.value.push(res.data.content)
                }
                await GETallgames()
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
        } finally {
            isLoading.value = false
            saveToLocalStorage()
        }
        return {
            success: false,
            content: null,
            status: 400,
        }

    }

    async function PATCHgames(id: number, updates: Partial<Game>): Promise<APIResponse<null>> {
        const item = games.value.find(item => Number(item.id) === id)
        if (!item) return { success: false, status: 404, content: null }

        const originalItem = { ...item }

        Object.assign(item, updates)

        try {
            isLoading.value = true;
            const res = await API.games.patchGame(id, updates);
            if ((res.status === 200 || res.status === 201)) {
                if (res.data.content && !Array.isArray(res.data.content)) {
                    Object.assign(item, { ...res.data, created_at: new Date(), updated_at: new Date() })
                }
                await GETallgames()
                return {
                    success: true,
                    content: null,
                };
            }
        } catch (error) {
            Object.assign(item, originalItem)
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: null,
            };
        } finally {
            isLoading.value = false
            saveToLocalStorage()
        }
        return {
            success: false,
            content: null,
            status: 400,
        }

    }

    async function DELETEgames(id: number): Promise<APIResponse<null>> {
        const index = games.value.findIndex(item => Number(item.id) === id)
        const removedItem = index !== -1 ? games.value[index] : null
        if (index !== -1) {
            games.value.splice(index, 1)
        }
        try {
            isLoading.value = true;
            const res = await API.games.deleteGame(id);
            if ((res.status === 200 || res.status === 204)) {
                return { success: true, content: null }
            } else {
                
                throw new Error("Sikertelen törlés")
            }
        } catch (error) {
            if (removedItem && index != -1) {
                games.value.splice(index, 0, removedItem as Game)
            }
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: null,
            };
        } finally {
            isLoading.value = false
            saveToLocalStorage()
        }

    }


    async function POSTCollectibles(game_id: number, type: string, description: string, images: Array<string>, map_location: Array<string>): Promise<APIResponse<null>> {
        const addItem: Omit<Collectible, 'id'> = {
            game_id,
            type,
            description,
            images,
            map_location,
        }
        try {
            isLoading.value = true;
            const res = await API.collectibles.postCollectible(addItem);
            if ((res.status === 200 || res.status === 201)) {
                if (res.data.content && !Array.isArray(res.data.content)) {
                    games.value.push(res.data.content)
                }
                await GETallgames()
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
        } finally {
            isLoading.value = false
            saveToLocalStorage()
        }
        return {
            success: false,
            content: null,
            status: 400,
        }

    }

    async function PATCHcollectible(id: number, updates: Partial<Collectible>): Promise<APIResponse<null>> {
        const item = collectibles.value.find(item => Number(item.id) === id)
        if (!item) return { success: false, status: 404, content: null }

        const originalItem = { ...item }

        Object.assign(item, updates)

        try {
            isLoading.value = true;
            const res = await API.collectibles.patchCollectible(id, updates);
            if ((res.status === 200 || res.status === 201)) {
                if (res.data.content && !Array.isArray(res.data.content)) {
                    Object.assign(item, res.data.content)
                }
                await GETallcollectibles()
                return {
                    success: true,
                    content: null,
                };
            }
        } catch (error) {
            Object.assign(item, originalItem)
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: null,
            };
        } finally {
            isLoading.value = false
            saveToLocalStorage()
        }
        return {
            success: false,
            content: null,
            status: 400,
        }

    }

    async function DELETEcollectible(id: number): Promise<APIResponse<null>> {
        const index = collectibles.value.findIndex(item => Number(item.id) === id)
        const removedItem = index !== -1 ? collectibles.value[index] : null
        if (index !== -1) {
            collectibles.value.splice(index, 1)
        }

        try {
            isLoading.value = true;
            const res = await API.collectibles.deleteCollectible(id);
            if ((res.status === 200 || res.status === 204)) {
                
                return { success: true, content: null }
            } else {
                throw new Error("Sikertelen törlés")
            }

        } catch (error) {
            if (removedItem && index !== -1) {
                collectibles.value.splice(index, 0, removedItem as Collectible)
            }
            const _error = error as AxiosError<string>;
            return {
                success: false,
                status: _error.response?.status,
                content: null,
            };
        } finally {
            isLoading.value = false
            saveToLocalStorage()
        }

    }


    async function GETallcollectibles(): Promise<APIResponse<null>> {
        try {
            isLoading.value = true;
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
        } finally {
            isLoading.value = false
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
        POSTgames,
        POSTCollectibles,
        PATCHgames,
        PATCHcollectible,
        DELETEgames,
        DELETEcollectible
    }
})