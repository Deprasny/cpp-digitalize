<template>
    <div
        class="w-full h-20 py-2 border border-l-0 text-left border-black flex items-center"
        :class="class"
    >
        <slot></slot>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    class: {
        type: String,
        required: false,
    },
});
</script>
