<template>
    <div class="w-full mb-4 gap-y-10">
        <label :for="id" class="text-base font-light leading-5 text-white">{{
            label
        }}</label>
        <div class="relative flex items-center">
            <input
                :type="type"
                :id="id"
                :value="modelValue"
                @input="emit('update:modelValue', $event.target.value)"
                class="w-full px-3 py-2 text-white placeholder-white placeholder-opacity-50 bg-transparent border-b-2 border-gray-300 shadow outline-none appearance-none focus:placeholder-opacity-100"
            />
            <div
                v-if="icon"
                class="absolute top-0 right-0 h-full pr-2 cursor-pointer"
                @click="emitHandleToggleIcon"
            >
                <img :src="icon" alt="Icon" />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: false,
    },
});

const emit = defineEmits(["update:modelValue", "toggleIcon"]);

const emitHandleToggleIcon = () => {
    emit("toggleIcon");
};
</script>
