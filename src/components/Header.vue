<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useSettingStore } from '../stores/settingsStore';

const store = useSettingStore()
</script>

<template>
    <header>
        <nav class="bg-neutral-600 w-full">
            <div class="max-w-screen-xl flex flex-nowrap items-center justify-between mx-auto p-3.5">
                <button @click="store.toggleMenu" data-collapse-toggle="navbar-default" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading"
                    aria-controls="navbar-default" aria-expanded="false">
                    <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                            d="M5 7h14M5 12h14M5 17h14" />
                    </svg>
                </button>
                <div :class="['w-full md:block md:w-auto', store.isOpen ? 'block' : 'hidden']">
                    <ul class="font-medium flex flex-col md:flex-row md:space-x-4">
                        <li>
                            <RouterLink to="/lista"
                                class="block py-2 px-3 text-dark rounded md:bg-neutral-300  md:text-fg-brand md:p-0 ">
                                Játékok listája</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/termek"
                                class="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-neutral-300  md:border-0 md:hover:text-fg-brand md:p-0 ">
                                termékek</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/gyujtheto"
                                class="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-neutral-300  md:border-0 md:hover:text-fg-brand md:p-0 ">
                                Gyűjthető</RouterLink>
                        </li>
                    </ul>
                </div>
                <div class="z-10  bg-neutral-primary-medium border-default-medium rounderd-base shadow-g w-44"
                    >
                    <ul class="relative">
                        <li class="relative group">
                            <button type="button" class="flex items-center py-2 px-3 text-heading hover:text-fg-brand">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path fill-rule="evenodd"
                                        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                            <ul class="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded w-40"
                                aria-labelledby="user-menu-drop-button">
                                <li>
                                    <RouterLink to="/register"
                                        class="inline-flex items-center w-full p-2 hover:bg-neutrall-ertiary-medium hover:text-heading rounded">
                                        Regisztráció</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/login"
                                        class="inline-flex items-center w-full p-2 hover:bg-neutrall-ertiary-medium hover:text-heading rounded">
                                        Bejelentkezve</RouterLink>
                                </li>
                            </ul>
    
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>