import { defineStore } from "pinia";
import type { Collectible, Game, Publisher } from "../types";
import { API } from '../services/index';
import { ref } from "vue";
import type { APIResponse } from "../services/types";
import type { AxiosError } from "axios";


export const usepublishersStore = defineStore('pubisherStore', () => {

    const publishers = ref<Publisher[]>([])
    const isLoading = ref<boolean>(false)

    function initpublishers(data: Publisher[]) {
        publishers.value = data || [];
    }


    function saveToLocalStorage(): void {
        const datas = {
            publishers: publishers.value,
        }
        localStorage.setItem('publishersStore', JSON.stringify(datas))
    }

    function loadFromLocalStorage(): void {
        const saved = localStorage.getItem("publishersStore")

        if (saved) {
            const parsed = JSON.parse(saved)
            publishers.value = parsed.publishers
        }

    }



    async function GETallpublishers(): Promise<APIResponse<null>> {
        try {
            isLoading.value = true;
            const res = await API.publishers.getPublisher();
            const data = await res.data;
            if (res.status === 200 && data) {
                const items=data.content || data
                initpublishers(items)
                return {
                    success: true,
                    content: items,
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

    async function POSTpublishers(name:string,headquarters:string,is_active:number): Promise<APIResponse<null>> {
        const addItem:Omit<Publisher,'id'>={
            name,
            headquarters,
            is_active,
        }
        try {
            isLoading.value = true;
            const res = await API.publishers.postPublisher(addItem);
            if ((res.status === 200 || res.status===201)) {
                if (res.data.content && !Array.isArray(res.data.content)) {
                    publishers.value.push(res.data.content)
                }
                await GETallpublishers()
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
        publishers,
        isLoading,
        GETallpublishers,
        POSTpublishers,

    }
})