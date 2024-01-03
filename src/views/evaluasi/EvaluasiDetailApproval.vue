<template>
    <div class="flex justify-between w-full px-10">
        <UIButton
            @click="handleSubmit({ statusApprovalValue: 'Y' })"
            variant="approve"
        >
            Approve
        </UIButton>
        <UIButton
            variant="danger"
            @click="handleSubmit({ statusApprovalValue: 'N' })"
        >
            Reject
        </UIButton>
    </div>
    <Modal
        :isModalOpen="store.isModalOpen"
        @toggleModal="store.toggleModal"
        @submit="onSubmit"
        modalTitle="Anda yakin untuk melakukan proses berikut?"
    />

    <Modal
        v-if="showSuccessModal"
        :isModalOpen="showSuccessModal"
        @toggleModal="showSuccessModal = false"
        modalTitle="Form Evaluasi Anda telah berhasil disubmit"
        modalType="success"
    />

    <Modal
        v-if="showErrorModal"
        :isModalOpen="showErrorModal"
        @toggleModal="
            () => {
                showErrorModal = false;
            }
        "
        :modalTitle="errorMessage"
        modalType="danger"
    />
</template>

<script setup>
import { ref, watchEffect } from "vue";
import Modal from "../../components/Modal.vue";
import UIButton from "../../components/ui/UIButton.vue";
import { useModalStore } from "../../stores/index.js";
import usePutProbations from "../../hooks/evaluasi/usePutProbations";

const store = useModalStore();
const showSuccessModal = ref(false);
const showErrorModal = ref(false);

const values = ref({
    statusApproval: "",
});

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

const { mutate, errorMessage } = usePutProbations({
    id: props.data?.id,
    body: {
        ...values.value,
    },
    onSuccess: () => {
        store.toggleModal();
        showSuccessModal.value = true;
    },

    onError: () => {
        store.toggleModal();
        showErrorModal.value = true;
    },
});

const handleSubmit = ({ statusApprovalValue }) => {
    store.toggleModal();
    values.value.statusApproval = statusApprovalValue;
};

const onSubmit = () => {
    if (values.value.statusApproval) mutate();
};
</script>
