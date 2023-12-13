<template>
    <div class="relative shadow-xl h-full" @click="toggleDropdown">
        <div
            class="absolute w-full rounded-lg shadow-xs dropdown-content"
            :class="{ 'z-20': isDropdownOpen }"
        >
            <a href="#" class="block px-4 py-3 mb-1">
                <span class="flex items-center justify-between">
                    <span class="text-gray-800">{{
                        selectedOptions.label
                    }}</span>
                    <IconChevronLeft class="text-accent-1" />
                </span>
            </a>

            <div
                v-show="isDropdownOpen"
                class="max-h-[300px] z-30 overflow-auto scroll-smooth z-30 bg-white"
            >
                <div v-for="(option, index) in dropdownOptions" :key="index">
                    <div
                        class="block px-2 py-2 text-gray-800 border border-b border-gray-500 hover:bg-line-gradient hover:border-l-accent-1 hover:border-2 hover:py-6 hover:text-accent-1 hover:font-semibold"
                        @click="handleDropdownItemClick(option)"
                    >
                        {{ option.label }}
                    </div>
                </div>

                <div
                    v-show="isLoading"
                    class="block px-2 py-2 text-gray-800 border border-b border-gray-500"
                >
                    <UILoader class="w-6 h-6" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import UILoader from "./ui/UILoader.vue";
const props = defineProps({
    dropdownOptions: {
        type: Array,
        required: true,
    },
    selectedOptionText: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(["update:selectedOptionText"]);

const selectedOptions = ref({
    label: "",
    value: "",
});

const isDropdownOpen = ref(false);

const toggleDropdown = (event) => {
    event.preventDefault();
    if (!props.disabled) {
        isDropdownOpen.value = !isDropdownOpen.value;
    }

    return;
};

const handleDropdownItemClick = (option) => {
    isDropdownOpen.value = true;
    selectedOptions.value = option;
    emits("update:selectedOptionText", option.value);
};
</script>
