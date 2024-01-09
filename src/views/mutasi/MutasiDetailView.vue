<template>
  <template v-if="data?.mut_id">
    <div>
      <a @click="$router.back()">
        <UIButton :icon="IconChevronLeft" :variant="'secondary'">
          Back
        </UIButton>
      </a>

      <UIDivider />
      <div class="flex flex-col w-full my-16 md:flex-row">
        <BasicCard
          :title="data?.mut_req_no"
          variant="detail"
          class="md:w-[75%] w-full"
          :draft="data?.draft"
          @draft="handleDraft"
        >
          <template v-if="formType === 'Kolektif'">
            <FormDetailLabelContainer>
              <LabelForm label="Nama & NIK">
                <div class="flex flex-col w-full gap-2">
                  <div
                    class="flex w-full gap-2"
                    v-for="(item, index) in data?.employee"
                  >
                    <p class="w-4">{{ index + 1 }}</p>
                    <p>
                      {{ item?.nama }} -
                      {{ item?.nik }}
                    </p>
                    <DownloadFiles
                      v-if="item?.url_sk"
                      label="Download SK"
                      :options="getParams(item?.url_sk)"
                      :services="getFileDocsMutations"
                      :fileName="`${item?.no_sk}-sk`"
                    />
                  </div>
                </div>
              </LabelForm>

              <LabelForm label="Tanggal Efektif Mutasi" class="items-center">
                <div class="flex flex-col w-full" v-if="isODStatuses">
                  <FormInputBasic
                    type="date"
                    id="mut_date"
                    v-model="values.mut_date"
                    :allowed-dates="allowedDates"
                  />
                </div>
                <div class="flex flex-col w-full" v-else>
                  {{ data.mut_date }}
                </div>
              </LabelForm>

              <LabelForm label="Alasan Mutasi" class="items-center">
                <div>
                  <div
                    class="flex flex-col w-full"
                    v-if="isODStatuses || isEdit"
                  >
                    <FormInputBasic
                      type="textarea"
                      id="mut_reason"
                      v-model="values.mut_reason"
                    />
                  </div>
                  <div class="flex flex-col w-full" v-else>
                    {{ data.mut_reason }}
                  </div>
                </div>
              </LabelForm>
            </FormDetailLabelContainer>
          </template>
          <template v-else>
            <FormDetailLabelContainer>
              <LabelForm label="Nama & NIK">
                <div class="flex w-full gap-4">
                  <p>
                    {{ data?.employee[0]?.nama }} -
                    {{ data?.employee[0]?.nik }}
                  </p>

                  <DownloadFiles
                    label="Download SK"
                    v-if="data?.employee[0]?.url_sk"
                    :options="getParams(data?.employee[0]?.url_sk)"
                    :services="getFileDocsMutations"
                    :fileName="`${data?.employee[0]?.no_sk}-sk`"
                  />
                </div>
              </LabelForm>

              <LabelForm label="Tanggal Lahir">
                <p class="w-full">
                  {{ data?.employee[0]?.tgl_lahir }}
                </p>
              </LabelForm>

              <LabelForm label="Tanggal Masuk">
                <p class="w-full">
                  {{ data?.employee[0]?.tgl_masuk }}
                </p>
              </LabelForm>

              <LabelForm label="Pendidikan">
                <p class="w-full">
                  {{ data?.employee[0]?.education }}
                </p>
              </LabelForm>

              <LabelForm label="Home Base">
                <p class="w-full">
                  {{ data?.employee[0]?.homebase || "-" }}
                </p>
              </LabelForm>

              <LabelForm label="Tanggal Efektif Mutasi" class="items-center">
                <div>
                  <div
                    class="flex flex-col w-full"
                    v-if="isODStatuses || isEdit"
                  >
                    <FormInputBasic
                      type="date"
                      id="mut_date"
                      v-model="values.mut_date"
                      :allowed-dates="allowedDates"
                    />
                  </div>
                  <div class="flex flex-col w-full" v-else>
                    {{ data.mut_date }}
                  </div>
                </div>
              </LabelForm>

              <LabelForm label="Alasan Mutasi" class="items-center">
                <div>
                  <div
                    class="flex flex-col w-full"
                    v-if="isODStatuses || isEdit"
                  >
                    <FormInputBasic
                      type="textarea"
                      id="mut_reason"
                      v-model="values.mut_reason"
                    />
                  </div>
                  <div class="flex flex-col w-full" v-else>
                    {{ data.mut_reason }}
                  </div>
                </div>
              </LabelForm>
            </FormDetailLabelContainer>
          </template>

          <UIDivider />

          <!-- form status -->

          <div>
            <FormStatus
              :values="values"
              :detailData="data"
              :formType="isODStatuses || isEdit ? 'edit' : 'detail'"
              :isShowTunjangan="isCOMBENStatuses"
              :is-show-jabatan="formType === 'Kolektif' ? false : true"
              :is-group="formType === 'Kolektif' ? false : true"
            />
          </div>

          <UIDivider />

          <!-- info-1 -->

          <template v-if="formType === 'Kolektif'"></template>
          <template v-else>
            <FormDetailLabelContainer>
              <LabelForm label="Keluarga">
                <p class="w-full">
                  {{
                    data?.famMove === "YES"
                      ? "Ikut pindah kelokasi kerja baru"
                      : data?.famMove === "NO"
                      ? "Tidak Ikut pindah kelokasi kerja baru"
                      : ""
                  }}
                </p>
              </LabelForm>

              <LabelForm label="Tunj Rumah">
                <p class="w-full">
                  {{
                    data?.houseAllow === "Yearly"
                      ? "Diambil per 1 Tahun"
                      : data?.houseAllow === "Monthly"
                      ? "Diambil Bulanan"
                      : data?.houseAllow === "2 Years"
                      ? "Diambil per 2 Tahun"
                      : ""
                  }}
                </p>
              </LabelForm>

              <LabelForm label="Transportasi Barang">
                <p class="w-full">
                  {{
                    data?.transport === "Tunai"
                      ? "Ambil Tunai"
                      : data?.transport === "Perusahaan"
                      ? "Difasilitasi Perusahaan"
                      : ""
                  }}
                </p>
              </LabelForm>
            </FormDetailLabelContainer>

            <UIDivider />

            <!-- info-2 -->
            <FormDetailLabelContainer>
              <LabelForm label="Sisa Cuti" value="John Doe">
                <p class="w-full">{{ data?.leaveBal }}</p>
              </LabelForm>

              <LabelForm label="Sisa Plafon Berobat" value="John Doe">
                <p class="w-full">{{ data?.medBal }}</p>
              </LabelForm>

              <LabelForm label="Hak Karyawan Belum Terbayar" value="John Doe">
                <p class="w-full">
                  {{ data?.creditAmount }}
                </p>
              </LabelForm>

              <LabelForm label="Hutang ke Perusahaan" value="John Doe">
                <p class="w-full">{{ data?.debitAmount }}</p>
              </LabelForm>

              <LabelForm label="Keterangan" value="John Doe">
                <p class="w-full">{{ data?.notes }}</p>
              </LabelForm>
            </FormDetailLabelContainer>

            <UIDivider />
          </template>

          <div class="flex flex-col justify-end w-full gap-2 mt-10 md:hidden">
            <Log :data="listLog" />
            <UIDivider />
          </div>

          <!-- info-3-->
          <FormDetailLabelContainer>
            <LabelForm label="Lampiran">
              <div class="flex gap-4">
                <p
                  class="overflow-hidden whitespace-wrap overflow-ellipsis w-60"
                >
                  {{ docsUrl?.body?.url?.split("/")?.pop() || "" }}
                </p>
                <DownloadFiles
                  v-if="docsUrl?.body?.url"
                  :services="getFileDocsMutations"
                  :options="docsUrl"
                  :fileName="`${data?.mut_req_no}-lampiran`"
                />
              </div>
            </LabelForm>

            <LabelForm
              label="Form Mutasi"
              class="items-center"
              v-if="data?.mut_form_url"
            >
              <div class="flex items-center gap-2">
                <DownloadFiles
                  :services="getFileDocsMutations"
                  :options="getParams(data?.mut_form_url)"
                  :fileName="`${data?.mut_req_no}-form-Mutasi`"
                  label="Download Form Mutasi"
                />
              </div>
            </LabelForm>
          </FormDetailLabelContainer>

          <div
            v-if="approvalButton === 'approval'"
            class="flex justify-between mx-5 gap-x-5"
          >
            <UIButton @click="handleApprove" variant="approve">
              Approve
            </UIButton>
            <UIButton @click="handleReject" variant="danger"> Reject </UIButton>
          </div>
          <div v-else class="flex justify-end mx-10 gap-x-5">
            <div v-if="isEdit">
              <UIButton @click="handleApprove" variant="approve">
                Submit
              </UIButton>
            </div>
            <UIButton @click="$router.back()" variant="form">
              Kembali
            </UIButton>
          </div>
        </BasicCard>
        <div class="hidden md:block">
          <Log :data="listLog" class="hidden md:flex" />
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="flex items-center justify-center h-screen">
      <p v-if="!isLoading" class="text-2xl">Tidak ada data</p>
      <UILoader v-if="isLoading" />
    </div>
  </template>

  <Modal
    :isModalOpen="store.isModalOpen"
    @toggleModal="store.toggleModal"
    @submit="handleConditionalSubmit"
    modalTitle="Anda yakin untuk melakukan proses berikut?"
    :isLoading="modalLoading"
  />

  <Modal
    v-if="showSuccessModal"
    :isModalOpen="showSuccessModal"
    @toggleModal="showSuccessModal = false"
    :modalTitle="
      isEdit ? 'Berhasil mengedit draft' : 'Berhasil melakukan approval'
    "
    modalType="success"
  />

  <Modal
    v-if="showErrorModal"
    :isModalOpen="showErrorModal"
    @toggleModal="showErrorModal = false"
    :modalTitle="errorMessages"
    modalType="danger"
  />
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import UIButton from "@/components/ui/UIButton.vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import UIDivider from "@/components/ui/UIDivider.vue";
import BasicCard from "../../components/BasicCard.vue";
import LabelForm from "../../components/LabelForm.vue";
import Log from "../../components/Log.vue";
import { useRoute, useRouter } from "vue-router";
import useFetch from "../../hooks/useFetch";
import UILoader from "../../components/ui/UILoader.vue";
import Modal from "../../components/Modal.vue";
import {
  getFileDocsMutations,
  getFormMutations,
  getMutationsDetailTable,
  getSKMutations,
  putMutationsTable,
} from "../../services/mutation.services";
import { useModalStore } from "../../stores/index.js";
import FormStatus from "../../components/mutations/FormStatusMutations.vue";
import FormInputBasic from "../../components/FormInputBasic.vue";
import DownloadFiles from "../../components/DownloadFiles.vue";
import FormDetailLabelContainer from "../../components/mutations/FormDetailLabelContainer.vue";
import { allowedDates } from "../../utils/allowedDates";
import formatDateToPayload from "../../utils/formatDateToPayload";
import { watchDebounced } from "@vueuse/core";

