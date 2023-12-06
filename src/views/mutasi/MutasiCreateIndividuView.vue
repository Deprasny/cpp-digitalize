<template>
    <div class="mt-28">
        <BasicForm>
            <BasicCard title="FORM MUTASI">
                <div class="px-10 py-5">
                    <!-- form basic -->
                    <div class="w-[900px]">
                        <FormAutocomplete>
                            <v-select
                                :options="data"
                                class="style-chooser"
                                id="nik"
                                placeholder="Cari nama karyawan / NIK"
                                :onSearch="debounce(fetchData, 500)"
                                v-model="selectedValue"
                            >
                            </v-select>
                        </FormAutocomplete>

                        <div class="flex gap-x-7">
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
                        <div class="flex gap-x-7">
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
                        <div class="flex gap-x-7">
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
                    <div class="flex items-baseline justify-between my-10">
                        <div class="flex flex-col items-start w-1/5 gap-2">
                            <div class=""></div>
                            <div
                                v-for="list in listInfo"
                                :key="list"
                                class="w-full py-[17px] font-semibold"
                            >
                                <LabelForm :label="list" />
                            </div>
                        </div>
                        <div
                            class="flex flex-col items-center flex-1 text-center"
                        >
                            <div
                                class="w-full py-1 text-lg font-bold bg-accent-2"
                            >
                                STATUS LAMA
                            </div>
                            <div
                                v-for="status in statusLama"
                                :key="status"
                                class="w-full py-4 h-16 border border-l-0 border-black"
                                :class="status === '-' ? 'bg-gray-100' : ''"
                            >
                                {{ status }}
                            </div>
                            <div
                                class="flex justify-between w-full mt-10 bg-accent-2"
                            >
                                <div
                                    v-for="header in headerTunjangan"
                                    :key="header"
                                    class="w-full py-1 font-semibold border-black border-x"
                                >
                                    {{ header }}
                                </div>
                            </div>
                            <div
                                v-for="(_, index) in columns"
                                :key="index"
                                class="flex justify-between w-full"
                            >
                                <div
                                    class="w-full py-1 font-semibold border border-black"
                                    v-for="i in 3"
                                >
                                    <input type="text" class="max-w-[150px]" />
                                </div>
                            </div>
                            <p class="self-start mt-5 font-semibold">
                                Total : 1.000.000
                            </p>
                        </div>
                        <div
                            class="flex flex-col items-center flex-1 text-center"
                        >
                            <div
                                class="w-full py-1 text-lg font-bold text-white bg-accent-1"
                            >
                                STATUS BARU
                            </div>
                            <div
                                v-for="status in statusBaru"
                                :key="status"
                                class="w-full py-4 border border-l-0 border-black last:border-b-[2px] h-16"
                                :class="{ 'bg-gray-100': isDisabled }"
                            >
                                <template v-if="status?.type === `dropdown`">
                                    <Dropdown
                                        :dropdownOptions="status?.options"
                                        :selectedOptionText="status?.value"
                                        @update:selected-option-text="
                                            status.value = $event
                                        "
                                        :disabled="isDisabled"
                                    />
                                </template>
                                <template v-else>
                                    <input
                                        type="text"
                                        class="w-full"
                                        :placeholder="status?.label"
                                        :disabled="isDisabled"
                                        :style="{
                                            background: isDisabled
                                                ? 'transparent'
                                                : '',
                                        }"
                                        :value="status?.value"
                                        @input="
                                            status.value = $event.target.value
                                        "
                                    />
                                </template>
                            </div>

                            <div
                                class="flex justify-between w-full mt-10 bg-accent-1"
                            >
                                <div
                                    v-for="header in headerTunjangan"
                                    :key="header"
                                    class="w-full py-1 font-semibold text-white border-black border-x"
                                >
                                    {{ header }}
                                </div>
                            </div>

                            <div
                                v-for="(item, index) in columns"
                                :key="index"
                                class="flex justify-between w-full"
                            >
                                <div
                                    class="w-full py-1 font-semibold border border-black"
                                    v-for="i in columnsData"
                                >
                                    <input
                                        :type="i.type"
                                        class="max-w-[150px]"
                                        :value="columnsValue[index][i.property]"
                                        @input="
                                            columnsValue[index][i.property] =
                                                $event.target.value
                                        "
                                    />
                                </div>
                                <div class="relative">
                                    <div
                                        v-if="index === columns - 1"
                                        class="absolute top-2 -right-7"
                                    >
                                        <button
                                            v-if="columns < 7"
                                            @click="addColumn"
                                        >
                                            <div
                                                class="p-1 bg-red-600 rounded-full"
                                            >
                                                <component
                                                    :is="IconPlus"
                                                    class="text-xs text-white"
                                                />
                                            </div>
                                        </button>
                                    </div>
                                    <div
                                        v-if="index === columns - 2"
                                        class="absolute top-1 -right-5"
                                    >
                                        <button @click="removeColumn">-</button>
                                    </div>
                                </div>
                            </div>
                            <p class="self-start mt-5 font-semibold">
                                Total : 1.000.000
                            </p>
                        </div>
                    </div>

                    <UIDivider />

                    <!-- form radio  -->
                    <div class="flex items-start justify-between w-full my-10">
                        <div class="flex flex-col items-start">
                            <p class="font-semibold">Keluarga</p>
                            <p class="mb-3 text-xs italic">
                                (Pilih salah satu)
                            </p>
                            <div class="flex gap-x-2">
                                <input
                                    type="radio"
                                    name="keluarga"
                                    value="YES"
                                    v-model="values.mutd_family_move"
                                />
                                <p>Ikut pindah kelokasi kerja baru</p>
                            </div>
                            <div class="flex gap-x-2">
                                <input
                                    type="radio"
                                    name="keluarga"
                                    value="NO"
                                    v-model="values.mutd_family_move"
                                />
                                <p>Tidak Ikut pindah kelokasi kerja baru</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-start">
                            <p class="font-semibold">Tunj. Perumahan</p>
                            <p class="mb-3 text-xs italic">
                                (Pilih salah satu)
                            </p>
                            <div class="flex gap-x-2">
                                <input
                                    type="radio"
                                    name="tunjangan"
                                    value="Monthly"
                                    v-model="values.mutd_house_allowance"
                                />
                                <p>Diambil Bulanan</p>
                            </div>
                            <div class="flex gap-x-2">
                                <input
                                    type="radio"
                                    name="tunjangan"
                                    value="Yearly"
                                    v-model="values.mutd_house_allowance"
                                />
                                <p>Diambil per 1 Tahun</p>
                            </div>
                            <div class="flex gap-x-2">
                                <input
                                    type="radio"
                                    name="tunjangan"
                                    value="2 Years"
                                    v-model="values.mutd_house_allowance"
                                />
                                <p>Diambil per 2 Tahun</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-start">
                            <p class="font-semibold">Transportasi Barang</p>
                            <p class="mb-3 text-xs italic">
                                (Pilih salah satu)
                            </p>
                            <div class="flex gap-x-2">
                                <input
                                    type="radio"
                                    name="barang"
                                    value="Tunai"
                                    v-model="values.mutd_transportation"
                                />
                                <p>Ambil Tunai</p>
                            </div>
                            <div class="flex gap-x-2">
                                <input
                                    type="radio"
                                    name="barang"
                                    value="Perusahaan"
                                    v-model="values.mutd_transportation"
                                />
                                <p>Difasilitasi Perusahaan</p>
                            </div>
                        </div>
                    </div>

                    <UIDivider />

                    <!-- form additional -->
                    <div class="w-[900px] my-10">
                        <div class="flex gap-x-7">
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
                        <div class="flex gap-x-7">
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
                        class="flex items-start justify-between max-w-[500px] my-10"
                    >
                        <div class="flex flex-col items-start">
                            <p class="font-semibold">Lampiran</p>
                            <div class="flex items-center gap-x-5">
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
            <div class="flex items-center justify-start w-full mt-5 gap-x-4">
                <UIButton
                    variant="form"
                    class="w-[200px]"
                    @click="store.toggleModal()"
                >
                    Submit
                </UIButton>
                <UIButton variant="form" class="w-[200px]">
                    Simpan ke Draft
                </UIButton>
            </div>
        </BasicForm>
        <Modal
            :isModalOpen="store.isModalOpen"
            @toggleModal="store.toggleModal"
            @submit="handleSubmit"
            modalTitle="Anda yakin untuk submit Form Mutasi berikut? "
        />

        <Modal
            v-if="showSuccessModal"
            :isModalOpen="showSuccessModal"
            @toggleModal="showSuccessModal = false"
            modalTitle="Form Mutasi Anda telah berhasil disubmit"
            modalType="success"
        />
    </div>
