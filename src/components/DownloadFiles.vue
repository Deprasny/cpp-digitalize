<template>
    <template v-if="isLoading">
        <UILoader class="w-4 h-4" />
    </template>

    <div
        @click="handleGetFile"
        v-else
        class="cursor-pointer flex gap-2 items-center justify-center"
    >
        <div class="text-accent-1 font-semibold text-xs" v-show="label">
            {{ label }}
        </div>
        <component :is="IconDownload" class="text-accent-1" />
    </div>

    <Modal
        v-if="modelError"
        :isModalOpen="modelError"
        @toggleModal="modelError = ''"
        :modalTitle="modelError"
        modalType="danger"
    />
</template>

<script setup>
import { ref } from "vue";
import UIButton from "./ui/UIButton.vue";
import IconDownload from "@/components/icons/IconDownload.vue";
import UILoader from "./ui/UILoader.vue";
import useFetch from "../hooks/useFetch";
import Modal from "./Modal.vue";

const { services, options, fileName } = defineProps([
    "services",
    "options",
    "fileName",
    "label",
]);

const isLoading = ref(false);
const modelError = ref("");

const handleGetFile = async () => {
    isLoading.value = true;
    try {
        const { data: response, headers } = await useFetch({
            services: services,
            options: {
                ...options,

                config: {
                    responseType: "blob",
                },
            },
        });

        var fileURL = window.URL.createObjectURL(new Blob([response.value]));

        var fileLink = document.createElement("a");
        fileLink.href = fileURL;

        fileLink.setAttribute("download", `${fileName}.pdf`);

        document.body.appendChild(fileLink);
        fileLink.click();
    } catch (error) {
        console.log(error);
        modelError.value = error.message;
    } finally {
        isLoading.value = false;
    }
};
</script>
