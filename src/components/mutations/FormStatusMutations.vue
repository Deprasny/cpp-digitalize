<template>
  <div class="overflow-x-auto h-full w-full">
    <div class="flex my-10 w-[900px] h-full">
      <div class="flex flex-col items-center text-center flex-1 w-48">
        <div class="w-full h-10"></div>
        <FormStatusInfo>
          <LabelForm :label="formLabelTitle.Perusahaan" :colon="false" />
        </FormStatusInfo>
        <FormStatusInfo>
          <LabelForm :label="formLabelTitle.BussinessUnits" :colon="false" />
        </FormStatusInfo>

        <FormStatusInfo v-if="isShowJabatan">
          <LabelForm :label="formLabelTitle.Jabatan" :colon="false" />
        </FormStatusInfo>
        <FormStatusInfo v-if="isShowJabatan">
          <LabelForm :label="formLabelTitle.KelasJabatan" :colon="false" />
        </FormStatusInfo>

        <FormStatusInfo>
          <LabelForm :label="formLabelTitle.CostCenter" :colon="false" />
        </FormStatusInfo>
        <FormStatusInfo>
          <LabelForm :label="formLabelTitle.LokasiKerja" :colon="false" />
        </FormStatusInfo>
        <FormStatusInfo>
          <LabelForm :label="formLabelTitle.MelaporKe" :colon="false" />
        </FormStatusInfo>
        <FormStatusInfo>
          <LabelForm :label="formLabelTitle.ImmediateManager" :colon="false" />
        </FormStatusInfo>

        <FormStatusInfo
          v-if="
            (formType === 'detail' && !isShowTunjangan) || isShowTunjanganDetail
          "
        >
          <LabelForm :label="formLabelTitle.Tunjangan" :colon="false" />
        </FormStatusInfo>
      </div>
      <div class="flex flex-col items-center text-center flex-1 w-[450px]">
        <div class="w-[450px] py-1 text-lg font-bold bg-accent-2">
          STATUS LAMA
        </div>

        <FormStatusLamaItem>
          {{
            detailData?.companyFr
              ? detailData?.companyFr
              : statusLamaData?.persarea
          }}
        </FormStatusLamaItem>
        <FormStatusLamaItem>
          {{ detailData?.buFr ? detailData?.buFr : statusLamaData?.busunit }}
        </FormStatusLamaItem>

        <FormStatusLamaItem v-if="isShowJabatan">
          {{
            detailData?.positionFr
              ? detailData?.positionFr
              : statusLamaData?.posisi
          }}
        </FormStatusLamaItem>

        <FormStatusLamaItem v-if="isShowJabatan">
          {{
            detailData?.levelFr ? detailData?.levelFr : statusLamaData?.level
          }}
        </FormStatusLamaItem>

        <FormStatusLamaItem>
          {{ detailData?.ccFr ? detailData?.ccFr : statusLamaData?.costcenter }}
        </FormStatusLamaItem>

        <FormStatusLamaItem>
          {{ detailData?.locFr ? detailData?.locFr : statusLamaData?.office }}
        </FormStatusLamaItem>

        <FormStatusLamaItem>
          {{
            detailData?.spvFr
              ? `${detailData?.spvFr} - ${detailData?.spvFrName} `
              : statusLamaData?.empl_nik_spv
              ? `${statusLamaData?.empl_nik_spv} - ${statusLamaData?.empl_name_spv}`
              : ""
          }}
        </FormStatusLamaItem>

        <FormStatusLamaItem>
          {{
            detailData?.mgrFr
              ? `${detailData?.mgrFr} - ${detailData?.mgrFrName}`
              : statusLamaData?.immedmgr
              ? `${statusLamaData?.immedmgr} - ${statusLamaData?.immedmgr_name}`
              : ""
          }}
        </FormStatusLamaItem>

        <FormStatusLamaItem
          v-if="
            (formType === 'detail' && !isShowTunjangan) || isShowTunjanganDetail
          "
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
                disabled="true"
              />
            </FormItemTunjangan>
            <FormItemTunjangan>
              <FormCurrency
                v-model.lazy="item.muta_allow_amount"
                disabled="true"
              />
            </FormItemTunjangan>
          </div>
          <p class="self-start mt-5 font-semibold">
            Total : {{ formatRupiah(totalTunjanganLama) }}
          </p>
        </template>
      </div>
      <div class="flex flex-col flex-1 text-center w-[450px]">
        <div class="w-[450px] py-1 text-lg font-bold text-white bg-accent-1">
          STATUS BARU
        </div>

        <template v-if="formType === 'detail'">
          <FormStatusLamaItem>
            {{ detailData?.companyTo }}
          </FormStatusLamaItem>
          <FormStatusLamaItem>
            {{ detailData?.buTo }}
          </FormStatusLamaItem>

          <FormStatusLamaItem v-if="isShowJabatan">
            {{ detailData?.positionTo }}
          </FormStatusLamaItem>

          <FormStatusLamaItem v-if="isShowJabatan">
            {{ detailData?.levelTo }}
          </FormStatusLamaItem>

          <FormStatusLamaItem>
            {{ detailData?.ccTo }}
          </FormStatusLamaItem>

          <FormStatusLamaItem>
            {{ `${detailData?.locTo} - ${detailData?.locToName}` }}
          </FormStatusLamaItem>

          <FormStatusLamaItem>
            {{ `${detailData?.spvTo} - ${detailData?.spvToName}` }}
          </FormStatusLamaItem>

          <FormStatusLamaItem>
            {{ `${detailData?.mgrTo} - ${detailData?.mgrToName}` }}
          </FormStatusLamaItem>

          <FormStatusLamaItem
            v-if="
              (formType === 'detail' && !isShowTunjangan) ||
              isShowTunjanganDetail
            "
            class="h-40"
          >
            <FormItemTunjanganDetail :data="statusBaruTunjangan" />
          </FormStatusLamaItem>
        </template>

        <template v-else>
          <FormStatusBaruItem>
            <FormAutoCompleteCompany
              v-model="values.mutd_to_company"
              :values="values.mutd_to_company"
            />
          </FormStatusBaruItem>
          <FormStatusBaruItem>
            <FormAutoCompleteBussunits
              v-model="values.mutd_to_division"
              :values="values.mutd_to_division"
            />
          </FormStatusBaruItem>

          <FormStatusBaruItem v-if="isShowJabatan">
            <FormAutoCompletePosition v-model="values.mutd_to_position" />
          </FormStatusBaruItem>
          <FormStatusBaruItem v-if="isShowJabatan">
            <div class="px-4 h-full py-2 flex items-center pl-12">
              {{ statusLamaData?.level || detailData?.levelFr }}
            </div>
          </FormStatusBaruItem>

          <FormStatusBaruItem>
            <FormAutoCompleteCostCenter
              :division_id="values.mutd_to_division.value"
              v-model="values.mutd_to_costcenter"
            />
          </FormStatusBaruItem>
          <FormStatusBaruItem>
            <FormAutocompleteWorkLocation
              v-model="values.mutd_to_work_location"
            />
          </FormStatusBaruItem>
          <FormStatusBaruItem :isDisabled="values.mutd_to_division === ''">
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
          <FormStatusBaruItem :isDisabled="values.mutd_to_division === ''">
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

          <FormStatusLamaItem v-if="isShowTunjanganDetail" class="h-40">
            <FormItemTunjanganDetail :data="statusBaruTunjangan" />
          </FormStatusLamaItem>
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
              <FormCurrency v-model.lazy="item.muta_allow_amount" />
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
                    <component :is="IconPlus" class="text-xs text-white" />
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
            Total : {{ formatRupiah(totalTunjanganBaru) }}
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
import { onMounted, ref, watch, watchEffect } from "vue";
import formatRupiah from "../../utils/formatCurrencyRupiah";
import {
  getAllowance,
  getDirectSpv,
  getImmediateManager,
} from "../../services/form.services";
import useFetch from "../../hooks/useFetch";
import { formLabelTitle, tunjanganLabelTitle } from "../../data/mutations.data";
import FormStatusLamaItem from "./FormStatusLamaItem.vue";
import FormStatusInfo from "./FormStatusInfo.vue";
import UIDivider from "../ui/UIDivider.vue";
import FormItemTunjanganDetail from "./FormItemTunjanganDetail.vue";
import FormItemTunjangan from "./FormItemTunjangan.vue";
import FormAutoCompleteCompany from "./FormAutoComplete/FormAutoCompleteCompany.vue";
import FormAutoCompletePosition from "./FormAutoComplete/FormAutoCompletePosition.vue";
import FormAutoCompleteBussunits from "./FormAutoComplete/FormAutoCompleteBussunits.vue";
import FormAutoCompleteCostCenter from "./FormAutoComplete/FormAutoCompleteCostCenter.vue";
import FormAutocompleteWorkLocation from "./FormAutoComplete/FormAutocompleteWorkLocation.vue";

