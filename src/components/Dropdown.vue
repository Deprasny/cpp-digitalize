<template>
    <div class="relative shadow-xl h-full flex items-center gap-2 px-2">
        <select
            v-if="!isLoading"
            :disabled="disabled"
            @click="toggleDropdown"
            class="w-full px-4 py-3 mb-1 appearance-none rounded-lg text-gray-800 select-container"
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

        <UILoader class="w-6 h-6" v-else />

        <IconChevronLeft class="text-accent-1" />
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
]);
</script>
