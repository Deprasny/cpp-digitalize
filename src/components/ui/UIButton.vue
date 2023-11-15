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
import { defineProps, defineEmits } from "vue";

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
        "py-6 px-6 border-2 rounded-md w-[220px] border-[#0A70A9]":
            props.variant === "tab",
        "my-5": true,
    };
});
</script>
