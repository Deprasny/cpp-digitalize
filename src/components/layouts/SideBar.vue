<!-- Sidebar.vue -->
<template>
    <div>
        <button v-if="!isSidebarOpen" @click="toggleSidebar">
            Open Sidebar
        </button>
        <aside v-if="isSidebarOpen">
            <nav
                class="w-72 h-[100vh] rounded-br-lg p-6 shadow-2xl fixed bg-white"
            >
                <div class="flex items-start justify-between">
                    <div class="text-accent-1">
                        <h3 class="text-xl font-bold">HR</h3>
                        <p>Digitalize Document</p>
                    </div>
                    <button @click="toggleSidebar">X</button>
                </div>
                <div class="flex flex-col justify-between h-[90%] mt-5">
                    <ul>
                        <div v-for="item in menu" :key="item.name">
                            <router-link :to="item.route">
                                <li
                                    class="p-3 my-5 rounded-full hover:bg-accent-1 group hover:text-white hover:font-semibold"
                                    :class="{
                                        'bg-accent-1 text-white font-semibold':
                                            $route.path === item.route,
                                    }"
                                >
                                    <div class="flex items-center gap-x-5">
                                        <component
                                            :is="item.icon"
                                            class="group-hover:text-white"
                                            :class="{
                                                'text-white':
                                                    $route.path === item.route,
                                            }"
                                        />
                                        {{ item.name }}
                                    </div>
                                </li>
                            </router-link>
                        </div>
                    </ul>
                    <div
                        class="flex flex-col items-center justify-center mb-5 gap-y-5"
                    >
                        <IconLogo class="" />
                        <p class="text">Develop & maintain by CPP</p>
                    </div>
                </div>
            </nav>
        </aside>
    </div>
</template>

<script setup>
import { ref } from "vue";
import IconHome from "@/components/icons/IconHome.vue";
import IconChange from "@/components/icons/IconChange.vue";
import IconEvaluation from "@/components/icons/IconEvaluation.vue";
import IconPensiun from "@/components/icons/IconPensiun.vue";

import IconLogo from "@/components/icons/IconLogo.vue";
const isSidebarOpen = ref(true);

const menu = ref([
    {
        name: "Dashboard",
        icon: IconHome,
        route: "/dashboard",
    },
    {
        name: "Mutasi",
        icon: IconChange,
        route: "/mutasi",
    },
    {
        name: "Evaluasi",
        icon: IconEvaluation,
        route: "/evaluasi",
    },
    {
        name: "Pensiun",
        icon: IconPensiun,
        route: "/pensiun",
    },
]);
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style>
.text {
    @apply font-light leading-4 text-base;
}
</style>
