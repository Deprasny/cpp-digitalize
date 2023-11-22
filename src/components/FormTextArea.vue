<template>
    <div class="relative w-1/2 mb-4 space-y-4">
        <label :for="props.id" class="font-semibold leading-5 text-black">{{
            props.label
        }}</label>
        <div class="relative flex items-center">
            <textarea
                :id="props.id"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                class="w-full h-32 px-3 py-2 text-black placeholder-opacity-50 bg-transparent border border-gray-500 shadow outline-none appearance-none focus:placeholder-opacity-100 rounded-xl"
            ></textarea>
            <div
                v-if="props.icon"
                class="absolute top-0 right-0 h-full pr-2 cursor-pointer"
                @click="emitHandleToggleIcon"
            >
                <img :src="props.icon" alt="Icon" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        required: true,
    },
    icon: String,
});

const emit = defineEmits(["update:modelValue", "toggleIcon"]);

const emitHandleToggleIcon = () => {
    emit("toggleIcon");
};
</script>
