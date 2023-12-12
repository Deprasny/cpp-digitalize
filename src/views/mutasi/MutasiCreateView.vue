<template>
    <div>
        <a @click="$router.back()">
            <UIButton :icon="IconChevronLeft" :variant="'secondary'">
                Buat form mutasi baru
            </UIButton>
        </a>

        <UIDivider />

        <div class="relative my-5 shadow-xl" @click="toggleDropdown">
            <div
                class="absolute w-[350px] mt-2 bg-white border border-gray-200 rounded-md shadow-xs dropdown-content z-10"
            >
                <a href="#" class="block px-4 py-4">
                    <span class="flex items-center justify-between">
                        <span class="text-gray-800 opacity-70">{{
                            selectedOption || "Pilih Individu / Group"
                        }}</span>
                        <component :is="IconChevronLeft" />
                    </span>
                </a>

                <div v-show="isDropdownOpen">
                    <div
                        v-for="(option, index) in dropdownOptions"
                        :key="index"
                    >
                        <router-link
                            :to="getRouteForOption(option)"
                            class="block px-4 py-4 text-gray-800 hover:bg-line-gradient hover:border-l-accent-1 hover:border-2 hover:py-6 hover:text-accent-1 hover:font-semibold"
                            @click="handleDropdownItemClick(option)"
                        >
                            {{ option }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script setup>
import UIButton from "@/components/ui/UIButton.vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import UIDivider from "@/components/ui/UIDivider.vue";
import { ref } from "vue";
import { useRouter, RouterView } from "vue-router";

const router = useRouter();

const isDropdownOpen = ref(false);
const selectedOption = ref(null);
const dropdownOptions = ref(["Individu", "Kolektif"]);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const getRouteForOption = (option) => {
    return option === "Individu"
        ? "mutasi-create-individu"
        : "mutasi-create-group";
};

const handleDropdownItemClick = (option) => {
    selectedOption.value = option;
    isDropdownOpen.value = true;
    router.push({ name: getRouteForOption(option) });
};
</script>
