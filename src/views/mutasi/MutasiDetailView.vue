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
                        <div class="flex w-full">
                            <LabelForm
                                label="Nama & NIK"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">Zavira Andini - 21900133</p>
                        </div>
                        <div class="flex w-full">
                            <LabelForm
                                label="Tanggal Lahir"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">28 Mei 1997</p>
                        </div>
                    </div>
                    <div class="flex w-full py-4 px-7 text-start">
                        <div class="flex w-full">
                            <LabelForm
                                label="Tanggal Masuk"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">23/10/1999</p>
                        </div>
                        <div class="flex w-full">
                            <LabelForm
                                label="Pendidikan"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">S1</p>
                        </div>
                    </div>
                    <div class="flex w-full py-4 px-7 text-start">
                        <div class="flex w-1/2">
                            <LabelForm
                                label="Home Base"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">Jakarta</p>
                        </div>
                    </div>
                    <div class="flex w-full py-4 px-7 text-start">
                        <div class="flex w-1/2">
                            <LabelForm
                                label="Tanggal Efektif Mutasi"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">1 September 2023</p>
                        </div>
                    </div>
                    <div class="flex w-full py-4 px-7 text-start">
                        <div class="flex w-1/2">
                            <LabelForm
                                label="Alasan Mutasi"
                                value="John Doe"
                                class="w-full font-semibold"
                            />
                            <p class="w-full">Keperluan Organisasi</p>
                        </div>
                    </div>
                </div>

                <UIDivider />

                <!-- form status -->
                <div class="flex items-baseline justify-between mx-10 my-10">
                    <div class="flex flex-col items-start w-[25%]">
                        <div class="py-1">-</div>
                        <div
                            v-for="list in listInfo"
                            :key="list"
                            class="w-full py-[17px] font-semibold"
                        >
                            <LabelForm :label="list" />
                        </div>
                    </div>
                    <div class="flex flex-col items-center flex-1 text-center">
                        <div class="w-full py-1 text-lg font-bold bg-accent-2">
                            STATUS LAMA
                        </div>
                        <div
                            v-for="status in statusLama"
                            :key="status"
                            class="w-full py-4 border border-l-0 border-black last:border-b-[2px]"
                        >
                            <div v-if="Array.isArray(status)" class="mx-10">
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
                    <div class="flex flex-col items-center flex-1 text-center">
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
                            <div v-if="Array.isArray(status)" class="mx-10">
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

                <UIDivider />

                <!-- info-1 -->
                <div class="flex flex-col mx-10 my-10 gap-y-5">
                    <div class="flex w-1/2">
                        <LabelForm
                            label="Keluarga"
                            value="John Doe"
                            class="w-full font-semibold"
                        />
                        <p class="w-full">
                            Tidak ikut pindah kelokasi kerja baru
                        </p>
                    </div>
                    <div class="flex w-1/2">
                        <LabelForm
                            label="Tunj Rumah"
                            value="John Doe"
                            class="w-full font-semibold"
                        />
                        <p class="w-full">Diambil Bulanan</p>
                    </div>
                    <div class="flex w-1/2">
                        <LabelForm
                            label="Transportasi Barang"
                            value="John Doe"
                            class="w-full font-semibold"
                        />
                        <p class="w-full">-</p>
                    </div>
                </div>

                <UIDivider />

                <!-- info-2 -->
                <div class="flex flex-col mx-10 my-10 gap-y-5">
                    <div class="flex w-1/2">
                        <LabelForm
                            label="Sisa Cuti"
                            value="John Doe"
                            class="w-full font-semibold"
                        />
                        <p class="w-full">-</p>
                    </div>
                    <div class="flex w-1/2">
                        <LabelForm
                            label="Sisa Plafon Berobat"
                            value="John Doe"
                            class="w-full font-semibold"
                        />
                        <p class="w-full">-</p>
                    </div>
                    <div class="flex w-1/2">
                        <LabelForm
                            label="Hak Karyawan Belum Terbayar"
                            value="John Doe"
                            class="w-full font-semibold"
                        />
                        <p class="w-full">-</p>
                    </div>
                    <div class="flex w-1/2">
                        <LabelForm
                            label="Hutang ke Perusahaan"
                            value="John Doe"
                            class="w-full font-semibold"
                        />
                        <p class="w-full">-</p>
                    </div>
                    <div class="flex w-1/2">
                        <LabelForm
                            label="Keterangan"
                            value="John Doe"
                            class="w-full font-semibold"
                        />
                        <p class="w-full">-</p>
                    </div>
                </div>

                <UIDivider />

                <!-- info-3-->
                <div class="flex flex-col mx-10 my-10 gap-y-5">
                    <div class="flex w-1/2">
                        <LabelForm
                            label="Lampiran"
                            value="John Doe"
                            class="w-full font-semibold"
                        />
                        <p class="w-full">Lorem Ipsum.pdf</p>
                    </div>
                </div>

                <div class="flex justify-end mx-10">
                    <UIButton @click="$router.back()" variant="form">
                        Kembali
                    </UIButton>
                </div>
            </BasicCard>

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
</script>
