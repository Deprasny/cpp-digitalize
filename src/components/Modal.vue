<template>
    <Teleport to="body">
        <div
            @click.self="toggleModal"
            v-if="isModalOpen"
            class="fixed top-0 right-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-50 backdrop-blur-sm"
        >
            <div
                class="w-[500px] h-[200px] p-4 gap-y-5 border border-accent-1 rounded-3xl flex-col flex justify-center items-center bg-white relative"
            >
                <span
                    @click="toggleModal"
                    class="absolute flex items-center justify-center w-6 h-6 text-white rounded-full cursor-pointer -right-2 -top-1 bg-accent-1"
                >
                    X
                </span>
                <div v-if="props.modalType === 'success'">
                    <IconCheck class="text-green-600 text-7xl" />
                </div>
                <p class="w-1/2 text-lg font-semibold text-center">
                    {{ modalTitle }}
                </p>
                <div
                    v-if="props.modalType === 'confirmation'"
                    class="flex gap-x-7"
                >
                    <UIButton
                        variant="form"
                        class="w-[170px]"
                        @click="toggleModal"
                    >
                        <span>Kembali</span>
                    </UIButton>
                    <UIButton
                        variant="form"
                        class="text-white bg-accent-1 w-[170px]"
                        @click="submit"
                    >
                        <span>Konfirmasi</span>
                    </UIButton>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import UIButton from "./ui/UIButton.vue";
import { defineProps } from "vue";
import IconCheck from "./icons/IconCheck.vue";

const props = defineProps({
    isModalOpen: {
        type: Boolean,
        default: false,
    },
    modalType: {
        type: String,
        default: "confirmation",
    },
    modalTitle: {
        type: String,
    },
});

const emit = defineEmits(["toggleModal", "submit"]);

const toggleModal = () => {
    emit("toggleModal");
};

const submit = () => {
    emit("submit");
};
</script>
