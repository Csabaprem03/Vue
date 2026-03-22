import { useDark, useToggle } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingStore=defineStore('settings',(()=>{
    const isOpen=ref<boolean>(false)
    const isGrid=ref<boolean>(false)
    const userAccount =ref<boolean>(false)

    const isDark=useDark({
        selector:'html',
        attribute:'class',
        valueDark:'dark',
        valueLight:'light'
    })

    const ToggleDark=useToggle(isDark)


    function toggleMenu() {
        isOpen.value=!isOpen.value
        saveToLocalStorage()
    }
    function toggleButton() {
        isGrid.value=!isGrid.value
        saveToLocalStorage()
    }

    function toggleUserAccount() {
        userAccount.value=!userAccount.value
        saveToLocalStorage()
    }

    function saveToLocalStorage() {
        const settings={
            isOpen:isOpen.value,
            isGrid:isGrid.value
        }
        localStorage.setItem('settings',JSON.stringify(settings))
    }

    function loadFromLocalStorage() {
        const saved=localStorage.getItem('settings')

        if (saved) {
            const settings=JSON.parse(saved)
            isOpen.value=settings.isOpen
            isGrid.value=settings.isGrid
        }

    }

    loadFromLocalStorage()

    return{
        isOpen,
        isGrid,
        isDark,
        userAccount,
        ToggleDark,
        toggleUserAccount,
        toggleButton,
        toggleMenu
    }
}))