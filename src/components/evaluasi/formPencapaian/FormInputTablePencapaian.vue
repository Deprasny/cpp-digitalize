<template>
    <div class="flex w-full">
        <div
            class="w-[20%] text-center h-20 border flex items-center justify-center font-semibold"
            :class="{
                'border-red-600': errors,
                'border-black': !errors,
            }"
        >
            {{ number }}
        </div>
        <div
            class="w-full h-20 border"
            :class="{
                'border-red-600': errors,
                'border-black': !errors,
            }"
        >
            <input
                v-if="formAction === 'mutate'"
                placeholder="fill here"
                type="text"
                class="w-full h-full"
                @input="emit('update:inputLabel', $event.target.value)"
                :value="inputLabel"
            />

            <p v-else class="text-sm flex items-center h-full px-2">
                Mencapai target revenue total selama 3 bulan pertama adalah 1M
            </p>
        </div>
        <div
            class="w-full h-20 border"
            :class="{
                'border-red-600': errors,
                'border-black': !errors,
            }"
        >
            <input
                v-if="formAction === 'mutate'"
                placeholder="fill here"
                type="number"
                class="w-full h-full text-center"
                :value="inputValue"
                @input="emit('update:inputValue', $event.target.value)"
            />

            <p
                v-else
                class="text-lg flex items-center justify-center font-semibold h-full px-2"
            >
                30
            </p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const { number, errors } = defineProps([
    "number",
    "inputLabel",
    "inputValue",
    "formAction",
    "errors",
]);

const emit = defineEmits(["update:inputLabel", "update:inputValue"]);
</script>
