<!-- Sidebar.vue -->
<template>
    <div>
        <aside v-if="store.isSidebarOpen">
            <nav
                class="w-72 h-[100vh] rounded-br-lg p-6 shadow-2xl fixed bg-white z-20"
            >
                <div class="flex items-start justify-between">
                    <div class="text-accent-1">
                        <h3 class="text-xl font-bold">HR</h3>
                        <p>Digitalize Document</p>
                    </div>
                    <button @click="store.toggleSidebar">X</button>
                </div>
                <div class="flex flex-col justify-between h-[90%] mt-5">
                    <ul>
                        <div v-for="item in menu" :key="item.name">
                            <router-link :to="item.route" exact>
                                <li
                                    class="p-3 my-5 rounded-full hover:bg-accent-1 hover:text-white hover:font-semibold"
                                    :class="{
                                        'bg-accent-1 text-white font-semibold':
                                            $route.path.startsWith(item.route),
                                    }"
                                >
                                    <div class="flex items-center gap-x-5">
                                        <component :is="item.icon" />
                                        {{ item.name }}
                                    </div>
                                </li>
                            </router-link>
                        </div>
                    </ul>

                    <div
                        class="flex flex-col items-center justify-center mb-5 gap-y-8"
                    >
                        <IconLogo class="" />
                        <p class="text">Develop & maintain by CPP</p>
                        <button
                            @click="handleToggleModal"
                            class="flex gap-2 text-gray-600 md:hidden"
                        >
                            Logout
                            <component
                                :is="IconArrowRight"
                                class="text-2xl text-gray-600 cursor-pointer"
                            />
                        </button>
                    </div>
                </div>
            </nav>
        </aside>
        <div
            v-else
            class="fixed flex items-center justify-start w-full h-[40px] px-4 z-40"
        >
            <button @click="store.toggleSidebar" class="absolute top-8">
                <IconHamburger />
            </button>
        </div>
    </div>

    <Modal
        :isModalOpen="showModal"
        @toggleModal="handleToggleModal"
        @submit="submit"
        modalTitle="Anda yakin ingin keluar?"
    />
</template>

<script setup>
import { ref } from "vue";
import IconHome from "@/components/icons/IconHome.vue";
import IconChange from "@/components/icons/IconChange.vue";
import IconEvaluation from "@/components/icons/IconEvaluation.vue";
import IconPensiun from "@/components/icons/IconPensiun.vue";
import IconCheck from "../icons/IconCheck.vue";
import IconHamburger from "../icons/IconHamburger.vue";
import Modal from "@/components/Modal.vue";
import IconLogo from "@/components/icons/IconLogo.vue";
import IconArrowRight from "../icons/IconArrowRight.vue";
import { useRouter } from "vue-router";
import { useSidebarStore } from "@/stores/index.js";

const store = useSidebarStore();

const router = useRouter();
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
    {
        name: "Approval",
        icon: IconCheck,
        route: "/approval/mutasi",
    },
]);

const showModal = ref(false);

const handleToggleModal = () => {
    showModal.value = !showModal.value;
};

const submit = () => {
    router.push("/auth/login");
    localStorage.clear();
    handleToggleModal();
};
</script>

<style>
.text {
    @apply font-light leading-4 text-base;
}
</style>
