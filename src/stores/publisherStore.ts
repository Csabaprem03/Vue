import { defineStore } from "pinia";
import type { Collectible, Game, Publisher } from "../types";
import { API } from '../services/index';
import { ref } from "vue";
import type { APIResponse } from "../services/types";
import type { AxiosError } from "axios";


export const usepublishersStore = defineStore('pubisherStore', () => {

    const publishers = ref<Game[]>([])
    const isLoading = ref<boolean>(false)

    function initpublishers(data: Game[]) {
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
                initpublishers(data)
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

    async function POSTpublishers(name:string,headquarters:string,is_active:boolean): Promise<APIResponse<null>> {
        const addItem:Omit<Publisher,'id'>={
            name,
            headquarters,
            is_active,
        }
        try {
            isLoading.value = true;
            const res = await API.publishers.postPublisher(a,{});
            if (res.status === 200 && data) {
                publishers.value.push(addItem)
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

    }
})