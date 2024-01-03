<template>
    <div class="mt-28">
        <BasicForm>
            <BasicCard title="FORM MUTASI">
                <div class="px-10 py-5 w-full h-full">
                    <!-- form basic -->
                    <div class="w-full h-full">
                        <div
                            class="flex w-full gap-x-2 md:flex-row flex-col pb-10"
                        >
                            <FormNIKAutocomplete
                                v-model="selectedValue"
                                :isError="isErrorNIK"
                                :error-message="[
                                    {
                                        $uid: '1',
                                        $message:
                                            'NIK Tidak Boleh Kosong / NIK Sudah Terdaftar',
                                    },
                                ]"
                            />

                            <UIButton
                                variant="form"
                                @click="addName"
                                class="mt-9"
                                >Add NIK</UIButton
                            >
                        </div>
                        <div
                            v-if="enteredNames.length > 0"
                            class="flex flex-wrap w-full my-8 gap-x-4 gap-y-4"
                        >
                            <div
                                v-for="(name, index) in enteredNames"
                                :key="index"
                                class="text-black w-[270px] p-3 rounded-2xl shadow-xl px-6 flex justify-between relative overflow-hidden"
                            >
                                {{ name?.label }}
                                <button
                                    @click="removeName(index)"
                                    class="absolute top-0 right-0 p-2 text-white bg-[#FB6255] cursor-pointer rounded-bl-full text-xs"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                        <div class="flex gap-x-7 md:flex-row flex-col">
                            <FormInputBasic
                                id="mut_date"
                                label="Tanggal Efektif Mutasi"
                                type="date"
                                v-model="values.mut_date"
                                :allowedDates="allowedDates"
                                :is-error="
                                    validations?.mut_date.$errors.length > 0
                                "
                                :error-message="validations?.mut_date.$errors"
                            />
                            <FormInputBasic
                                id="mut_reason"
                                label="Alasan Mutasi"
                                v-model="values.mut_reason"
                                :is-error="
                                    validations?.mut_reason.$errors.length > 0
                                "
                                :error-message="validations?.mut_reason.$errors"
                            />
                        </div>
                    </div>

                    <!-- form status -->
                    <FormStatusMutations
                        :statusLamaData="selectedValue.details"
                        :values="formStatusValues"
                        isGroup="true"
                    />

                    <UIDivider />

                    <!-- form upload  -->
                    <div
                        class="flex items-start justify-between md:max-w-[500px] w-full my-10"
                    >
                        <div class="flex flex-col items-start">
                            <p class="font-semibold">Lampiran</p>
                            <div
                                class="flex md:items-center items-start gap-x-5 md:flex-row flex-col"
                            >
                                <FormUploadFile
                                    v-model="files"
                                    id="upload_mut"
                                />
                                <p class="text-xs">
                                    Mohon melampirkan struktur organisasi
                                    sebelum dan sesudah
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </BasicCard>
            <div
                class="flex items-center justify-start w-full mt-5 md:gap-x-4 gap-x-2"
            >
                <UIButton
                    variant="form"
                    class="w-[200px]"
                    @click="handleClickSubmit"
                >
                    Submit
                </UIButton>
                <UIButton
                    variant="form"
                    class="w-[200px]"
                    @click="handleClickDraft"
                >
                    Simpan ke Draft
                </UIButton>
            </div>
        </BasicForm>
        <Modal
            :isLoading="isLoading"
            :isModalOpen="store.isModalOpen"
            @toggleModal="store.toggleModal"
            @submit="handleConditionalSubmit"
            modalTitle="Anda yakin untuk submit Form Mutasi berikut? "
        />

        <Modal
            v-if="showSuccessModal"
            :isModalOpen="showSuccessModal"
            @toggleModal="showSuccessModal = false"
            modalTitle="Form Mutasi Anda telah berhasil disubmit"
            modalType="success"
        />

        <Modal
            v-if="showErrorModal"
            :isModalOpen="showErrorModal"
            @toggleModal="showErrorModal = false"
            modalTitle="Form Mutasi Anda gagal disubmit"
            modalType="danger"
        />
    </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch, watchEffect } from "vue";
import BasicCard from "../../components/BasicCard.vue";
import BasicForm from "../../components/BasicForm.vue";
import FormInputBasic from "../../components/FormInputBasic.vue";
import IconMagnifier from "../../components/icons/IconMagnifying.vue";
import UIDivider from "../../components/ui/UIDivider.vue";
import UIButton from "../../components/ui/UIButton.vue";
import LabelForm from "../../components/LabelForm.vue";
import Modal from "../../components/Modal.vue";
import { useModalStore } from "../../stores/index.js";
import Dropdown from "../../components/Dropdown.vue";
import {
    formLabelTitle,
    statusBaruDefaultValues,
    statusLamaDefaultValues,
    tunjanganLabelTitle,
} from "../../data/mutations.data";
import { useRouter } from "vue-router";
import vSelect from "vue-select";
import debounce from "../../utils/debounce";
import useFetch from "../../hooks/useFetch";

