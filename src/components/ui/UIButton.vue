<template>
    <button :class="buttonClasses" @click="onClick">
        <slot></slot>
    </button>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
    variant: {
        type: String,
        default: "primary",
    },
    type: {
        type: String,
        default: "submit",
    },
});

// Define a computed property for dynamic class bindings
const buttonClasses = computed(() => {
    return {
        "px-4 py-2 font-semibold text-white rounded hover:bg-blue-600":
            props.variant === "primary",
        "px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600":
            props.variant === "danger",
        "w-full px-4 py-4 font-bold text-white border rounded-lg bg-buttonLogin opacity-90 hover:opacity-100 border-white":
            props.variant === "login",
        "w-full px-4 py-4 font-bold text-black border rounded-lg bg-white opacity-90 hover:opacity-100 border-white-500 text-base font-light leading-5":
            props.variant === "loginGoogle",
        "my-5": true,
    };
});

const emit = defineEmits(["click"]);

// Emit a custom event on click
const onClick = () => emit("click");
</script>
