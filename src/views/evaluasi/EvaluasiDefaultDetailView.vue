<template>
    <div class="flex justify-end mx-10">
        <UIButton @click="$router.back()" variant="form"> Kembali </UIButton>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import UIButton from "../../components/ui/UIButton.vue";

const router = useRouter();
</script>
