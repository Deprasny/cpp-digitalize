<template>
    <button
        :class="buttonClasses"
        @click="onClick"
        class="flex items-center justify-center"
    >
        <span v-if="props.icon" class="mr-2">
            <component :is="props.icon" class="text-lg" />
        </span>
        <slot></slot>
    </button>
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
    variant: {
        type: String,
        default: "primary",
    },
    type: {
        type: String,
        default: "submit",
    },
    icon: {
        type: String,
        default: "",
    },
});

const buttonClasses = computed(() => {
    return {
        "px-4 py-4 rounded-xl break-words text-xs text-white bg-button":
            props.variant === "primary",
        "px-4 py-2 font-semibold text-black rounded-xl hover:bg-gray-200  ":
            props.variant === "secondary",
        "w-full px-4 py-4 font-bold text-white border rounded-lg bg-buttonLogin opacity-90 hover:opacity-100 border-white":
            props.variant === "login",
        "w-full px-4 py-4 font-bold text-black border rounded-lg bg-white opacity-90 hover:opacity-100 border-white-500 text-base font-light leading-5":
            props.variant === "loginGoogle",
        "md:py-6 md:px-6 p-2 border-2 rounded-md w-[120px] md:w-[220px] border-[#0A70A9]":
            props.variant === "tab",
        "py-3 px-6 border rounded-xl text-accent-1 font-semibold w-[220px] border-accent-1":
            props.variant === "form",
        "py-3 px-6 border rounded-xl text-accent-1 font-semibold w-[220px] border-red-500 bg-red-500 text-white ":
            props.variant === "danger",
        "py-3 px-6 border rounded-xl text-accent-1 font-semibold w-[220px] border-accent-1 bg-accent-1 text-white":
            props.variant === "approve",
        "my-5": true,
    };
});
</script>