</template>
<script setup>
import { onBeforeMount, onMounted, ref, watch, watchEffect } from "vue";
import BasicCard from "../../components/BasicCard.vue";
import BasicForm from "../../components/BasicForm.vue";
import FormInputBasic from "../../components/FormInputBasic.vue";

import IconPlus from "../../components/icons/IconPlus.vue";
import UIDivider from "../../components/ui/UIDivider.vue";
import UIButton from "../../components/ui/UIButton.vue";
import LabelForm from "../../components/LabelForm.vue";
import Modal from "../../components/Modal.vue";
import { useModalStore } from "../../stores/index.js";
import Dropdown from "../../components/Dropdown.vue";
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

import useFormWatch from "../../hooks/useFormWatch";

import {
    formLabelTitle,
    statusLamaDefaultValues,
    statusBaruDefaultValues,
    tunjanganLabelTitle,
    columnTunjanganDefaultValues,
    columnTunjanganValues,
} from "../../data/mutations.data";

const store = useModalStore();
const showSuccessModal = ref(false);
const headerTunjangan = ref(tunjanganLabelTitle);
const listInfo = ref(formLabelTitle);
const statusBaru = ref(statusBaruDefaultValues);
const statusLama = ref(statusLamaDefaultValues);
const isDisabled = ref(true);
const props = defineProps(["modelValue"]);

