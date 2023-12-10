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
                                v-model="autofillForm.joindate"
                                disabled
                            />
                            <FormInputBasic
                                label="Home Base"
                                v-model="autofillForm.homebase"
                                disabled
                                placeholder="-"
                            />
                        </div>
                        <div class="flex flex-col gap-x-7 md:flex-row">
                            <FormInputBasic
                                label="Tanggal Lahir"
                                :type="
                                    autofillForm.birth_date === null
                                        ? `text`
                                        : `date`
                                "
                                v-model="autofillForm.birth_date"
                                placeholder="-"
                                disabled
                            />

                            <FormInputBasic
                                label="Pendidikan"
                                v-model="autofillForm.education"
                                disabled
                                placeholder="-"
                            />
                        </div>
                        <div class="flex flex-col gap-x-7 md:flex-row">
                            <FormInputBasic
                                label="Tanggal Efektif Mutasi"
                                type="date"
                                :disabled="isDisabled"
                            />
                            <FormInputBasic
                                label="Alasan Mutasi"
                                v-model="values.mut_reason"
                                placeholder="Masukan Alasan Mutasi"
                                :disabled="isDisabled"
                            />
                        </div>
                    </div>

                    <!-- form status -->
                    <FormStatusMutations
                        :listInfo="listInfo"
                        :statusLama="statusLama"
                        :statusBaru="statusBaru"
                        :headerTunjangan="headerTunjangan"
                        :columns="columns"
                        :columnsData="columnsData"
                        :columnsValue="columnsValue"
                        :totalTunjangan="totalTunjangan"
                        :addColumn="addColumn"
                        :removeColumn="removeColumn"
                    />

                    <UIDivider />

                    <!-- form radio  -->
                    <div
                        class="flex flex-col items-start justify-between w-full gap-6 my-10 md:flex-row md:gap-0"
                    >
                        <FormRadio
                            label="Keluarga"
                            name="keluarga"
                            :options="keluargaOptions"
                            :modelValue="values.mutd_family_move"
                            @update:modelValue="
                                (value) => (values.mutd_family_move = value)
                            "
                        />

                        <FormRadio
                            label="Tunj. Perumahan"
                            name="tunjangan"
                            :options="tunjanganOptions"
                            :modelValue="values.mutd_house_allowance"
                            @update:modelValue="
                                (value) => (values.mutd_house_allowance = value)
                            "
                        />

                        <FormRadio
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
                                label="Sisa Cuti"
                                type="number"
                                v-model="values.mutd_leave_bal"
                            />
                            <FormInputBasic
                                label="Sisa Plafon Berobat"
                                type="number"
                                v-model="values.mutd_medical_bal"
                            />
                        </div>
                        <div class="flex flex-col gap-x-7 md:flex-row">
                            <FormInputBasic
                                label="Hak Karyawan Belum Terbayar"
                                type="number"
                                v-model="values.mutd_debit_amount"
                            />
                            <FormInputBasic
                                label="Hutang ke Perusahaan"
                                type="number"
                                v-model="values.mutd_credit_amount"
                            />
                        </div>
                        <FormInputBasic
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
                                <UIButton
                                    variant="form"
                                    class="w-[200px]"
                                    type="file"
                                >
                                    Upload File
                                </UIButton>
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
import { onBeforeMount, onMounted, ref, watch, watchEffect } from "vue";
import BasicCard from "../../components/BasicCard.vue";
import BasicForm from "../../components/BasicForm.vue";
import FormInputBasic from "../../components/FormInputBasic.vue";
import UILoader from "../../components/ui/UILoader.vue";

import UIDivider from "../../components/ui/UIDivider.vue";
import UIButton from "../../components/ui/UIButton.vue";
import LabelForm from "../../components/LabelForm.vue";
import Modal from "../../components/Modal.vue";
import { useModalStore } from "../../stores/index.js";

import FormAutocomplete from "../../components/FormAutocomplete.vue";
import vSelect from "vue-select";
import useFetch from "../../hooks/useFetch";
import {
    getDirectSpv,
    getEmployeeByUser,
    getImmediateManager,
} from "../../services/form.services";
import { createMutationsTable } from "../../services/mutation.services";
import debounce from "../../utils/debounce";

import useFormAutoFill from "../../hooks/useFormAutoFill";

import {
    formLabelTitle,
    statusLamaDefaultValues,
    statusBaruDefaultValues,
    tunjanganLabelTitle,
    columnTunjanganDefaultValues,
    columnTunjanganValues,
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

const store = useModalStore();
const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const headerTunjangan = ref(tunjanganLabelTitle);
const listInfo = ref(formLabelTitle);
const statusBaru = ref(statusBaruDefaultValues);
const statusLama = ref(statusLamaDefaultValues);
const isDisabled = ref(true);
const props = defineProps(["modelValue"]);
const router = useRouter();
const totalTunjangan = ref(0);

const isLoading = ref(false);

const columns = ref(1);

const addColumn = () => {
    columns.value++;
    columnsValue.value.push({
        muta_type: "NEW",
        muta_allow_amount: "",
        muta_allow_grossnet: "",
        muta_allow_code: "",
    });
};

const removeColumn = () => {
    columns.value--;
    columnsValue.value.pop();
};

const columnsData = ref(columnTunjanganDefaultValues);

const columnsValue = ref([columnTunjanganValues]);

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
    allowance_now: "",
});

const autofillForm = ref({
    joindate: "",
    homebase: "",
    birth_date: "",
    education: "",
});

