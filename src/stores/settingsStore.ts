import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingStore=defineStore('settings',(()=>{
    const isOpen=ref<boolean>(false)

    const userAccount =ref<boolean>(false)



    function toggleMenu() {
        isOpen.value=!isOpen.value
    }

    function toggleUserAccount() {
        userAccount.value=!userAccount.value
    }

    return{
        isOpen,
        userAccount,
        toggleUserAccount,
        toggleMenu
    }
}))