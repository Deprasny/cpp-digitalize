<template>
    <div class="mt-28">
        <BasicForm>
            <BasicCard title="FORM MUTASI">
                <div class="px-10 py-5 w-full">
                    <!-- form basic -->
                    <div class="w-full">
                        <div class="flex w-full gap-x-2 md:flex-row flex-col">
                            <FormNIKAutocomplete v-model="selectedValue" />

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
                                label="Tanggal Efektif Mutasi"
                                type="date"
                            />
                            <FormInputBasic
                                label="Alasan Mutasi"
                                v-model="values.mut_reason"
                            />
                        </div>
                    </div>

                    <!-- form status -->
                    <FormStatusMutations
                        :listInfo="listInfo"
                        :statusLama="statusLama"
                        :statusBaru="statusBaru"
                        :headerTunjangan="headerTunjangan"
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
import { onMounted, ref, watch, watchEffect } from "vue";
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
import useFormAutoFill from "../../hooks/useFormAutoFill";
import {
    getDirectSpv,
    getEmployeeByUser,
    getImmediateManager,
} from "../../services/form.services";
import FormAutocomplete from "../../components/FormAutocomplete.vue";
import { createMutationsTable } from "../../services/mutation.services";
import FormStatusMutations from "../../components/mutations/FormStatusMutations.vue";
import FormNIKAutocomplete from "../../components/FormNIKAutocomplete.vue";

const store = useModalStore();
const nama = ref("");
const enteredNames = ref([]);
const showErrorModal = ref(false);
const isDisabled = ref(true);
const router = useRouter();
const isLoading = ref(false);
const listInfo = ref(formLabelTitle);
const statusLama = ref(statusLamaDefaultValues);
const statusBaru = ref(statusBaruDefaultValues);

const values = ref({
    detail: [
        {
            nik: "",
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
        },
    ],

    mut_type: "Group",
    mut_reason: "",
    draft: "",
});

const selectedValue = ref({});

const isDraft = ref(false);

const showSuccessModal = ref(false);
const data = ref([]);

const onSubmit = async () => {
    try {
        const { data: response } = await useFetch({
            services: createMutationsTable,
            options: {
                body: { ...values.value },
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

        const transformArrayValues = enteredNames.value.map((item) => {
            return {
                nik: item?.details?.nik,
                mutd_to_company: statusBaru.value[0].value?.value,
                mutd_to_position: statusBaru.value[1].value?.value,
                mutd_to_division: statusBaru.value[3].value?.value,
                mutd_to_costcenter: statusBaru.value[4].value?.value,
                mutd_to_work_location: statusBaru.value[5].value?.value,
                mutd_to_direct_spv: statusBaru.value[6].value?.value,
                mutd_to_immed_mgr: statusBaru.value[7].value?.value,
                mutd_family_move: "YES",
                mutd_house_allowance: "Monthly",
                mutd_transportation: "Tunai",
                mutd_leave_bal: "0",
                mutd_medical_bal: "0",
                mutd_debit_amount: "0",
                mutd_credit_amount: "0",
                mutd_notes: "-",
                allowance_now: [],
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

watch(
    () => statusBaru.value[3].value,
    (newValue) => {
        if (newValue) {
            fetchAutoFillFormParams();
        }
    }
);

const addName = () => {
    enteredNames.value.push(selectedValue.value);
    nama.value = "";
};

const removeName = (index) => {
    enteredNames.value.splice(index, 1);
};
</script>
