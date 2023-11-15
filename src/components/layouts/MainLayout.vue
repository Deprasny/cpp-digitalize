<!-- MainLayout.vue -->
<template>
    <div>
        <div class="flex">
            <Sidebar />
            <div class="flex flex-col bg-content w-[100%] h-[2000px] pl-72">
                <Header />
                <main class="mx-7">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/SideBar.vue";
</script>
