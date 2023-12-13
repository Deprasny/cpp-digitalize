<template>
    <div class="overflow-x-auto h-full w-full">
        <div class="flex my-10 w-[900px]">
            <div class="flex flex-col items-center text-center flex-1 w-48">
                <div class="w-full h-10"></div>
                <FormStatusInfo>
                    <LabelForm :label="formLabelTitle.Perusahaan" />
                </FormStatusInfo>
                <FormStatusInfo>
                    <LabelForm :label="formLabelTitle.Jabatan" />
                </FormStatusInfo>
                <FormStatusInfo>
                    <LabelForm :label="formLabelTitle.KelasJabatan" />
                </FormStatusInfo>
                <FormStatusInfo>
                    <LabelForm :label="formLabelTitle.BussinessUnits" />
                </FormStatusInfo>
                <FormStatusInfo>
                    <LabelForm :label="formLabelTitle.CostCenter" />
                </FormStatusInfo>
                <FormStatusInfo>
                    <LabelForm :label="formLabelTitle.LokasiKerja" />
                </FormStatusInfo>
                <FormStatusInfo>
                    <LabelForm :label="formLabelTitle.MelaporKe" />
                </FormStatusInfo>
                <FormStatusInfo>
                    <LabelForm :label="formLabelTitle.ImmediateManager" />
                </FormStatusInfo>

                <FormStatusInfo
                    v-if="formType === 'detail' && !isShowTunjangan"
                >
                    <LabelForm :label="formLabelTitle.Tunjangan" />
                </FormStatusInfo>
            </div>
            <div
                class="flex flex-col items-center text-center flex-1 w-[450px]"
            >
                <div class="w-[450px] py-1 text-lg font-bold bg-accent-2">
                    STATUS LAMA
                </div>
                <FormStatusLamaItem>
                    {{ statusLamaData?.persarea || detailData?.companyFr }}
                </FormStatusLamaItem>

                <FormStatusLamaItem>
                    {{ statusLamaData?.posisi || detailData?.positionFr }}
                </FormStatusLamaItem>

                <FormStatusLamaItem>
                    {{ statusLamaData?.level || detailData?.levelFr }}
                </FormStatusLamaItem>

                <FormStatusLamaItem>
                    {{ statusLamaData?.busunit || detailData?.buFr }}
                </FormStatusLamaItem>

                <FormStatusLamaItem>
                    {{ statusLamaData?.costcenter || detailData?.ccFr }}
                </FormStatusLamaItem>

                <FormStatusLamaItem>
                    {{ statusLamaData?.office || detailData?.locFr }}
                </FormStatusLamaItem>

                <FormStatusLamaItem>
                    {{ statusLamaData?.empl_nik_spv || detailData?.spvFr }}
                </FormStatusLamaItem>

                <FormStatusLamaItem>
                    {{ statusLamaData?.immedmgr || detailData?.mgrFr }}
                </FormStatusLamaItem>

                <FormStatusLamaItem
                    v-if="formType === 'detail' && !isShowTunjangan"
                    class="h-40"
                >
                    <FormItemTunjanganDetail :data="statusLamaTunjangan" />
                </FormStatusLamaItem>

                <template v-if="isShowTunjangan">
                    <div class="flex justify-between w-full mt-10 bg-accent-2">
                        <div
                            v-for="header in headerTunjangan"
                            :key="header"
                            class="w-full py-1 font-semibold border-black border-x"
                        >
                            {{ header }}
                        </div>
                    </div>
                    <div
                        class="flex justify-between w-full"
                        v-for="item in columnsTunjanganLama"
                    >
                        <FormItemTunjangan>
                            <Dropdown
                                :is-loading="options.isLoading"
                                :dropdown-options="options.allowance"
                                v-model="item.muta_allow_code"
                            />
                        </FormItemTunjangan>
                        <FormItemTunjangan>
                            <input
                                type="number"
                                class="w-full h-full"
                                v-model="item.muta_allow_amount"
                            />
                        </FormItemTunjangan>
                        <FormItemTunjangan>
                            <input
                                type="number"
                                class="w-full h-full"
                                v-model="item.muta_allow_grossnet"
                            />
                        </FormItemTunjangan>
                    </div>
                    <p class="self-start mt-5 font-semibold">
                        Total : {{ totalTunjanganLama }}
                    </p>
                </template>
            </div>
            <div class="flex flex-col flex-1 text-center w-[450px]">
                <div
                    class="w-[450px] py-1 text-lg font-bold text-white bg-accent-1"
                >
                    STATUS BARU
                </div>

                <template v-if="formType === 'detail'">
                    <FormStatusLamaItem>
                        {{ detailData?.companyTo }}
                    </FormStatusLamaItem>

                    <FormStatusLamaItem>
                        {{ detailData?.positionTo }}
                    </FormStatusLamaItem>

                    <FormStatusLamaItem>
                        {{ detailData?.levelTo }}
                    </FormStatusLamaItem>

                    <FormStatusLamaItem>
                        {{ detailData?.buTo }}
                    </FormStatusLamaItem>

                    <FormStatusLamaItem>
                        {{ detailData?.ccTo }}
                    </FormStatusLamaItem>

                    <FormStatusLamaItem>
                        {{ detailData?.locTo }}
                    </FormStatusLamaItem>

                    <FormStatusLamaItem>
                        {{ detailData?.spvTo }}
                    </FormStatusLamaItem>

                    <FormStatusLamaItem>
                        {{ detailData?.mgrTo }}
                    </FormStatusLamaItem>

                    <FormStatusLamaItem
                        v-if="formType === 'detail' && !isShowTunjangan"
                        class="h-40"
                    >
                        <FormItemTunjanganDetail :data="statusBaruTunjangan" />
                    </FormStatusLamaItem>
                </template>

                <template v-else>
                    <FormStatusBaruItem>
                        <FormAutocomplete
                            noBorder="true"
                            :data="options.company"
                            id="company-status"
                            :isLoading="options.isLoading"
                            v-model="values.mutd_to_company"
                            :reduceOption="onReduceOptions"
                        />
                    </FormStatusBaruItem>
                    <FormStatusBaruItem>
                        <FormAutocomplete
                            noBorder="true"
                            :data="options.position"
                            id="position-status"
                            :isLoading="options.isLoading"
                            v-model="values.mutd_to_position"
                            :reduceOption="onReduceOptions"
                        />
                    </FormStatusBaruItem>
                    <FormStatusBaruItem>
                        <div class="px-4 h-full py-2 flex items-center">
                            {{ statusLamaData?.level || detailData?.levelFr }}
                        </div>
                    </FormStatusBaruItem>
                    <FormStatusBaruItem>
                        <FormAutocomplete
                            noBorder="true"
                            :data="options.bussunit"
                            id="bussunit-status"
                            :isLoading="options.isLoading"
                            v-model="values.mutd_to_division"
                            :reduceOption="onReduceOptions"
                        />
                    </FormStatusBaruItem>
                    <FormStatusBaruItem>
                        <FormAutocomplete
                            noBorder="true"
                            :data="options.costCenter"
                            id="costcenter-status"
                            :isLoading="options.isLoading"
                            v-model="values.mutd_to_costcenter"
                            :reduceOption="onReduceOptions"
                        />
                    </FormStatusBaruItem>
                    <FormStatusBaruItem>
                        <FormAutocomplete
                            noBorder="true"
                            :data="options.workLocation"
                            id="worklocation-status"
                            :isLoading="options.isLoading"
                            v-model="values.mutd_to_work_location"
                            :reduceOption="onReduceOptions"
                        />
                    </FormStatusBaruItem>
                    <FormStatusBaruItem
                        :isDisabled="values.mutd_to_division === ''"
                    >
                        <FormAutocomplete
                            noBorder="true"
                            :data="conditionalOptions.directSPV"
                            id="directspv-status"
                            :isLoading="conditionalOptions.isLoading"
                            v-model="values.mutd_to_direct_spv"
                            :reduceOption="onReduceOptions"
                            :isDisabled="values.mutd_to_division === ''"
                        />
                    </FormStatusBaruItem>
                    <FormStatusBaruItem
                        :isDisabled="values.mutd_to_division === ''"
                    >
                        <FormAutocomplete
                            noBorder="true"
                            :data="conditionalOptions.immedManager"
                            id="immedmanager-status"
                            :isLoading="conditionalOptions.isLoading"
                            v-model="values.mutd_to_immed_mgr"
                            :reduceOption="onReduceOptions"
                            :isDisabled="values.mutd_to_division === ''"
                        />
                    </FormStatusBaruItem>
                </template>

                <template v-if="isShowTunjangan">
                    <div class="flex justify-between w-full mt-10 bg-accent-1">
                        <div
                            v-for="header in headerTunjangan"
                            :key="header"
                            class="w-full py-1 font-semibold text-white border-black border-x"
                        >
                            {{ header }}
                        </div>
                    </div>

                    <div
                        class="flex justify-between w-full"
                        v-for="(item, index) in columnsTunjanganBaru"
                    >
                        <FormItemTunjangan>
                            <Dropdown
                                :is-loading="options.isLoading"
                                :dropdown-options="options.allowance"
                                v-model="item.muta_allow_code"
                            />
                        </FormItemTunjangan>
                        <FormItemTunjangan>
                            <input
                                type="number"
                                class="w-full h-full"
                                v-model="item.muta_allow_amount"
                            />
                        </FormItemTunjangan>
                        <FormItemTunjangan>
                            <input
                                type="number"
                                class="w-full h-full"
                                v-model="item.muta_allow_grossnet"
                            />
                        </FormItemTunjangan>

                        <div class="relative">
                            <div
                                v-if="index === columnsTunjanganBaru.length - 1"
                                class="absolute top-2 -right-7"
                            >
                                <button
                                    v-if="columnsTunjanganBaru.length < 7"
                                    @click="addColumn"
                                >
                                    <div class="p-1 bg-red-600 rounded-full">
                                        <component
                                            :is="IconPlus"
                                            class="text-xs text-white"
                                        />
                                    </div>
                                </button>
                            </div>
                            <div
                                v-if="index === columnsTunjanganBaru.length - 2"
                                class="absolute top-1 -right-5"
                            >
                                <button @click="removeColumn">-</button>
                            </div>
                        </div>
                    </div>

                    <p class="self-start mt-5 font-semibold">
                        Total : {{ totalTunjanganBaru }}
                    </p>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import LabelForm from "@/components/LabelForm.vue";