const selectedValue = ref({});

const isDraft = ref(false);

const data = ref([]);

const onSubmit = async () => {
    try {
        const { data: response } = await useFetch({
            services: createMutationsTable,
            options: {
                body: {
                    detail: [
                        {
                            nik: values.value.nik,
                            mutd_to_company: values.value.mutd_to_company,
                            mutd_to_position: values.value.mutd_to_position,
                            mutd_to_division: values.value.mutd_to_division,
                            mutd_to_costcenter: values.value.mutd_to_costcenter,
                            mutd_to_work_location:
                                values.value.mutd_to_work_location,
                            mutd_to_direct_spv: values.value.mutd_to_direct_spv,
                            mutd_to_immed_mgr: values.value.mutd_to_immed_mgr,
                            mutd_family_move: values.value.mutd_family_move,
                            mutd_house_allowance:
                                values.value.mutd_house_allowance,
                            mutd_transportation:
                                values.value.mutd_transportation,
                            mutd_leave_bal: values.value.mutd_leave_bal,
                            mutd_medical_bal: values.value.mutd_medical_bal,
                            mutd_debit_amount: values.value.mutd_debit_amount,
                            mutd_credit_amount: values.value.mutd_credit_amount,
                            mutd_notes: values.value.mutd_notes,
                            allowance_now: values.value.allowance_now,
                        },
                    ],

                    mut_type: values.value.mut_type,
                    mut_reason: values.value.mut_reason,
                    draft: values.value.draft,
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

const fetchAutoFillForms = async () => {
    const {
        businessUnitValues,
        companyValues,
        costCenterValues,
        positionValues,
        workLocationValues,
    } = await useFormAutoFill();

    statusBaru.value[0].options = companyValues;
    statusBaru.value[1].options = positionValues;
    statusBaru.value[3].options = businessUnitValues;
    statusBaru.value[4].options = costCenterValues;
    statusBaru.value[5].options = workLocationValues;
};

const fetchAutoFillFormParams = async () => {
    const { data: directSpvResponse } = await useFetch({
        services: getDirectSpv,
        options: {
            params: {
                bu: statusBaru.value[3].value?.value,
            },
        },
    });

    const { data: immdieateManagerResponse } = await useFetch({
        services: getImmediateManager,
        options: {
            params: {
                bu: statusBaru.value[3].value?.value,
            },
        },
    });

    statusBaru.value[6].options = directSpvResponse?.value.map((item) => {
        return {
            label: `${item?.nik} - ${item?.nama}`,
            value: item?.nik,
        };
    });

    statusBaru.value[7].options = immdieateManagerResponse?.value.map(
        (item) => {
            return {
                label: `${item?.nik} - ${item?.nama}`,
                value: item?.nik,
            };
        }
    );
};

onMounted(() => {
    fetchAutoFillForms();
});

watchEffect(() => {
    if (selectedValue.value?.details) {
        autofillForm.value.joindate = selectedValue.value?.details?.joindate;
        autofillForm.value.homebase = selectedValue.value?.details?.homebase;
        autofillForm.value.birth_date =
            selectedValue.value?.details?.birth_date;
        autofillForm.value.education = selectedValue.value?.details?.education;

        values.value.nik = selectedValue.value?.details?.nik;

        statusLama.value = [
            selectedValue.value?.details?.persarea,
            selectedValue.value?.details?.posisi,
            selectedValue?.value?.details?.level,
            selectedValue.value?.details?.busunit,
            selectedValue.value?.details?.costcenter,
            selectedValue.value?.details?.office,
            selectedValue.value?.details?.empl_nik_spv,
            selectedValue.value?.details?.immedmgr,
        ];
    }

    if (selectedValue.value?.details?.nik) {
        isDisabled.value = false;
    } else {
        isDisabled.value = true;
    }

    if (columnsValue.value.length) {
        totalTunjangan.value = columnsValue.value.reduce(
            (acc, curr) => acc + Number(curr.muta_allow_amount),
            0
        );
        values.value.allowance_now = columnsValue.value;
    }
});

const handleConditionalSubmit = () => {
    if (isDraft.value) {
        handleDraft();
    } else {
        handleSubmit();
    }
};

watch(
    () => statusBaru.value[0].value,
    (newValue) => {
        if (newValue) {
            values.value.mutd_to_company = newValue?.value;
        }
    }
);

watch(
    () => statusBaru.value[1].value,
    (newValue) => {
        if (newValue) {
            values.value.mutd_to_position = newValue?.value;
        }
    }
);

watch(
    () => statusBaru.value[3].value,
    (newValue) => {
        if (newValue) {
            fetchAutoFillFormParams();
            values.value.mutd_to_division = newValue?.value;
        }
    }
);

watch(
    () => statusBaru.value[4].value,
    (newValue) => {
        if (newValue) {
            values.value.mutd_to_costcenter = newValue?.value;
        }
    }
);

watch(
    () => statusBaru.value[5].value,
    (newValue) => {
        if (newValue) {
            values.value.mutd_to_work_location = newValue?.value;
        }
    }
);

watch(
    () => statusBaru.value[6].value,
    (newValue) => {
        if (newValue) {
            values.value.mutd_to_direct_spv = newValue?.value;
        }
    }
);

watch(
    () => statusBaru.value[7].value,
    (newValue) => {
        if (newValue) {
            values.value.mutd_to_immed_mgr = newValue?.value;
        }
    }
);
</script>
