<template>
    <div
        class="flex p-3 font-semibold uppercase"
        :class="type === 'primary' ? 'bg-accent-2' : 'bg-accent-1'"
    >
        <div
            class="w-full h-full text-center"
            :class="item.class"
            v-for="item in data"
        >
            {{ item?.title }}
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const { data, type } = defineProps(["data", "type"]);
</script>
