<template>
    <div class="flex items-center justify-center">
        <svg
            width="24"
            height="24"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            class="w-10 h-10 animate-spin text-accent-1"
            :class="class"
        >
            <path
                d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"
            ></path>
        </svg>
    </div>
</template>

<script setup>
const props = defineProps({
    class: {
        type: String,
        default: "",
    },
});
</script>