import Dropdown from "../Dropdown.vue";
import IconPlus from "../../components/icons/IconPlus.vue";
import FormAutocomplete from "../FormAutocomplete.vue";
import FormStatusBaruItem from "./FormStatusBaruItem.vue";
import useFormAutoFill from "../../hooks/useFormAutoFill";
import { onMounted, ref, watch, watchEffect } from "vue";
import {
    getAllowance,
    getDirectSpv,
    getImmediateManager,
} from "../../services/form.services";
import useFetch from "../../hooks/useFetch";
import {
    columnTunjanganDefaultValues,
    columnTunjanganValues,
    formLabelTitle,
    statusLamaDefaultValues,
    tunjanganLabelTitle,
} from "../../data/mutations.data";
import FormStatusLamaItem from "./FormStatusLamaItem.vue";
import FormStatusInfo from "./FormStatusInfo.vue";
import UIDivider from "../ui/UIDivider.vue";
import FormItemTunjanganDetail from "./FormItemTunjanganDetail.vue";
import FormItemTunjangan from "./FormItemTunjangan.vue";

const props = defineProps([
    "isShowTunjangan",
    "values",
    "statusBaruData",
    "statusLamaData",
    "detailData",
    "formType",
]);

const headerTunjangan = ref(tunjanganLabelTitle);

