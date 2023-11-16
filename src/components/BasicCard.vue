<template>
    <div class="flex flex-col bg-white shadow-xl">
        <div class="w-full py-4 border px-7 rounded-t-xl bg-accent-2">
            <span class="text-lg font-semibold">{{ props.title }}</span>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    title: {
        type: String,
        default: "Form",
    },
});
</script>
