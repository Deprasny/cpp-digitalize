<template>
    <div class="mt-28">
        <BasicForm>
            <BasicCard title="FORM MUTASI">
                <div class="w-full px-10 py-5">
                    <!-- form basic -->
                    <div class="w-full">
                        <FormNIKAutocomplete v-model="selectedValue" />

                        <div class="flex flex-col gap-x-7 md:flex-row">
                            <FormInputBasic
                                label="Tanggal Masuk"
                                type="date"
                                id="join_date"
                                :modelValue="selectedValue?.details?.joindate"
                                disabled
                            />
                            <FormInputBasic
                                label="Home Base"
                                id="homebase"
                                :modelValue="selectedValue?.details?.homebase"
                                disabled
                                placeholder="-"
                            />
                        </div>
                        <div class="flex flex-col gap-x-7 md:flex-row">
                            <FormInputBasic
                                id="birth_date"
                                label="Tanggal Lahir"
                                :type="
                                    selectedValue?.details?.birth_date === null
                                        ? `text`
                                        : `date`
                                "
                                :modelValue="selectedValue?.details?.birth_date"
                                placeholder="-"
                                disabled
                            />

                            <FormInputBasic
                                id="education"
                                label="Pendidikan"
                                :modelValue="selectedValue.details?.education"
                                disabled
                                placeholder="-"
                            />
                        </div>
                        <div class="flex flex-col gap-x-7 md:flex-row">
                            <FormInputBasic
                                label="Tanggal Efektif Mutasi"
                                type="date"
                                id="mut_date"
                                v-model="values.mut_date"
                                :disabled="isDisabled"
                                :allowed-dates="allowedDates"
                            />

                            <FormInputBasic
                                id="mut_reason"
                                label="Alasan Mutasi"
                                v-model="values.mut_reason"
                                placeholder="Masukan Alasan Mutasi"
                                :disabled="isDisabled"
                            />
                        </div>
                    </div>

                    <!-- form status -->
                    <FormStatusMutations
                        id="status"
                        :values="formStatusValues"
                        :statusLamaData="selectedValue?.details"
                        is-show-jabatan="true"
                        :selected-nik="selectedValue?.details"
                    />

                    <UIDivider />

                    <div
                        class="flex flex-col items-start justify-between w-full gap-6 my-10 md:flex-row md:gap-0"
                    >
                        <FormRadio
                            id="mut_type"
                            label="Keluarga"
                            name="keluarga"
                            :options="keluargaOptions"
                            :modelValue="values.mutd_family_move"
                            @update:modelValue="
                                (value) => (values.mutd_family_move = value)
                            "
                        />

                        <FormRadio
                            id="tunjangan_perumahan"
                            label="Tunj. Perumahan"
                            name="tunjangan"
                            :options="tunjanganOptions"
                            :modelValue="values.mutd_house_allowance"
                            @update:modelValue="
                                (value) => (values.mutd_house_allowance = value)
                            "
                        />

                        <FormRadio
                            id="tunjangan_transportasi"
                            label="Transportasi Barang"
                            name="barang"
                            :options="barangOptions"
                            :modelValue="values.mutd_transportation"
                            @update:modelValue="
                                (value) => (values.mutd_transportation = value)
                            "
                        />
                    </div>

                    <UIDivider />

                    <!-- form additional -->
                    <div class="w-full my-10">
                        <div class="flex flex-col gap-x-7 md:flex-row">
                            <FormInputBasic
                                id="mutd_leave_bal"
                                label="Sisa Cuti"
                                type="number"
                                v-model="values.mutd_leave_bal"
                            />
                            <FormInputBasic
                                id="mutd_medical_bal"
                                label="Sisa Plafon Berobat"
                                type="number"
                                v-model="values.mutd_medical_bal"
                            />
                        </div>
                        <div class="flex flex-col gap-x-7 md:flex-row">
                            <FormInputBasic
                                id="mutd_debit_amount"
                                label="Hak Karyawan Belum Terbayar"
                                type="number"
                                v-model="values.mutd_debit_amount"
                            />
                            <FormInputBasic
                                id="mutd_credit_amount"
                                label="Hutang ke Perusahaan"
                                type="number"
                                v-model="values.mutd_credit_amount"
                            />
                        </div>
                        <FormInputBasic
                            id="mutd_notes"
                            label="Keterangan"
                            v-model="values.mutd_notes"
                        />
                    </div>

                    <UIDivider />

                    <!-- form upload  -->
                    <div
                        class="flex items-start justify-between md:max-w-[500px] my-10 w-full"
                    >
                        <div class="flex flex-col items-start">
                            <p class="font-semibold">Lampiran</p>
                            <div
                                class="flex flex-col items-start md:items-center gap-x-5 md:flex-row"
                            >
                                <FormUploadFile v-model="values.files" />

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
            :isModalOpen="store.isModalOpen"
            @toggleModal="store.toggleModal"
            @submit="handleConditionalSubmit"
            modalTitle="Anda yakin untuk submit Form Mutasi berikut?"
            :isLoading="isLoading"
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
import { computed, ref, watch, watchEffect } from "vue";
import BasicCard from "../../components/BasicCard.vue";
import BasicForm from "../../components/BasicForm.vue";
import FormInputBasic from "../../components/FormInputBasic.vue";