const statusLamaTunjangan = ref([]);
const statusBaruTunjangan = ref([]);

const columnsTunjanganBaru = ref([
    {
        muta_allow_amount: "",
        muta_allow_grossnet: "",
        muta_allow_code: "",
        muta_type: "NEW",
    },
]);
const columnsTunjanganLama = ref([
    {
        muta_allow_amount: "",
        muta_allow_grossnet: "",
        muta_allow_code: "",
        muta_type: "PAST",
    },
]);

const totalTunjanganLama = ref(0);
const totalTunjanganBaru = ref(0);

const addColumn = () => {
    columnsTunjanganBaru.value.push({
        muta_allow_amount: "",
        muta_allow_grossnet: "",
        muta_allow_code: "",
        muta_type: "NEW",
    });
    columnsTunjanganLama.value.push({
        muta_allow_amount: "",
        muta_allow_grossnet: "",
        muta_allow_code: "",
        muta_type: "PAST",
    });
};
const removeColumn = () => {
    columnsTunjanganBaru.value.pop();
    columnsTunjanganLama.value.pop();
};

const options = ref({
    isLoading: false,
    company: [],
    position: [],
    bussunit: [],
    costCenter: [],
    workLocation: [],
    directSPV: [],
    immedManager: [],
    allowance: [],
});

const conditionalOptions = ref({
    directSPV: [],
    immedManager: [],
    isLoading: false,
});

const values = ref({
    mutd_to_company: "",
    mutd_to_position: "",
    mutd_to_division: "",
    mutd_to_costcenter: "",
    mutd_to_work_location: "",
    mutd_to_direct_spv: "",
    mutd_to_immed_mgr: "",
});

const fetchAutoFillForms = async () => {
    options.value.isLoading = true;
    try {
        const {
            businessUnitValues,
            companyValues,
            costCenterValues,
            positionValues,
            workLocationValues,
        } = await useFormAutoFill();

        options.value.company = companyValues;
        options.value.position = positionValues;
        options.value.bussunit = businessUnitValues;
        options.value.costCenter = costCenterValues;
        options.value.workLocation = workLocationValues;
    } catch (e) {
        console.log(e);
    } finally {
        options.value.isLoading = false;
    }
};

