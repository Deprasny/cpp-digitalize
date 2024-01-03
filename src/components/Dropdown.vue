<template>
    <div class="relative h-full w-full" :class="class">
        <select
            v-if="!isLoading"
            :disabled="disabled"
            @click="toggleDropdown"
            class="w-full px-4 py-3 mb-1 appearance-none rounded-lg text-gray-800 select-container focus:outline-none cursor-pointer"
            :value="modelValue"
            @input="emit('update:modelValue', $event.target.value)"
        >
            <option
                v-for="(option, index) in dropdownOptions"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>

        <div v-else class="px-4 py-3">
            <UILoader class="w-6 h-6" />
        </div>

        <IconChevronLeft
            class="text-accent-1 absolute top-0 bottom-0 m-auto right-3"
        />
    </div>
</template>

<style>
.select-container {
    font-size: 12px;
    max-width: 100%;
    white-space: wrap;
}
</style>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import UILoader from "./ui/UILoader.vue";

const emit = defineEmits(["update:modelValue"]);

const { disabled, isLoading, modelValue, dropdownOptions } = defineProps([
    "modelValue",
    "dropdownOptions",
    "disabled",
    "isLoading",
    "class",
]);
</script>
