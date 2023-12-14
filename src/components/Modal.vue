<template>
    <Teleport to="body">
        <div
            @click.self="toggleModal"
            v-if="isModalOpen"
            class="fixed top-0 right-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-50 backdrop-blur-sm"
        >
            <div
                class="w-[450px] h-[220px] p-4 border border-accent-1 rounded-3xl flex-col flex justify-center items-center bg-white relative space-y-2"
            >
                <span
                    @click="toggleModal"
                    class="absolute flex items-center justify-center w-6 h-6 text-white rounded-full cursor-pointer -right-2 -top-1 bg-accent-1"
                >
                    X
                </span>
                <template v-if="props.isLoading === false">
                    <div v-if="props.modalType === 'danger'">
                        <IconDanger class="text-red-600 text-6xl" />
                    </div>
                    <div v-if="props.modalType === 'success'">
                        <IconCheck class="text-green-600 text-7xl" />
                    </div>

                    <p class="text-lg font-semibold text-center">
                        {{ modalTitle }}
                    </p>
                    <div
                        v-if="
                            props.modalType === 'confirmation' ||
                            props.modalType === 'danger'
                        "
                        class="flex items-center justify-center w-full gap-x-7"
                    >
                        <UIButton
                            variant="form"
                            class="w-[150px] h-[45px]"
                            @click="toggleModal"
                        >
                            <span>Kembali</span>
                        </UIButton>
                        <UIButton
                            v-if="props.modalType === 'confirmation'"
                            variant="form"
                            class="text-white bg-accent-1 w-[150px] h-[45px]"
                            @click="submit"
                        >
                            <span>Konfirmasi</span>
                        </UIButton>
                    </div>
                </template>
                <template v-else>
                    <UILoader />
                </template>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import UIButton from "./ui/UIButton.vue";
import { defineProps } from "vue";
import IconCheck from "./icons/IconCheck.vue";
import IconDanger from "./icons/IconDanger.vue";
import UILoader from "./ui/UILoader.vue";

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
    isLoading: {
        type: Boolean,
        default: false,
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
