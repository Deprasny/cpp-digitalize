<script setup>
import { defineProps } from "vue";

const props = defineProps({
    label: {
        type: String,
        default: "fill text",
    },
});
</script>

<template>
    <div class="flex justify-between pr-3">
        <div>{{ props.label }}</div>
        <div>:</div>
    </div>
</template>
