<template>
    <div v-for="item in data" class="flex w-full" :key="item">
        <div class="items-start w-full p-4 border border-black h-[150px]">
            <p class="font-semibold">
                {{ item?.title }}
            </p>
            <p class="font-light">
                {{ item?.description }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const { data } = defineProps(["data"]);
</script>
