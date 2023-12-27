<template>
    <div class="flex gap-x-7 md:flex-row flex-col" :class="class">
        <slot></slot>
    </div>
</template>

<script setup>
const props = defineProps(["class"]);
</script>