import { watchDebounced } from "@vueuse/core";
import { useRouter } from "vue-router";
import FormCurrency from "../FormCurrency.vue";

const props = defineProps([
  "isShowTunjangan",
  "values",
  "statusBaruData",
  "statusLamaData",
  "detailData",
  "formType",
  "isShowJabatan",
  "selectedNik",
  "isShowTunjanganDetail",
  "isGroup",
]);

const headerTunjangan = ref(tunjanganLabelTitle);

const statusLamaTunjangan = ref([]);
const statusBaruTunjangan = ref([]);

const columnsTunjanganBaru = ref([
  {
    muta_allow_amount: 0,
    muta_allow_code: "",
    muta_type: "NEW",
  },
]);
const columnsTunjanganLama = ref([
  {
    muta_allow_amount: 0,
    muta_allow_code: "",
    muta_type: "PAST",
  },
]);

const totalTunjanganLama = ref(0);
const totalTunjanganBaru = ref(0);

const addColumn = () => {
  columnsTunjanganBaru.value.push({
    muta_allow_amount: 0,
    muta_allow_code: "",
    muta_type: "NEW",
  });
  columnsTunjanganLama.value.push({
    muta_allow_amount: 0,
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

const allowance_now = ref([]);

watchEffect(() => {
  props.values.value = {
    ...values.value,
    mutd_to_division: values.value.mutd_to_division?.label
      ? values.value.mutd_to_division?.label
      : values.value.mutd_to_division,
    mutd_to_direct_spv: values.value.mutd_to_direct_spv?.value
      ? values.value.mutd_to_direct_spv?.value
      : values.value.mutd_to_direct_spv,
    mutd_to_immed_mgr: values.value.mutd_to_immed_mgr?.value
      ? values.value.mutd_to_immed_mgr?.value
      : values.value.mutd_to_immed_mgr,
    mutd_to_work_location: values.value.mutd_to_work_location?.value
      ? values.value.mutd_to_work_location?.value
      : values.value.mutd_to_work_location,
    mutd_to_position: props.isGroup
      ? props.statusLamaData?.posisi
      : values?.value?.mutd_to_position,
  };

  if (props?.detailData?.allowance.length > 0) {
    statusLamaTunjangan.value = props.detailData.allowance.filter((item) => {
      return item.muta_type === "PAST";
    });

    statusBaruTunjangan.value = props.detailData.allowance.filter((item) => {
      return item.muta_type === "NEW";
    });
  }

  allowance_now.value = [
    ...columnsTunjanganLama.value,
    ...columnsTunjanganBaru.value,
  ];
});

onMounted(() => {
  watchDebounced(
    () => props.detailData,
    (newVal) => {
      if (newVal) {
        values.value.mutd_to_company = newVal.companyTo;
        values.value.mutd_to_position = newVal.positionTo;
        values.value.mutd_to_division = newVal.buTo;
        values.value.mutd_to_costcenter = newVal.ccTo;
        values.value.mutd_to_work_location = {
          value: newVal.locTo,
          label: `${newVal?.locTo} - ${newVal?.locToName}`,
        };
        values.value.mutd_to_direct_spv = {
          value: newVal.spvTo,
          label: `${newVal.spvTo} - ${newVal.spvToName}`,
        };
        values.value.mutd_to_immed_mgr = {
          value: newVal.mgrTo,
          label: `${newVal.mgrTo} - ${newVal.mgrToName}`,
        };
        props.values.value = values.value;
      }
    },
    {
      debounce: 500,
      immediate: true,
      deep: true,
    }
  );
});

const fetchAutoFillFormParams = async (values) => {
  conditionalOptions.value.isLoading = true;
  try {
    const { data: directSpvResponse } = await useFetch({
      services: getDirectSpv,
      options: {
        params: {
          bu: values,
        },
      },
    });

    const { data: immdieateManagerResponse } = await useFetch({
      services: getImmediateManager,
      options: {
        params: {
          bu: values,
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

    conditionalOptions.value.immedManager = immdieateManagerResponse?.value.map(
      (item) => {
        return {
          label: `${item?.nik} - ${item?.nama}`,
          value: item?.nik,
        };
      }
    );
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
      await fetchAutoFillFormParams(newValue?.value);
    }
  },
  { immediate: true, deep: true }
);

watchDebounced(
  () => columnsTunjanganLama.value.map((item) => item.muta_allow_amount),
  (newColumns) => {
    totalTunjanganLama.value = newColumns.reduce(
      (acc, curr) => acc + Number(curr),
      0
    );
  },
  {
    debounce: 1000,
  }
);

watchDebounced(
  () => columnsTunjanganBaru.value.map((item) => item.muta_allow_amount),
  (newColumns) => {
    totalTunjanganBaru.value = newColumns.reduce(
      (acc, curr) => acc + Number(curr),
      0
    );
  },
  {
    debounce: 1000,
  }
);

watchDebounced(
  () => props?.selectedNik?.allowance,
  (newValue) => {
    if (newValue.length > 0) {
      columnsTunjanganBaru.value = newValue.filter((item) => {
        return item.muta_type === "NEW";
      });

      columnsTunjanganLama.value = newValue.filter((item) => {
        return item.muta_type === "PAST";
      });
    } else {
      allowance_now.value = [];
    }
  },
  {
    debounce: 1000,
    deep: true,
    immediate: true,
  }
);
watchDebounced(
  () => props?.detailData?.allowance,
  (newValue) => {
    if (newValue?.length > 0) {
      columnsTunjanganBaru.value = newValue.filter((item) => {
        return item.muta_type === "NEW";
      });

      columnsTunjanganLama.value = newValue.filter((item) => {
        return item.muta_type === "PAST";
      });

      if (
        statusLamaTunjangan.value.length !== statusBaruTunjangan.value.length
      ) {
        const difference =
          statusLamaTunjangan.value.length - statusBaruTunjangan.value.length;

        if (difference > 0) {
          for (let i = 0; i < difference; i++) {
            columnsTunjanganBaru.value.push({
              muta_allow_amount: 0,
              muta_allow_code: "",
              muta_type: "NEW",
            });
          }
        } else {
          for (let i = 0; i < Math.abs(difference); i++) {
            columnsTunjanganLama.value.push({
              muta_allow_amount: 0,
              muta_allow_code: "",
              muta_type: "PAST",
            });
          }
        }
      }
    }
  },
  {
    debounce: 1000,
    deep: true,
    immediate: true,
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

watchDebounced(
  () => allowance_now.value,
  (newValue) => {
    props.values.value.allowance_now =
      newValue.filter((item) => item.muta_allow_amount !== 0) || [];
  },
  {
    debounce: 1000,
    deep: true,
    immediate: true,
  }
);

onMounted(() => {
  fetchAllowanceOptions();
});
</script>
