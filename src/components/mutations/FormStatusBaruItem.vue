<template>
    <div
        class="w-full border border-l-0 border-black last:border-b-[2px] h-20 flex text-left text-ellipsis"
        :class="{
            'bg-gray-50': isDisabled,
        }"
    >
        <slot />
    </div>
</template>

<script setup>
const props = defineProps(["isDisabled"]);
</script>