import FormAutocomplete from "../../components/FormAutocomplete.vue";
import { createMutationsTable } from "../../services/mutation.services";
import FormStatusMutations from "../../components/mutations/FormStatusMutations.vue";
import FormNIKAutocomplete from "../../components/FormNIKAutocomplete.vue";
import FormUploadFile from "../../components/FormUploadFile.vue";
import { getMutationsGroupValidations } from "../../validations/mutations.validation";
import formatDateToPayload from "../../utils/formatDateToPayload";
import { allowedDates } from "../../utils/allowedDates";

const store = useModalStore();
const nama = ref("");
const enteredNames = ref([]);
const showErrorModal = ref(false);
const isDisabled = ref(true);
const router = useRouter();
const isLoading = ref(false);
const statusLama = ref(statusLamaDefaultValues);
const formStatusValues = ref({});

const values = ref({
    detail: [
        {
            nik: "",
            mutd_family_move: "",
            mutd_house_allowance: "",
            mutd_transportation: "",
            mutd_leave_bal: "",
            mutd_medical_bal: "",
            mutd_debit_amount: "",
            mutd_credit_amount: "",
            mutd_notes: "",
            allowance_now: [],
        },
    ],
    mut_date: "",
    mut_type: "Group",
    mut_reason: "",
    draft: "",
});

const validations = getMutationsGroupValidations(values);

const files = ref([]);

const selectedValue = ref({});

const isDraft = ref(false);

const showSuccessModal = ref(false);

const isErrorNIK = ref(false);

const onSubmit = async () => {
    const transformDateData = {
        ...values.value,
        mut_date: formatDateToPayload(values?.value?.mut_date),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify({ ...transformDateData }));
    formData.append("lampiran", files.value[0] || []);

    const isValid = await validations.value.$validate();
    if (!isValid) {
        store.toggleModal();
        isLoading.value = false;
    } else {
        try {
            const { data: response } = await useFetch({
                services: createMutationsTable,
                options: {
                    body: formData,
                    config: {
                        headers: {
                            Accept: "multipart/form-data",
                            "Content-Type": "multipart/form-data",
                        },
                    },
                },
            });
            if (response.value.message === "Success") {
                store.toggleModal();
                isLoading.value = false;
                showSuccessModal.value = true;
                setTimeout(() => {
                    router.push({ name: "mutasi" });
                }, 1000);
            }
        } catch (error) {
            store.toggleModal();
            showErrorModal.value = true;
            isLoading.value = false;
        }
    }
};

const handleClickSubmit = () => {
    store.toggleModal();
    isDraft.value = false;
};

const handleClickDraft = () => {
    store.toggleModal();
    isDraft.value = true;
};

const handleSubmit = () => {
    isLoading.value = true;
    values.value = { ...values.value, draft: isDraft.value };

    onSubmit();
};

const handleDraft = () => {
    isLoading.value = true;
    values.value = { ...values.value, draft: isDraft.value };

    onSubmit();
};

watchEffect(() => {
    if (selectedValue.value?.details) {
        const transformArrayValues = enteredNames.value.map((item) => {
            return {
                nik: item?.details?.nik,
                mutd_family_move: "YES",
                mutd_house_allowance: "Monthly",
                mutd_transportation: "Tunai",
                mutd_leave_bal: "0",
                mutd_medical_bal: "0",
                mutd_debit_amount: "0",
                mutd_credit_amount: "0",
                mutd_notes: "-",
                allowance_now: [],
                ...formStatusValues.value.value,
            };
        });

        values.value.detail = transformArrayValues;
    }

    if (selectedValue.value?.details?.nik) {
        isDisabled.value = false;
    } else {
        isDisabled.value = true;
    }
});

const handleConditionalSubmit = () => {
    if (isDraft.value) {
        handleDraft();
    } else {
        handleSubmit();
    }
};

const addName = () => {
    const newName = selectedValue?.value?.value?.trim();

    if (newName && !enteredNames.value.some((val) => val.value === newName)) {
        enteredNames.value.push(selectedValue?.value);
        nama.value = "";
        isErrorNIK.value = false;
    } else {
        isErrorNIK.value = true;
    }
};

const removeName = (index) => {
    enteredNames.value.splice(index, 1);
};
</script>
