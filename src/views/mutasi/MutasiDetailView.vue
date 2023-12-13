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
                >
                    <template v-if="formType === 'Group'">
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
                                            v-if="item?.no_sk"
                                            label="Download SK"
                                            :options="getParams(item?.id)"
                                            :services="getSKMutations"
                                            :fileName="`${item?.no_sk}-sk`"
                                        />
                                    </div>
                                </div>
                            </LabelForm>

                            <LabelForm label="Tanggal Efektif Mutasi">
                                <div
                                    class="flex flex-col w-full"
                                    v-if="isODStatuses"
                                >
                                    <FormInputBasic
                                        type="date"
                                        id="mut_date"
                                        v-model="values.mut_date"
                                    />
                                </div>
                                <div class="flex flex-col w-full" v-else>
                                    {{ data.mut_date }}
                                </div>
                            </LabelForm>

                            <LabelForm label="Alasan Mutasi">
                                <div class="flex flex-col w-full gap-2">
                                    {{ data.mut_reason }}
                                </div>
                            </LabelForm>
                        </FormDetailLabelContainer>
                    </template>
                    <template v-else>
                        <FormDetailLabelContainer>
                            <LabelForm label="Nama & NIK">
                                <div class="w-full flex gap-4">
                                    <p>
                                        {{ data?.employee[0]?.nama }} -
                                        {{ data?.employee[0]?.nik }}
                                    </p>

                                    <DownloadFiles
                                        label="Download SK"
                                        v-if="data?.employee[0]?.no_sk"
                                        :options="
                                            getParams(data?.employee[0]?.id)
                                        "
                                        :services="getSKMutations"
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

                            <LabelForm label="Tanggal Efektif Mutasi">
                                <div>
                                    <div
                                        class="flex flex-col w-full"
                                        v-if="isODStatuses"
                                    >
                                        <FormInputBasic
                                            type="date"
                                            id="mut_date"
                                            v-model="values.mut_date"
                                        />
                                    </div>
                                    <div class="flex flex-col w-full" v-else>
                                        {{ data.mut_date }}
                                    </div>
                                </div>
                            </LabelForm>

                            <LabelForm label="Alasan Mutasi">
                                <p class="w-full">{{ data?.mut_reason }}</p>
                            </LabelForm>
                        </FormDetailLabelContainer>
                    </template>

                    <UIDivider />

                    <!-- form status -->

                    <div>
                        <FormStatus
                            :values="values"
                            :detailData="data"
                            :formType="isODStatuses ? 'edit' : 'detail'"
                            :isShowTunjangan="isCOMBENStatuses"
                        />
                    </div>

                    <UIDivider />

                    <!-- info-1 -->

                    <template v-if="formType === 'Group'"></template>
                    <template v-else>
                        <FormDetailLabelContainer>
                            <LabelForm label="Keluarga">
                                <p class="w-full">
                                    {{
                                        data?.famMove === "YES"
                                            ? "Ikut pindah kelokasi kerja baru"
                                            : "Tidak Ikut pindah kelokasi kerja baru"
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
                                            : "Diambil per 2 Tahun"
                                    }}
                                </p>
                            </LabelForm>

                            <LabelForm label="Transportasi Barang">
                                <p class="w-full">
                                    {{
                                        data?.transport === "Tunai"
                                            ? "Ambil Tunai"
                                            : "Difasilitasi Perusahaan"
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

                            <LabelForm
                                label="Sisa Plafon Berobat"
                                value="John Doe"
                            >
                                <p class="w-full">{{ data?.medBal }}</p>
                            </LabelForm>

                            <LabelForm
                                label="Hak Karyawan Belum Terbayar"
                                value="John Doe"
                            >
                                <p class="w-full">
                                    {{ data?.creditAmount }}
                                </p>
                            </LabelForm>

                            <LabelForm
                                label="Hutang ke Perusahaan"
                                value="John Doe"
                            >
                                <p class="w-full">{{ data?.debitAmount }}</p>
                            </LabelForm>

                            <LabelForm label="Keterangan" value="John Doe">
                                <p class="w-full">{{ data?.notes }}</p>
                            </LabelForm>
                        </FormDetailLabelContainer>

                        <UIDivider />
                    </template>

                    <div class="flex flex-col w-full gap-2 mt-10 md:hidden">
                        <Log :data="listLog" />
                        <UIDivider />
                    </div>

                    <!-- info-3-->
                    <FormDetailLabelContainer>
                        <LabelForm label="Lampiran">
                            <div class="flex gap-4">
                                <p
                                    class="whitespace-nowrap overflow-hidden overflow-ellipsis"
                                >
                                    {{ docsUrl.body.url }}
                                </p>
                                <DownloadFiles
                                    :services="getFileDocsMutations"
                                    :options="docsUrl"
                                    :fileName="`${data?.mut_req_no}-lampiran`"
                                />
                            </div>
                        </LabelForm>

                        <LabelForm
                            label="Form Mutasi"
                            class="items-center"
                            v-if="data?.mut_status === 'F'"
                        >
                            <div class="flex gap-2 items-center">
                                <DownloadFiles
                                    :services="getFormMutations"
                                    :options="getParams(data?.mut_id)"
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
                        <UIButton @click="handleReject" variant="danger">
                            Reject
                        </UIButton>
                    </div>
                    <div v-else class="flex justify-end mx-10 gap-x-5">
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
        modalTitle="Mutasi Anda telah berhasil diapprove"
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

const docsUrl = ref({
    body: {
        url: "",
    },
});

const getParams = (id) => {
    return {
        id: id,
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

const isODStatuses = ref(false);
const isCOMBENStatuses = ref(false);

const onApprove = async (id) => {
    const getValues = () => {
        const getMutId = data?.value?.employee?.[0]?.id || "";
        const transformAllowance =
            values?.value?.value?.allowance_now.map((item) => ({
                ...item,
                muta_allow_code: item?.muta_allow_code?.value,
                muta_id: getMutId,
            })) || [];

        if (isODStatuses.value) {
            return {
                statusApproval: statusApproval.value,
                mut_reason: data?.value?.mut_reason,
                mut_date: values.value.mut_date,
                companyTo: values.value.value.mutd_to_company,
                positionTo: values.value.value.mutd_to_position,
                buTo: values.value.value.mutd_to_division,
                ccTo: values.value.value.mutd_to_costcenter,
                locTo: values.value.value.mutd_to_work_location,
                spvTo: values.value.value.mutd_to_direct_spv,
                mgrTo: values.value.value.mutd_to_immed_mgr,
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
            routeName.push({ name: "approval-mutasi" });
        }, 1000);
    } catch (error) {
        errorMessages.value = error.response.data.message;
        isLoading.value = false;
        showErrorModal.value = true;
    } finally {
        modalLoading.value = false;
        store.toggleModal();
    }
};
const handleConditionalSubmit = () => {
    onApprove(id, statusApproval.value);
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
        values.value.mut_date = data.value.mut_date;

        listLog.value = data?.value?.progress?.map((item) => {
            return {
                date: item?.docstep_status,
                description: item?.step_description,
            };
        });

        const isOnApproval = approvalButton === "approval";

        if (
            (data?.value?.currentStep === "VEROD1" && isOnApproval) ||
            (data?.value?.currentStep === "VEROD2" && isOnApproval)
        ) {
            isODStatuses.value = true;
        }

        if (
            (data?.value?.currentStep === "BENEFIT2" &&
                isOnApproval &&
                formType !== "Group") ||
            (data?.value?.currentStep === "BENEFIT1" &&
                isOnApproval &&
                formType !== "Group")
        ) {
            isCOMBENStatuses.value = true;
        }
    }
});
</script>
