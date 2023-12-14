// store.js
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
    state: () => ({
        isModalOpen: false,
    }),
    actions: {
        toggleModal() {
            this.isModalOpen = !this.isModalOpen;
        },
    },
});

export const useSidebarStore = defineStore("sidebar", {
    state: () => ({
        isSidebarOpen: open,
    }),
    actions: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
    },
});
