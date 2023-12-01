<template>
    <div class="relative z-10">
        <div
            class="absolute min-w-[200px] max-w-[400px] border-accent-2 border bg-white bg-opacity-70 rounded-lg shadow-xl backdrop-blur-sm"
            :class="classes"
        >
            <button
                @click="closeButttonHandler"
                class="absolute text-gray-500 top-2 right-2 hover:text-gray-700 focus:outline-none"
            >
                <!-- You can customize the close button appearance here -->
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
            <div class="flex flex-col py-5 px-7 gap-y-2">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    classes: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["close"]);
const closeButttonHandler = () => {
    emit("close");
};
</script>
