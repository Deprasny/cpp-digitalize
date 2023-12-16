<template>
    <div class="flex flex-col w-full bg-white shadow-xl">
        <div
            :class="cardClasses"
            class="flex justify-between w-full py-4 border px-7 rounded-t-xl"
        >
            <span class="text-lg font-semibold">{{ props.title }}</span>
            <button
                v-if="tooltip"
                class="text-lg font-semibold"
                @click="tooltipHandle"
            >
                <div
                    class="flex items-center justify-center w-6 h-6 border-2 border-black rounded-full"
                >
                    !
                </div>
            </button>
            <button
                v-if="draft"
                class="text-lg font-semibold"
                @click="draftHandle"
            >
                <div
                    class="flex items-center justify-center px-4 py-1 border-2 rounded-full"
                >
                    Edit Draft
                </div>
            </button>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { defineProps } from "vue";

const emit = defineEmits(["tooltip"]);

const props = defineProps({
    title: {
        type: String,
        default: "Form",
    },
    variant: {
        type: String,
        default: "form",
    },
    tooltip: {
        type: String,
        default: false,
    },
    draft: {
        type: Boolean,
        default: false,
    },
});

const cardClasses = computed(() => {
    return {
        " bg-accent-2": props.variant === "form",
        "bg-accent-1 text-white": props.variant === "detail",
    };
});

const tooltipHandle = () => {
    emit("tooltip");
};

const draftHandle = () => {
    emit("draft");
};
</script>
