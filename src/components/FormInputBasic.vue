<template>
    <div class="relative w-full mb-4">
        <label :for="id" class="text-base font-semibold leading-5 text-black">{{
            label
        }}</label>
        <div class="relative flex items-center mt-3">
            <input
                :disabled="disabled"
                :type="type"
                :id="id"
                :value="modelValue"
                @input="emit('update:modelValue', $event.target.value)"
                class="w-full px-3 py-3 text-black placeholder-black placeholder-opacity-50 bg-transparent border border-gray-500 rounded-lg shadow appearance-none focus:placeholder-opacity-100"
                :placeholder="placeholder"
                @keydown.enter.prevent="emitHandleAddName"
                :class="{ 'bg-gray-100': disabled }"
            />
            <div
                v-if="icon"
                class="absolute h-full pr-2 text-lg cursor-pointer right-1 top-4"
                @click="emitHandleToggleIcon"
            >
                <component :is="icon" />
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
        default: "text",
    },
    modelValue: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: false,
    },
    placeholder: {
        type: String,
        default: "isi data",
        required: false,
    },
    disabled: {
        type: Boolean,
        default: false,
        required: false,
    },
});

const emit = defineEmits(["update:modelValue", "toggleIcon", "addName"]);

const emitHandleToggleIcon = () => {
    emit("toggleIcon");
};

const emitHandleAddName = () => {
    emit("addName");
};
</script>
