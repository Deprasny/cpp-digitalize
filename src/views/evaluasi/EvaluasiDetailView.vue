<template>
    <div>
        <a @click="$router.back()">
            <UIButton :icon="IconChevronLeft" :variant="'secondary'">
                Back
            </UIButton>
        </a>

        <UIDivider />
        <div class="flex my-16">
            <BasicCard
                title="0001/MUTASI/INDIVIDU/X/2023"
                variant="detail"
                class="w-[95%]"
            >
                <DetailWrapper>
                    <div class="flex w-full">
                        <LabelForm label="Nama & NIK">
                            <p class="w-full">
                                Zavira Andini - 21900133
                            </p></LabelForm
                        >
                    </div>
                    <div class="flex w-full">
                        <LabelForm label="Usia"
                            ><p class="w-full">27 Tahun</p>
                        </LabelForm>
                    </div>

                    <div class="flex w-full">
                        <LabelForm label="Jabatan">
                            <p class="w-full">
                                Specialist Organization Development
                            </p>
                        </LabelForm>
                    </div>
                    <div class="flex w-full">
                        <LabelForm label="Level">
                            <p class="w-full">4A</p></LabelForm
                        >
                    </div>

                    <div class="flex w-full">
                        <LabelForm label="Divisi/Department">
                            <p class="w-full">
                                Organization Development
                            </p></LabelForm
                        >
                    </div>

                    <div class="flex w-full">
                        <LabelForm label="Tanggal Masuk">
                            <p class="w-full">1 Januari 2023</p></LabelForm
                        >
                    </div>

                    <div class="flex w-fukk">
                        <LabelForm label="Periode">
                            <p class="w-full">
                                1 Januari 2023 - 31 Maret 2023
                            </p></LabelForm
                        >
                    </div>
                </DetailWrapper>

                <UIDivider />

                <!-- form penilaian -->

                <DetailWrapper>
                    <FormTablePencapaian />
                </DetailWrapper>

                <UIDivider />

                <!-- form PENILAIAN KOMPETENSI INTI -->
                <div class="mx-10">
                    <div
                        class="flex justify-between w-full mt-10 mb-5 text-start"
                    >
                        <div class="flex gap-x-3">
                            <p class="font-bold uppercase">
                                PENILAIAN KOMPETENSI INTI
                            </p>
                        </div>
                    </div>

                    <div class="flex justify-between w-full gap-x-5">
                        <div class="w-full">
                            <div
                                class="flex items-center p-3 font-semibold uppercase bg-accent-2"
                            >
                                <div class="w-full h-full text-center">-</div>
                                <div class="text-center w-[20%]">Score</div>
                            </div>

                            <div v-for="i in 6" class="flex w-full" :key="i">
                                <div
                                    class="items-center w-full p-4 border border-black min-h-[150px]"
                                >
                                    <p class="mb-5 font-semibold text-accent-1">
                                        Prioritize Customer /Prioritaskan
                                        Pelanggan
                                    </p>
                                    <ul
                                        v-for="i in 3"
                                        class="ml-5 text-sm list-disc"
                                    >
                                        <li>
                                            Always put customer satisfaction as
                                            priority/Selalu mengutamakan
                                            kepuasan pelanggan
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    class="border-l-0 p-4 border border-black w-[20%] flex items-center justify-center"
                                >
                                    <P class="text-2xl font-bold">30</P>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="flex justify-end w-full my-10 font-semibold text-white"
                    >
                        <div class="flex px-4 py-2 bg-accent-1 w-fit gap-x-10">
                            <p>Total Score:</p>
                            <p class="text-xl">60</p>
                        </div>
                    </div>
                </div>

                <UIDivider />

                <!-- form akhir  -->
                <div
                    class="flex items-start justify-between w-full mx-10 my-10"
                >
                    <div class="flex flex-col items-start gap-y-5">
                        <div class="flex justify-between gap-x-5">
                            <p class="font-semibold">
                                PENILAIAN AKHIR (GRAND TOTAL SCORE)
                            </p>
                            <button>-</button>
                        </div>
                        <div class="flex items-center gap-x-5">
                            <p class="font-semibold">Pengajuan Status:</p>
                            <p class="text-accent-1">
                                Diperpanjang masa kontraknya | selama 6 bulan
                            </p>
                        </div>
                        <div class="flex max-w-[800px]">
                            <p class="font-semibold w-[25%]">
                                Notes / Catatan:
                            </p>
                            <div class="flex flex-col gap-y-3">
                                <p v-for="i in 3">
                                    {{ i }}. Perlu meningkatkan kemampuan
                                    menyampaikan laporan dengan sistematis,
                                    padat, dan jelas
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end mx-10">
                    <UIButton @click="$router.back()" variant="form">
                        Kembali
                    </UIButton>
                </div>
            </BasicCard>

            <!-- status log -->
            <Log :data="listLog" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import UIButton from "@/components/ui/UIButton.vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import UIDivider from "@/components/ui/UIDivider.vue";
import BasicCard from "../../components/BasicCard.vue";
import LabelForm from "../../components/LabelForm.vue";
import Log from "../../components/Log.vue";

import DetailWrapper from "../../components/evaluasi/wrapper/DetailWrapper.vue";
import FormTablePencapaian from "../../components/evaluasi/formPencapaian/FormTablePencapaian.vue";

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
    "Divisi / Departemen ",
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
</script>
