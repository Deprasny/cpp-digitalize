<!-- FormRadio.vue -->
<template>
    <div class="flex flex-col items-start">
        <p class="font-semibold">{{ label }}</p>
        <p class="mb-3 text-xs italic">(Pilih salah satu)</p>
        <div v-for="option in options" :key="option.value" class="flex gap-x-2">
            <input
                type="radio"
                :name="name"
                :value="option.value"
                :checked="modelValue === option.value"
                @change="$emit('update:modelValue', option.value)"
            />
            <p>{{ option.label }}</p>
        </div>
    </div>
</template>

<script setup>
// Define props
const props = defineProps(["label", "name", "options", "modelValue"]);
</script>
