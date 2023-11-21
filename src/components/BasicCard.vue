<template>
    <div class="flex flex-col bg-white shadow-xl">
        <div :class="cardClasses" class="w-full py-4 border px-7 rounded-t-xl">
            <span class="text-lg font-semibold">{{ props.title }}</span>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { defineProps } from "vue";

const props = defineProps({
    title: {
        type: String,
        default: "Form",
    },
    variant: {
        type: String,
        default: "form",
    },
});

const cardClasses = computed(() => {
    return {
        " bg-accent-2": props.variant === "form",
        "bg-accent-1 text-white": props.variant === "detail",
    };
});
</script>