function allObjectsHaveEmptyValues(arrayOfObjects) {
    return arrayOfObjects.every(
        (obj) =>
            obj.muta_allow_amount === "" &&
            obj.muta_allow_grossnet === "" &&
            obj.muta_allow_code === ""
    );
}

watchEffect(() => {
    props.values.value = values.value;

    if (
        props?.detailData?.allowance.length > 0 &&
        props.formType === "detail"
    ) {
        statusLamaTunjangan.value = props.detailData.allowance.filter(
            (item) => {
                return item.muta_type === "PAST";
            }
        );

        statusBaruTunjangan.value = props.detailData.allowance.filter(
            (item) => {
                return item.muta_type === "NEW";
            }
        );
    }

    if (props?.detailData && props.formType === "edit") {
        values.value.mutd_to_company = props.detailData.companyTo;
        values.value.mutd_to_position = props.detailData.positionTo;
        values.value.mutd_to_division = props.detailData.buTo;
        values.value.mutd_to_costcenter = props.detailData.ccTo;
        values.value.mutd_to_work_location = props.detailData.locTo;
        values.value.mutd_to_direct_spv = props.detailData.spvTo;
        values.value.mutd_to_immed_mgr = props.detailData.mgrTo;

        props.values.value = values.value;
    }

    if (props.isShowTunjangan) {
        props.values.value.allowance_now = [
            ...columnsTunjanganLama.value,
            ...columnsTunjanganBaru.value,
        ];

        if (allObjectsHaveEmptyValues(columnsTunjanganLama.value)) {
            props.values.value.allowance_now = [];
        }

        if (allObjectsHaveEmptyValues(columnsTunjanganBaru.value)) {
            props.values.value.allowance_now = [];
        }
    }

    if (!props.isShowTunjangan) {
        props.values.value.allowance_now = [];
    }
});

const fetchAutoFillFormParams = async () => {
    conditionalOptions.value.isLoading = true;
    try {
        const { data: directSpvResponse } = await useFetch({
            services: getDirectSpv,
            options: {
                params: {
                    bu: values.value.mutd_to_division,
                },
            },
        });

        const { data: immdieateManagerResponse } = await useFetch({
            services: getImmediateManager,
            options: {
                params: {
                    bu: values.value.mutd_to_division,
                },
            },
        });

        conditionalOptions.value.directSPV = directSpvResponse?.value.map(
            (item) => {
                return {
                    label: `${item?.nik} - ${item?.nama}`,
                    value: item?.nik,
                };
            }
        );

        conditionalOptions.value.immedManager =
            immdieateManagerResponse?.value.map((item) => {
                return {
                    label: `${item?.nik} - ${item?.nama}`,
                    value: item?.nik,
                };
            });
    } catch (error) {
        console.log(error);
    } finally {
        conditionalOptions.value.isLoading = false;
    }
};

watch(
    () => values.value.mutd_to_division,
    async (newValue) => {
        if (newValue) {
            await fetchAutoFillFormParams();
        }
    }
);

watch(
    () => columnsTunjanganLama.value.map((item) => item.muta_allow_amount),
    (newColumns) => {
        totalTunjanganLama.value = newColumns.reduce(
            (acc, curr) => acc + Number(curr),
            0
        );
    }
);

watch(
    () => columnsTunjanganBaru.value.map((item) => item.muta_allow_amount),
    (newColumns) => {
        totalTunjanganBaru.value = newColumns.reduce(
            (acc, curr) => acc + Number(curr),
            0
        );
    }
);

const fetchAllowanceOptions = async () => {
    const { data: allowanceResponse } = await useFetch({
        services: getAllowance,
        options: {},
    });

    options.value.allowance = allowanceResponse?.value.map((item) => {
        return {
            label: item?.allow_description,
            value: item?.allow_code,
        };
    });
};

const onReduceOptions = (option) => {
    return option.value;
};

onMounted(() => {
    fetchAutoFillForms();
    fetchAllowanceOptions();
    if (
        statusBaruTunjangan.value.length > 0 &&
        statusLamaTunjangan.value.length > 0
    ) {
        columnsTunjanganLama.value = statusLamaTunjangan?.value.map((item) => ({
            ...item,
            muta_allow_code: {
                label: item?.muta_allow_code,
                value: item?.muta_allow_code,
            },
        }));
        columnsTunjanganBaru.value = statusBaruTunjangan?.value.map((item) => ({
            ...item,
            muta_allow_code: {
                label: item.muta_allow_code,
                value: item.muta_allow_code,
            },
        }));
        props.values.value.allowance_now = [
            ...columnsTunjanganLama.value,
            ...columnsTunjanganBaru.value,
        ];
    }
});
</script>
