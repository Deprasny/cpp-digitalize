<template>
    <div class="relative shadow-xl -top-8" @click="toggleDropdown">
        <div
            class="absolute z-10 mt-2 bg-white border border-gray-500 rounded-lg shadow-xs dropdown-content w-full"
            :class="classes"
        >
            <a href="#" class="block px-4 py-3">
                <span class="flex items-center justify-between gap-3">
                    <span class="text-gray-800">{{ selectedOptionText }}</span>
                    <component :is="IconChevronLeft" />
                </span>
            </a>

            <div
                v-show="isDropdownOpen"
                class="max-h-[300px] overflow-auto scroll-smooth cursor-pointer"
            >
                <div v-for="(option, index) in dropdownOptions" :key="index">
                    <div
                        class="block px-4 py-4 text-gray-800 hover:bg-line-gradient hover:border-l-accent-1 hover:border-2 hover:py-6 hover:text-accent-1 hover:font-semibold"
                        @click="handleDropdownItemClick(option)"
                    >
                        {{ option.label }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";

const props = defineProps({
    dropdownOptions: {
        type: Array,
        required: true,
    },
    selectedOptionText: {
        type: String,
        required: true,
    },
    classes: {
        type: String,
        default: "min-w-[300px]",
    },
});

const emits = defineEmits(["update:selectedOptionText"]);

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    event.preventDefault();
    isDropdownOpen.value = !isDropdownOpen.value;
};

const handleDropdownItemClick = (option) => {
    isDropdownOpen.value = true;
    emits("update:selectedOptionText", option);
};
</script>
