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
                                    <div class="flex flex-col w-full gap-2">
                                        -
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
                                    <p class="w-full">-</p>
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
                    <div class="overflow-x-auto">
                        <div
                            class="flex items-baseline justify-between mx-10 my-10 w-[900px]"
                        >
                            <div class="flex flex-col items-start w-[25%]">
                                <div class="py-1"></div>
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
                                    class="w-full py-4 border border-l-0 border-black last:border-b-[2px]"
                                >
                                    <div
                                        v-if="Array.isArray(status)"
                                        class="mx-10"
                                    >
                                        <div
                                            v-for="(item, itemIndex) in status"
                                            :key="itemIndex"
                                        >
                                            <p>
                                                {{
                                                    ` ${item.no}. ${item.tunjangan} : ${item.total}`
                                                }}
                                            </p>
                                        </div>
                                        <UIDivider class="mt-5" />

                                        <p>Total : 9000</p>
                                    </div>
                                    <div v-else>
                                        {{ status }}
                                    </div>
                                </div>
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
                                    class="w-full py-4 border border-black border-r-2 last:border-b-[2px]"
                                >
                                    <div
                                        v-if="Array.isArray(status)"
                                        class="mx-10"
                                    >
                                        <div
                                            v-for="(item, itemIndex) in status"
                                            :key="itemIndex"
                                        >
                                            <p>
                                                {{
                                                    ` ${item.no}. ${item.tunjangan} : ${item.total}`
                                                }}
                                            </p>
                                        </div>
                                        <UIDivider class="mt-5" />

                                        <p>Total : 9000</p>
                                    </div>
                                    <div v-else>
                                        {{ status }}
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    <div class="flex flex-col mx-10 my-10 gap-y-5">
                        <div class="flex w-full md:w-1/2">
                            <LabelForm
                                label="Lampiran"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">Lorem Ipsum.pdf</p>
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
            <UILoader />
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
    getMutationsDetailTable,
    putMutationsTable,
} from "../../services/mutation.services";
import { useModalStore } from "../../stores/index.js";

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

const handleFetch = async () => {
    const { data: response } = await useFetch({
        services: getMutationsDetailTable,
        options: {
            id: id,
        },
    });

    data.value = response.value;
};

onMounted(() => {
    handleFetch();
});

const onApprove = async (id) => {
    try {
        modalLoading.value = true;
        const { data: response } = await useFetch({
            services: putMutationsTable,
            options: {
                id: id,
                body: [
                    {
                        statusApproval: statusApproval.value,
                    },
                ],
            },
        });
        if (response.value.message === "Success") {
            isLoading.value = false;
            showSuccessModal.value = true;

            setTimeout(() => {
                routeName.push({ name: "approval" });
            }, 1000);
        }
    } catch (error) {
        errorMessages.value = error.response.data.message;
        isLoading.value = false;
        showErrorModal.value = true;
    } finally {
        modalLoading.value = false;
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

const listLog = ref([
    { date: "7 Agustus 2023", description: "Approve by BU Head Penerima" },
    { date: "8 Agustus 2023", description: "Approve by HRD" },
    { date: "9 Agustus 2023", description: "Approve by HRD" },
    { date: "10 Agustus 2023", description: "Approve by HRD" },
    { date: "11 Agustus 2023", description: "Approve by HRD" },
]);

const listInfo = ref([
    "Perusahaan ",
    "Jabatan ",
    "Kelas Jabatan ",
    "Business Units",
    "Cost Center ",
    "Lokasi Kerja ",
    "Melapor Ke ",
    "Immediate Manager",
    "Tunjangan",
]);

const statusLama = ref([
    "1450 CP Prima - Jakarta (HO)",
    "Specialist Organization Development",
    "4A",
    "Organization Development",
    "1450 145766 HR Corporate",
    "DKI Jakarta_SCBD",
    "Panca Dias Purnomo - 22000130",
    "Panca Dias Purnomo - 22000130",
    [
        {
            no: "1",
            tunjangan: "Transportasi",
            total: " 1.000.000",
        },
        {
            no: "2",
            tunjangan: "Transportasi",
            total: " 1.000.000",
        },
    ],
]);

const statusBaru = ref([
    "1450 CP Prima - Jakarta 0401",
    "-",
    "4A",
    "Center of Excellence",
    "-",
    "-",
    "22200169 - A.A Sagung ",
    "Panca Dias Purnomo - 22000131",
    [
        {
            no: "1",
            tunjangan: "Transportasi",
            total: " 1.000.000",
        },
        {
            no: "2",
            tunjangan: "Transportasi",
            total: " 1.000.000",
        },
    ],
]);

watchEffect(() => {
    if (data.value) {
        statusLama.value[0] = data.value.companyFr;
        statusBaru.value[0] = data.value.companyTo;

        statusLama.value[1] = data.value.positionFr;
        statusBaru.value[1] = data.value.positionTo;

        statusLama.value[2] = data.value.levelFr;
        statusBaru.value[2] = data.value.levelTo;

        statusLama.value[3] = data.value.buFr;
        statusBaru.value[3] = data.value.buTo;

        statusLama.value[4] = data.value.ccFr;
        statusBaru.value[4] = data.value.ccTo;

        statusLama.value[5] = data.value.locFr;
        statusBaru.value[5] = data.value.locTo;

        statusLama.value[6] = data.value.spvFr;
        statusBaru.value[6] = data.value.spvTo;

        statusLama.value[7] = data.value.mgrFr;
        statusBaru.value[7] = data.value.mgrTo;

        listLog.value = data?.value?.progress?.map((item) => {
            return {
                date: item?.docstep_status,
                description: item?.step_description,
            };
        });
    }
});
</script>
