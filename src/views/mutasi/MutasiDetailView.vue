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
                        <div class="my-5">
                            <div class="flex w-full py-4 px-7 text-start">
                                <div class="flex w-full">
                                    <LabelForm
                                        label="Nama & NIK"
                                        class="w-full font-semibold"
                                    />
                                    <div class="flex flex-col w-full gap-2">
                                        <div
                                            class="flex w-full gap-2"
                                            v-for="(
                                                item, index
                                            ) in data?.employee"
                                        >
                                            <p class="w-4">{{ index + 1 }}</p>
                                            <p>
                                                {{ item?.nama }} -
                                                {{ item?.nik }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="hidden w-full md:flex"></div>
                            </div>

                            <div class="flex w-full py-4 px-7 text-start">
                                <div class="flex w-full">
                                    <LabelForm
                                        label="Tanggal Efektif Mutasi"
                                        class="w-full font-semibold"
                                    />

                                    <div
                                        class="flex flex-col w-full gap-2"
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
                                <div class="hidden w-full md:flex"></div>
                            </div>

                            <div class="flex w-full py-4 px-7 text-start">
                                <div class="flex w-full">
                                    <LabelForm
                                        label="Alasan Mutasi"
                                        class="w-full font-semibold"
                                    />
                                    <div class="flex flex-col w-full gap-2">
                                        -
                                    </div>
                                </div>
                                <div class="hidden w-full md:flex"></div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div
                            class="my-5"
                            v-for="(item, index) in data?.employee"
                            :key="index"
                        >
                            <div
                                class="flex flex-col w-full py-4 px-7 text-start md:flex-row"
                            >
                                <div class="flex w-full">
                                    <LabelForm
                                        label="Nama & NIK"
                                        value="John Doe"
                                        class="w-full font-semibold"
                                    />
                                    <p class="w-full">
                                        {{ item?.nama }} - {{ item?.nik }}
                                    </p>
                                </div>
                                <div class="flex w-full">
                                    <LabelForm
                                        label="Tanggal Lahir"
                                        value="John Doe"
                                        class="w-full font-semibold"
                                    />
                                    <p class="w-full">{{ item.tgl_lahir }}</p>
                                </div>
                            </div>
                            <div
                                class="flex flex-col w-full py-4 px-7 text-start md:flex-row"
                            >
                                <div class="flex w-full">
                                    <LabelForm
                                        label="Tanggal Masuk"
                                        value="John Doe"
                                        class="w-full font-semibold"
                                    />
                                    <p class="w-full">{{ item.tgl_masuk }}</p>
                                </div>
                                <div class="flex w-full">
                                    <LabelForm
                                        label="Pendidikan"
                                        value="John Doe"
                                        class="w-full font-semibold"
                                    />
                                    <p class="w-full">{{ item?.education }}</p>
                                </div>
                            </div>
                            <div class="flex w-full py-4 px-7 text-start">
                                <div class="flex w-full md:w-1/2">
                                    <LabelForm
                                        label="Home Base"
                                        value="John Doe"
                                        class="w-full font-semibold"
                                    />
                                    <p class="w-full">
                                        {{ item?.homebase || "-" }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex w-full py-4 px-7 text-start">
                                <div class="flex w-full md:w-1/2">
                                    <LabelForm
                                        label="Tanggal Efektif Mutasi"
                                        value="John Doe"
                                        class="w-full font-semibold"
                                    />
                                    <div
                                        class="flex flex-col w-full gap-2"
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
                            </div>
                            <div class="flex w-full py-4 px-7 text-start">
                                <div class="flex w-full md:w-1/2">
                                    <LabelForm
                                        label="Alasan Mutasi"
                                        value="John Doe"
                                        class="w-full font-semibold"
                                    />
                                    <p class="w-full">{{ data?.notes }}</p>
                                </div>
                            </div>
                        </div>
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
                        <div class="flex flex-col mx-10 my-10 gap-y-5">
                            <div class="flex w-full md:w-1/2">
                                <LabelForm
                                    label="Keluarga"
                                    value="John Doe"
                                    class="w-full font-semibold"
                                />
                                <p class="w-full">
                                    {{
                                        data?.famMove === "YES"
                                            ? "Ikut pindah kelokasi kerja baru"
                                            : "Tidak Ikut pindah kelokasi kerja baru"
                                    }}
                                </p>
                            </div>
                            <div class="flex w-full md:w-1/2">
                                <LabelForm
                                    label="Tunj Rumah"
                                    value="John Doe"
                                    class="w-full font-semibold"
                                />
                                <p class="w-full">
                                    {{
                                        data?.houseAllow === "Yearly"
                                            ? "Diambil per 1 Tahun"
                                            : data?.houseAllow === "Monthly"
                                            ? "Diambil Bulanan"
                                            : "Diambil per 2 Tahun"
                                    }}
                                </p>
                            </div>
                            <div class="flex w-full md:w-1/2">
                                <LabelForm
                                    label="Transportasi Barang"
                                    value="John Doe"
                                    class="w-full font-semibold"
                                />
                                <p class="w-full">
                                    {{
                                        data?.transport === "Tunai"
                                            ? "Ambil Tunai"
                                            : "Difasilitasi Perusahaan"
                                    }}
                                </p>
                            </div>
                        </div>

                        <UIDivider />

                        <!-- info-2 -->
                        <div class="flex flex-col mx-10 my-10 gap-y-5">
                            <div class="flex w-full md:w-1/2">
                                <LabelForm
                                    label="Sisa Cuti"
                                    value="John Doe"
                                    class="w-full font-semibold"
                                />
                                <p class="w-full">{{ data?.leaveBal }}</p>
                            </div>
                            <div class="flex w-full md:w-1/2">
                                <LabelForm
                                    label="Sisa Plafon Berobat"
                                    value="John Doe"
                                    class="w-full font-semibold"
                                />
                                <p class="w-full">{{ data?.medBal }}</p>
                            </div>
                            <div class="flex w-full md:w-1/2">
                                <LabelForm
                                    label="Hak Karyawan Belum Terbayar"
                                    value="John Doe"
                                    class="w-full font-semibold"
                                />
                                <p class="w-full">{{ data?.creditAmount }}</p>
                            </div>
                            <div class="flex w-full md:w-1/2">
                                <LabelForm
                                    label="Hutang ke Perusahaan"
                                    value="John Doe"
                                    class="w-full font-semibold"
                                />
                                <p class="w-full">{{ data?.debitAmount }}</p>
                            </div>
                            <div class="flex w-full md:w-1/2">
                                <LabelForm
                                    label="Keterangan"
                                    value="John Doe"
                                    class="w-full font-semibold"
                                />
                                <p class="w-full">{{ data?.notes }}</p>
                            </div>
                        </div>

                        <UIDivider />
                    </template>

                    <div class="flex flex-col w-full gap-2 mt-10 md:hidden">
                        <Log :data="listLog" />
                        <UIDivider />
                    </div>

                    <!-- info-3-->
                    <div class="flex flex-col mx-10 my-10 gap-y-5 w-full">
                        <div class="flex w-full md:w-1/2">
                            <LabelForm
                                label="Lampiran"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full h-full">
                                {{ docsUrl }}
                            </p>
                        </div>
                    </div>

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

                        <UIButton
                            variant="form"
                            v-if="docsUrl"
                            @click="handleGetFile"
                            :isLoading="downloadFileLoading"
                        >
                            Download Lampiran</UIButton
                        >
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
    getMutationsDetailTable,
    putMutationsTable,
} from "../../services/mutation.services";
import { useModalStore } from "../../stores/index.js";
import FormStatus from "../../components/mutations/FormStatusMutations.vue";
import FormInputBasic from "../../components/FormInputBasic.vue";

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

const downloadFileLoading = ref(false);

const docsUrl = ref("");

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
        docsUrl.value = response.value.mut_file_request;
    } catch (error) {
        console.error(error);
        showErrorModal.value = true;
        errorMessages.value = "Failed to fetch data";
    } finally {
        isLoading.value = false;
    }
};

const handleGetFile = async () => {
    downloadFileLoading.value = true;
    try {
        const { data: response, headers } = await useFetch({
            services: getFileDocsMutations,
            options: {
                body: {
                    url: docsUrl.value,
                },

                config: {
                    responseType: "blob",
                },
            },
        });

        const contentType = headers.value["content-type"];
        const fileExtension = contentType ? contentType.split("/")[1] : "";

        var fileURL = window.URL.createObjectURL(new Blob([response.value]));

        var fileLink = document.createElement("a");
        fileLink.href = fileURL;

        fileLink.setAttribute(
            "download",
            `${data?.value?.mut_req_no}.${fileExtension}`
        );

        document.body.appendChild(fileLink);
        fileLink.click();
    } catch (error) {
        console.error(error);
        showErrorModal.value = true;
        errorMessages.value = "Failed to fetch data";
    } finally {
        downloadFileLoading.value = false;
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
                mut_reason: values.value.mut_reason,
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
