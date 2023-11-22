<template>
    <div
        class="w-[220px] h-[250px] bg-accent-2 rounded-3xl p-5 flex flex-col justify-between shadow-xl"
    >
        <div class="flex items-baseline justify-between">
            <p class="text-2xl">{{ transactionsType }}</p>
            <component :is="IconChange" class="text-2xl" />
        </div>
        <div class="flex flex-col">
            <p class="text-5xl font-bold">{{ totalTransactions }}</p>
            <p>Employee</p>
        </div>
    </div>
</template>

<script setup>
import IconChange from "@/components/icons/IconChange.vue";
import getTransactionsCode from "../utils/getTransactionsCode";

const props = defineProps({
    type: {
        type: String,
        default: "MUT",
    },
    totalTransactions: {
        type: Number,
        default: 0,
    },
});

const { type, totalTransactions } = props;

const transactionsType = getTransactionsCode(type);
</script>