import UIDivider from "../../components/ui/UIDivider.vue";
import UIButton from "../../components/ui/UIButton.vue";

import Modal from "../../components/Modal.vue";
import { useModalStore } from "../../stores/index.js";

import useFetch from "../../hooks/useFetch";

import { createMutationsTable } from "../../services/mutation.services";
import debounce from "../../utils/debounce";

import {
    statusLamaDefaultValues,
    tunjanganLabelTitle,
} from "../../data/mutations.data";
import { useRouter } from "vue-router";
import FormStatusMutations from "../../components/mutations/FormStatusMutations.vue";
import FormRadio from "../../components/FormRadio.vue";
import {
    barangOptions,
    keluargaOptions,
    tunjanganOptions,
} from "../../data/mutations.data";
import FormNIKAutocomplete from "../../components/FormNIKAutocomplete.vue";
import FormUploadFile from "../../components/FormUploadFile.vue";
import formatDateToPayload from "../../utils/formatDateToPayload";
import { allowedDates } from "../../utils/allowedDates";

const store = useModalStore();
const showSuccessModal = ref(false);
const showErrorModal = ref(false);

const isDisabled = ref(true);
const props = defineProps(["modelValue"]);
const router = useRouter();
const formStatusValues = ref({});

const isLoading = ref(false);

const values = ref({
    nik: null,
    mut_type: "Individu",
    mut_reason: "",
    mutd_to_company: "",
    mutd_to_position: "",
    mutd_to_division: "",
    mutd_to_costcenter: "",
    mutd_to_work_location: "",
    mutd_to_direct_spv: "",
    mutd_to_immed_mgr: "",
    mutd_family_move: "",
    mutd_house_allowance: "",
    mutd_transportation: "",
    mutd_leave_bal: "",
    mutd_medical_bal: "",
    mutd_debit_amount: "",
    mutd_credit_amount: "",
    mutd_notes: "",
    allowance_now: [],
    mut_date: "",
    files: [],
});

const selectedValue = ref({});

const isDraft = ref(false);

const onSubmit = async () => {
    const transformValues = {
        data: {
            detail: [
                {
                    nik: values.value.nik,
                    mutd_family_move: values.value.mutd_family_move,
                    mutd_house_allowance: values.value.mutd_house_allowance,
                    mutd_transportation: values.value.mutd_transportation,
                    mutd_leave_bal: values.value.mutd_leave_bal,
                    mutd_medical_bal: values.value.mutd_medical_bal,
                    mutd_debit_amount: values.value.mutd_debit_amount,
                    mutd_credit_amount: values.value.mutd_credit_amount,
                    mutd_notes: values.value.mutd_notes,
                    allowance_now: [],
                    ...formStatusValues.value?.value,
                },
            ],
            mut_date: formatDateToPayload(values?.value.mut_date),
            mut_type: values.value.mut_type,
            mut_reason: values.value.mut_reason,
            draft: values.value.draft,
        },
        lampiran: values.value.files[0],
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(transformValues.data));
    formData.append("lampiran", transformValues.lampiran || []);

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
            isLoading.value = false;
            showSuccessModal.value = true;
            store.toggleModal();
            setTimeout(() => {
                router.push({ name: "mutasi" });
            }, 1000);
        }
    } catch (error) {
        store.toggleModal();
        showErrorModal.value = true;
        isLoading.value = false;
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
    console.log({ formStatusValues: formStatusValues.value?.value });

    if (selectedValue.value?.details) {
        values.value.nik = selectedValue.value?.details?.nik;
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
</script>
