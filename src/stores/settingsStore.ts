import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingStore=defineStore('settings',(()=>{
    const isOpen=ref<boolean>(false)
    const isGrid=ref<boolean>(false)

    const userAccount =ref<boolean>(false)



    function toggleMenu() {
        isOpen.value=!isOpen.value
    }
    function toggleButton() {
        isGrid.value=!isGrid.value
    }

    function toggleUserAccount() {
        userAccount.value=!userAccount.value
    }

    return{
        isOpen,
        isGrid,
        userAccount,
        toggleUserAccount,
        toggleButton,
        toggleMenu
    }
}))