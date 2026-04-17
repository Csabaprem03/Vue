import { useDark, useToggle } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingStore = defineStore("settings", () => {
  // konstansok használata
  const isOpen = ref<boolean>(false);
  const isOpenWithMobile = ref<boolean>(false);
  const isGrid = ref<boolean>(false);
  const userAccount = ref<boolean>(false);

  const isDark = useDark({
    selector: "html",
    attribute: "class",
    valueDark: "dark",
    valueLight: "light",
  });

  const ToggleDark = useToggle(isDark);

  // saját függvények használata
  function toggleMenu() {
    isOpen.value = !isOpen.value;
    saveToLocalStorage();
  }
  function toggleMenuWithMobile() {
    isOpenWithMobile.value = !isOpenWithMobile.value;
    saveToLocalStorage();
  }
  function toggleButton() {
    isGrid.value = !isGrid.value;
    saveToLocalStorage();
  }

  function toggleUserAccount() {
    userAccount.value = !userAccount.value;
    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    const settings = {
      isOpenWithMobile: isOpenWithMobile.value,
      isOpen: isOpen.value,
      isGrid: isGrid.value,
    };
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem("settings");

    if (saved) {
      const settings = JSON.parse(saved);
      isOpenWithMobile.value = settings.isOpenWithMobile;
      isOpen.value = settings.isOpen;
      isGrid.value = settings.isGrid;
    }
  }

  loadFromLocalStorage();
  // visszatéresek konstans és függvény
  return {
    isOpen,
    isGrid,
    isDark,
    isOpenWithMobile,
    userAccount,
    ToggleDark,
    toggleMenuWithMobile,
    toggleUserAccount,
    toggleButton,
    toggleMenu,
  };
});
