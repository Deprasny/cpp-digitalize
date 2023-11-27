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
                title="0001/MUTASI/X/2023"
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
                    class="flex justify-between w-[45%] mx-5 items-baseline my-10"
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

                <div
                    v-if="approvalButton === 'approval'"
                    class="flex justify-end mx-10 gap-x-5"
                >
                    <UIButton variant="approve"> Approve </UIButton>
                    <UIButton variant="danger"> Reject </UIButton>
                </div>
                <div v-else class="flex justify-end mx-10 gap-x-5">
                    <UIButton variant="form"> Kembali </UIButton>
                </div>
            </BasicCard>

            <!-- Log -->
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

import { useRouter } from "vue-router";

const route = useRouter();

const approvalButton = route.currentRoute.value.query.type;

const listLog = ref([
    { date: "7 Agustus 2023", description: "Approve by BU Head Penerima" },
    { date: "8 Agustus 2023", description: "Approve by HRD" },
    { date: "9 Agustus 2023", description: "Approve by HRD" },
    { date: "10 Agustus 2023", description: "Approve by HRD" },
    { date: "11 Agustus 2023", description: "Approve by HRD" },
]);
</script>
