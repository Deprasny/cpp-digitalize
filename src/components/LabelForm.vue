<script setup>
import { defineProps } from "vue";

const props = defineProps({
    label: {
        type: String,
        default: "fill text",
    },
    value: {
        type: String,
        default: "",
    },
    class: {
        type: String,
    },
    colon: {
        type: Boolean,
        default: true,
    },
});
</script>

<template>
    <div class="flex px-2 w-full md:flex-row flex-col" :class="class">
        <div
            class="flex-shrink-0 pr-2 text-left font-semibold w-full md:w-[250px]"
        >
            {{ props.label }}
        </div>
        <div class="pr-2 md:flex hidden" v-show="colon">:</div>
        <div class="flex-grow w-full">
            <slot></slot>
        </div>
    </div>
</template>
