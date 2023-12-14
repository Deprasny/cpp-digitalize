<!-- MainLayout.vue -->
<template>
    <div>
        <div class="flex">
            <Sidebar />
            <div
                :class="`flex flex-col w-[100%] ${
                    store.isSidebarOpen ? 'sm:pl-72' : 'pl-0'
                } pb-20 h-full`"
            >
                <Header />
                <main class="mt-10 sm:mt-20 mx-7">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/SideBar.vue";
import { useSidebarStore } from "@/stores/index.js";

const store = useSidebarStore();
</script>

<style>
body {
    @apply bg-content;
}
</style>