const columns = ref(1);

const addColumn = () => {
    columns.value++;
    columnsValue.value.push({
        muta_type: "",
        muta_allow_amount: "",
        muta_allow_grossnet: "",
        muta_allow_code: "TRANS",
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

const data = ref([]);

const onSubmit = async () => {
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
                        mutd_house_allowance: values.value.mutd_house_allowance,
                        mutd_transportation: values.value.mutd_transportation,
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
};

const handleSubmit = () => {
    store.toggleModal();
    // showSuccessModal.value = true;

    values.value = { ...values.value, draft: false };

    onSubmit();
};

const fetchData = async (searchValue) => {
    const { data: response } = await useFetch({
        services: getEmployeeByUser,
        options: {
            page: 1,
            limit: 10,
            cari: searchValue,
        },
    });

    data.value = response?.value.map((item) => {
        return {
            label: `${item?.nik} - ${item?.nama}`,
            value: item?.nik,
            details: item,
        };
    });
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
                bu: statusBaru.value[3].value,
            },
        },
    });

    const { data: immdieateManagerResponse } = await useFetch({
        services: getImmediateManager,
        options: {
            params: {
                bu: statusBaru.value[3].value,
            },
        },
    });

    statusBaru.value[6].options = directSpvResponse?.value.map((item) => {
        return `${item?.nik} - ${item?.nama}`;
    });

    statusBaru.value[7].options = immdieateManagerResponse?.value.map(
        (item) => {
            return `${item?.nik} - ${item?.nama}`;
        }
    );
};

onMounted(() => {
    fetchData();
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
        values.value.allowance_now = columnsValue.value;
    }
});

watch(
    () => statusBaru.value[0].value,
    (newValue) => {
        if (newValue) {
            values.value.mutd_to_company = newValue;
        }
    }
);

watch(
    () => statusBaru.value[1].value,
    (newValue) => {
        if (newValue) {
            values.value.mutd_to_position = newValue;
        }
    }
);

watch(
    () => statusBaru.value[3].value,
    (newValue) => {
        if (newValue) {
            fetchAutoFillFormParams();
            values.value.mutd_to_division = newValue;
        }
    }
);

watch(
    () => statusBaru.value[4].value,
    (newValue) => {
        if (newValue) {
            values.value.mutd_to_costcenter = newValue;
        }
    }
);

watch(
    () => statusBaru.value[5].value,
    (newValue) => {
        if (newValue) {
            values.value.mutd_to_work_location = newValue;
        }
    }
);

watch(
    () => statusBaru.value[6].value,
    (newValue) => {
        if (newValue) {
            values.value.mutd_to_direct_spv = newValue;
        }
    }
);

watch(
    () => statusBaru.value[7].value,
    (newValue) => {
        if (newValue) {
            values.value.mutd_to_immed_mgr = newValue;
        }
    }
);
</script>