const store = useModalStore();

const route = useRoute();
const id = route.params.id;
const modalLoading = ref(false);
const isLoading = ref(false);
const errorMessages = ref("");
const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const routeName = useRouter();
const approvalButton = routeName.currentRoute.value.query.type;
const statusApproval = ref("");
const data = ref({});
const formType = routeName.currentRoute.value.query.form_type;

const isODStatuses = ref(false);
const isCOMBENStatuses = ref(false);
const isEdit = ref(false);

const docsUrl = ref({
  body: {
    url: "",
  },
});

const handleDraft = () => {
  isEdit.value = !isEdit.value;
};

const getParams = (id) => {
  return {
    body: {
      url: id,
    },
  };
};

const values = ref({
  mut_date: "",
  mut_reason: "",
});

const handleFetch = async () => {
  isLoading.value = true;
  try {
    const { data: response } = await useFetch({
      services: getMutationsDetailTable,
      options: {
        id: id,
      },
    });

    data.value = response.value;

    docsUrl.value.body.url = response.value.mut_file_request;
  } catch (error) {
    console.error(error);
    showErrorModal.value = true;
    errorMessages.value = "Failed to fetch data";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  handleFetch();
});

console.log(docsUrl?.value);

const onApprove = async (id) => {
  const getValues = () => {
    const getMutId = data?.value?.employee?.[0]?.id || "";
    const transformAllowance =
      values?.value?.value?.allowance_now
        ?.map((item) => {
          return {
            ...item,
            muta_allow_code: item?.muta_allow_code,
            muta_allow_grossnet: item?.muta_allow_amount,
            muta_id: getMutId,
          };
        })
        .filter((item) => item.muta_allow_amount !== 0) || [];

    const commonValues = {
      mut_reason: values?.value?.mut_reason,
      mut_date: formatDateToPayload(new Date(values?.value.mut_date)),
      companyTo: values.value.value.mutd_to_company,
      positionTo: values.value.value.mutd_to_position,
      buTo: values.value.value.mutd_to_division,
      ccTo: values.value.value.mutd_to_costcenter,
      locTo: values.value.value.mutd_to_work_location,
      spvTo: values.value.value.mutd_to_direct_spv,
      mgrTo: values.value.value.mutd_to_immed_mgr,
    };

    if (isODStatuses.value) {
      return {
        statusApproval: statusApproval.value,
        ...commonValues,
      };
    }

    if (isEdit.value) {
      return {
        draft: false,
        ...commonValues,
      };
    }

    if (isCOMBENStatuses.value) {
      return {
        statusApproval: statusApproval.value,
        allowance: transformAllowance,
      };
    }

    return {
      statusApproval: statusApproval.value,
    };
  };

  try {
    modalLoading.value = true;
    const { data: response } = await useFetch({
      services: putMutationsTable,
      options: {
        id: id,
        body: getValues(),
      },
    });

    isLoading.value = false;
    showSuccessModal.value = true;

    setTimeout(() => {
      const route = isEdit.value ? "mutasi" : "approval-mutasi";
      routeName.push({ name: route });
    }, 2000);
  } catch (error) {
    console.log(error);
    errorMessages.value = error?.response?.data?.message;
    isLoading.value = false;
    showErrorModal.value = true;
  } finally {
    modalLoading.value = false;
    store.toggleModal();
  }
};
const handleConditionalSubmit = () => {
  onApprove(id, statusApproval?.value);
};

const handleApprove = () => {
  store.toggleModal();
  statusApproval.value = "Y";
  isLoading.value = true;
};

const handleReject = () => {
  store.toggleModal();
  statusApproval.value = "N";
  isLoading.value = true;
};

const listLog = ref([]);

watchEffect(() => {
  if (data.value) {
    values.value.mut_reason = data.value.mut_reason;
    values.value.mut_date = data.value.mut_date;
    listLog.value = data?.value?.progress?.map((item) => {
      return {
        date: item?.docstep_status,
        description: item?.step_description,
      };
    });
  }
});

watchDebounced(
  () => data?.value?.currentStep,
  (newVal) => {
    const isOnApproval = approvalButton === "approval";

    if (
      (newVal === "VEROD1" && isOnApproval) ||
      (newVal === "VEROD2" && isOnApproval)
    ) {
      isODStatuses.value = true;
    }
    if (
      (newVal === "BENEFIT2" && isOnApproval && formType !== "Kolektif") ||
      (newVal === "BENEFIT1" && isOnApproval && formType !== "Kolektif")
    ) {
      isCOMBENStatuses.value = true;
    }
  },
  { debounce: 1000 }
);
</script>
