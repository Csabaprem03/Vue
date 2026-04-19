<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useSettingStore } from "../stores/settingsStore";
import { useAuthStore } from "../stores/authStore";
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";

// a Pinia-k használata
const store = useSettingStore();
const authStore = useAuthStore();
const darkBtn = ref<HTMLButtonElement | null>(null);
const isUserMenuOpen = ref<boolean>(false);

console.log("Név: ", authStore.userName);
console.log("Email: ", authStore.userEmail);

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

onMounted(() => {
  const btn = darkBtn.value;
  if (!btn) return;

  btn.addEventListener("mousemove", (e: MouseEvent) => {
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const offsetX = x - centerX;
    const offsetY = y - centerY;

    const shadowX = offsetX / 5;
    const shadowY = offsetY / 5;
    const insetX = offsetX / 10;
    const insetY = offsetY / 10;

    btn.style.boxShadow = `
    ${shadowX}px ${shadowY}px 15px oklab(0 0 0 / .2),
    inset ${insetX}px ${insetY}px 10px oklab(1 0 0 / .1)
    `;

    btn.style.transform = `perspective(1000px) rotate(${-offsetY / 2}deg) rotate(${offsetX / 2}deg) scale(1.1)`;

    btn.addEventListener("mouseleave", () => {
      btn.style.boxShadow = "";
      btn.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });
});

onMounted(() => {
  window.addEventListener("click", (e) => {
    if (!(e.target as Element).closest(".user-menu-container")) {
      isUserMenuOpen.value = false;
    }
  });
});
</script>

<template>
  <!-- navigáció a tailwindccs-t használata -->
  <header class="w-full card-navbar-wrapper">
    <nav class="card-navbar-content">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3.5 relative"
      >
        <button
          ref="darkBtn"
          class="button-dark-mode p-2 rounded-3xl shrink-0"
          @click="store.ToggleDark()"
        >
          <Icon
            v-if="store.isDark"
            icon="line-md:sun-rising-filled-loop"
            height="30"
            width="30"
            class="text-gray-200"
          />
          <Icon
            v-else
            icon="line-md:moon-rising-alt-filled-loop"
            height="30"
            width="30"
            class="text-gray-950"
          />
        </button>

        <div class="flex items-center gap-2 md:order-2">
          <div class="relative user-menu-container">
            <button
              @click.stop="toggleUserMenu"
              class="flex items-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Icon
                icon="line-md:account"
                height="28"
                width="28"
                class="dark:text-white text-gray-800"
              />
            </button>

            <div
              v-show="isUserMenuOpen"
              class="absolute right-0 top-full w-64 mt-2 bg-white dark:bg-[#1a1a2e] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 z-[9999] overflow-hidden"
            >
              <div
                v-if="authStore.token"
                class="user-name-display px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#252545]"
              >
                <p
                  class="text-[0.6rem] uppercase opacity-60 text-gray-500 dark:text-gray-400"
                >
                  Felhasználó
                </p>
                <p
                  class="text-[0.8rem] font-bold truncate text-neutral-900 dark:text-neutral-100"
                >
                  {{ authStore.userName }}
                </p>
              </div>
              <ul class="py-1">
                <template v-if="!authStore.token">
                  <li>
                    <RouterLink to="/user/register" class="dropdown-item"
                      >Regisztráció</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink to="/user/login" class="dropdown-item"
                      >Bejelentkezés</RouterLink
                    >
                  </li>
                </template>
                <template v-else>
                  <li>
                    <RouterLink :to="{ name: 'favorite' }" class="dropdown-item"
                      >Kedvencek</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink to="/user" class="dropdown-item"
                      >Fiók</RouterLink
                    >
                  </li>
                  <li>
                    <button
                      @click="authStore.logout"
                      class="dropdown-item text-red-500 w-full text-left"
                    >
                      Kijelentkezés
                    </button>
                  </li>
                </template>
              </ul>
            </div>
          </div>

          <button
            @click="store.toggleMenuWithMobile"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Icon
              icon="line-md:menu"
              height="30"
              width="30"
              class="dark:text-white text-gray-800"
            />
          </button>
        </div>

        <div
          :class="[
            store.isOpenWithMobile ? 'block' : 'hidden',
            'w-full md:block md:w-auto md:order-1',
          ]"
        >
          <ul
            class="font-medium flex flex-col *:dark:hover:bg-blue-950/20 p-2 py-2.5 md:py-0 md:p-0 *:hover:p-2.5 shadow-none *:hover:shadow-md *:hover:shadow-neutral-50/20 rounded-nones inset-shadow-none *:hover:inset-shadow-sm *:dark:hover:inset-shadow-emerald-950/80 ring-0 *:hover:ring-1 *:dark:hover:ring-blue-950/50 *:hover:inset-shadow-yellow-800/80 *:hover:bg-gray-800/10 *:hover:ring-amber-600/20 *:hover:rounded-2xl md:flex-row md:space-x-4"
          >
            <li>
              <RouterLink :to="{ name: 'games.list' }"
                >Játékok listája</RouterLink
              >
            </li>
            <li>
              <RouterLink :to="{ name: 'gyujtheto' }"
                >Gyűjthető dolgok</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<style scoped>
@reference "../style.css";

.button-dark-mode {
  position: relative;
  transition:
    transform 0.2s ease,
    box-shadow 0.1s ease;
  border-radius: 1.5rem;
  cursor: pointer;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.button-dark-mode {
  box-shadow: 0px 0px 0px 0px oklab(0 0 0);
}
.dark .button-dark-mode {
  box-shadow: 0px 0px 0px 0px oklab(100% 0 -0.00011);
}
.nav-link {
  @apply font-bold px-3 py-2 rounded-lg transition-colors hover:text-yellow-600 dark:text-white;
}
.dropdown-item {
  @apply block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors;
  white-space: nowrap;
  min-width: max-content;
}
.user-menu-container {
  position: relative;
  z-index: 200;
  overflow: visible !important;
}
.card-navbar-wrapper {
  overflow: visible !important;
  position: relative;
  z-index: 50;
}
.card-navbar-content {
  overflow: visible !important;
  position: relative;
  z-index: 10;
}
.user-name-display {
  @apply block p-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#252545] font-bold text-xs uppercase tracking-wider text-gray-500;
  min-width: 100%;
  word-wrap: break-word;
}
.user-name-display p {
  @apply text-neutral-950 dark:text-neutral-50/80 font-bold break-all;
}

@media (max-width: 768px) {
  .user-menu-container .absolute {
    right: 0;
    left: auto;
    width: 240px;
    max-width: 90vw;
  }
}
</style>
