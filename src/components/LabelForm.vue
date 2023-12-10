<script setup>
import { defineProps } from "vue";

const props = defineProps({
    label: {
        type: String,
        default: "fill text",
    },
    value: {
        type: String,
        default: "fill value",
    },
});
</script>

<template>
    <div class="flex justify-between px-2 flex-grow-0 w-full">
        <div>{{ props.label }}</div>
        <div>:</div>
    </div>
</template>
