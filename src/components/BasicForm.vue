<!-- ReusableForm.vue -->
<template>
    <form @submit.prevent="submitForm" class="w-full">
        <slot></slot>
    </form>
</template>

<script setup>
import { ref } from "vue";

const form = ref({});

const submitForm = () => {
    console.log(form.value);
};
</script>
