<template>
    <div class="relative w-full mb-4">
        <label
            :for="id"
            class="text-base font-semibold leading-5"
            :class="{
                'text-red-500': isError,
                'text-black': !isError,
            }"
        >
            {{ label }}</label
        >
        <div
            class="relative flex items-center mt-3 w-full border p-2 rounded-md"
            :class="{
                border: !noBorder,
                'border-transparent': noBorder,
                'border-red-500': isError,
            }"
        >
            <div
                class="h-full pr-2 text-lg cursor-pointer m-auto top-0 bottom-0 flex gap-2 items-center justify-center pl-2"
            >
                <component :is="IconMagnifier" v-if="isSearchIcon" />

                <UILoader class="w-6 h-6" v-if="isLoading" />
            </div>

            <v-select
                label="label"
                :options="data"
                class="style-chooser"
                :id="id"
                :placeholder="placeholder"
                :modelValue="modelValue"
                @update:modelValue="updateModelValue"
                :onSearch="onSearch"
                :reduce="reduceOption"
                :disabled="isDisabled"
            >
            </v-select>
        </div>
        <template v-if="isError">
            <div
                class="text-sm text-red-500 absolute pt-2"
                v-for="error of errorMessage"
                :key="error.$uid"
            >
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </template>
    </div>
</template>

<script setup>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import IconMagnifier from "./icons/IconMagnifying.vue";
import { defineProps } from "vue";
import UILoader from "./ui/UILoader.vue";

const {
    id,
    data,
    modelValue,
    isLoading,
    isSearchIcon,
    onSearch,
    reduceOption,
} = defineProps([
    "id",
    "data",
    "modelValue",
    "label",
    "placeholder",
    "isSearchIcon",
    "isLoading",
    "onSearch",
    "reduceOption",
    "noBorder",
    "isDisabled",
    "isError",
    "errorMessage",
]);

const emit = defineEmits(["update:modelValue"]);

function updateModelValue(newValue) {
    emit("update:modelValue", newValue);
}
</script>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
    border: none;
}

.style-chooser .vs__dropdown-toggle {
    border-radius: 0;

    height: 40px;
    padding: 0 10px;
    width: 100%;
}

.style-chooser .vs__search::placeholder {
    color: #394066 !important;
}

.style-chooser {
    width: 100%;
    height: 100%;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
    fill: #394066;
}
</style>
