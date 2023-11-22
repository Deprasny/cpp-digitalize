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
                <div class="my-5">
                    <div class="flex w-full py-4 px-7 text-start">
                        <div class="flex w-1/2">
                            <LabelForm
                                label="Nama & NIK"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">Zavira Andini - 21900133</p>
                        </div>
                    </div>
                    <div class="flex w-full py-4 px-7 text-start">
                        <div class="flex w-1/2">
                            <LabelForm
                                label="Jabatan"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">Specialist Lorem Ipsum</p>
                        </div>
                    </div>
                    <div class="flex w-full py-4 px-7 text-start">
                        <div class="flex w-1/2">
                            <LabelForm
                                label="Level"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">3B</p>
                        </div>
                    </div>
                    <div class="flex w-full py-4 px-7 text-start">
                        <div class="flex w-1/2">
                            <LabelForm
                                label="BU Head"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">Human Resources</p>
                        </div>
                    </div>
                    <div class="flex w-full py-4 px-7 text-start">
                        <div class="flex w-1/2">
                            <LabelForm
                                label="Divisi"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">Talent Management</p>
                        </div>
                    </div>
                    <div class="flex w-full py-4 px-7 text-start">
                        <div class="flex w-1/2">
                            <LabelForm
                                label="Cost Center"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">1450 - CP Prima Jakarta (HO)</p>
                        </div>
                    </div>
                    <div class="flex w-full py-4 px-7 text-start">
                        <div class="flex w-1/2">
                            <LabelForm
                                label="Usia"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">54 Tahun</p>
                        </div>
                    </div>
                    <div class="flex w-full py-4 px-7 text-start">
                        <div class="flex w-1/2">
                            <LabelForm
                                label="Year of Service"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">10 Tahun 10 Bulan</p>
                        </div>
                    </div>
                    <div class="flex w-full py-4 px-7 text-start">
                        <div class="flex w-1/2">
                            <LabelForm
                                label="Tanggal Pensiun"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">11 November 2023</p>
                        </div>
                    </div>
                </div>

                <UIDivider />

                <div
                    class="flex justify-between w-[40%] mx-5 items-baseline my-10"
                >
                    <div class="flex flex-col">
                        <p class="text-xl font-semibold uppercase">keputusan</p>
                        <p class="font-semibold text-accent-1">
                            Pensiun, Diganti
                        </p>
                    </div>
                    <div class="flex flex-col gap-y-3">
                        <p class="text-xl font-semibold uppercase">
                            CALON PENGGANTI
                        </p>
                        <p>1. Basuki Tjahaya Purnama</p>
                        <p>2. Caroline Bernadetta</p>
                    </div>
                </div>
                <UIDivider />

                <div
                    class="flex justify-between w-[40%] mx-5 items-baseline my-10"
                >
                    <div class="flex flex-col">
                        <p class="text-xl font-semibold uppercase">Catatan</p>
                        <p>-</p>
                    </div>
                </div>

                <div class="flex justify-end mx-10">
                    <UIButton variant="form"> Kembali </UIButton>
                </div>
            </BasicCard>

            <p class="mx-3 mt-1 font-semibold">Status:</p>
            <div class="flex flex-col w-[20%] gap-y-2">
                <div
                    v-for="(item, index) in listLog"
                    :key="index"
                    :class="{ 'last-item': index === listLog.length - 1 }"
                    class="flex h-[90px]"
                >
                    <div class="relative">
                        <p class="inline-block text-3xl text-[#0A70A9]">O</p>
                        <span
                            v-if="index !== listLog.length - 1"
                            class="absolute h-[70px] transform -translate-x-1/2 border-r-[3px] border-[#0A70A9] border-dotted left-[10px] top-8"
                            >&nbsp;</span
                        >
                    </div>
                    <div class="flex flex-col pt-1 ml-2 gap-y-2">
                        <p class="text-[#0A70A9]">{{ item.date }}</p>
                        <p class="text-lg">{{ item.description }}</p>
                    </div>
                </div>
            </div>
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
