<template>
    <div class="relative z-10">
        <div
            class="absolute min-w-[200px] max-w-[400px] border-accent-2 border bg-white bg-opacity-70 rounded-lg shadow-xl backdrop-blur-sm"
            :class="classes"
        >
            <div class="flex flex-col py-5 px-7 gap-y-2">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    classes: {
        type: String,
        default: "",
    },
});
</script>
