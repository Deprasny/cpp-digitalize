<template>
    <div>
        <a @click="$router.back()">
            <UIButton :icon="IconChevronLeft" :variant="'secondary'">
                Buat form mutasi baru
            </UIButton>
        </a>

        <UIDivider />

        <div class="mt-10">
            <BasicCard title="FORM EVALUASI">
                <BasicForm class="px-10 py-5">
                    <!-- form basic -->
                    <div class="w-[900px] my-10">
                        <FormInputBasic
                            label="Nama & NIK"
                            :icon="IconMagnifier"
                        />

                        <div class="flex gap-x-7">
                            <FormInputBasic label="Jabatan" />
                            <FormInputBasic label="Divisi / Departement" />
                        </div>
                        <div class="flex gap-x-7">
                            <FormInputBasic label="Tanggal Masuk" type="date" />
                            <FormInputBasic label="usia" />
                        </div>
                        <div class="flex gap-x-7">
                            <FormInputBasic label="Level" type="date" />
                            <FormInputBasic label="Status Karyawan" />
                        </div>
                        <div class="flex gap-x-7">
                            <FormInputBasic label="Probation" type="date" />
                            <FormInputBasic label="-" />
                        </div>
                    </div>

                    <UIDivider />
                    <!-- form pencapaian -->

                    <div class="flex justify-between w-full my-10 text-start">
                        <div class="flex gap-x-3">
                            <p class="font-bold uppercase">Pencapaian Target</p>
                            <p class="text-[#0A70A9]">(maximum score: 75)</p>
                        </div>
                        <div>
                            <p>download contoh</p>
                        </div>
                    </div>

                    <div class="flex justify-between w-full gap-x-5">
                        <div class="w-1/2">
                            <div
                                class="flex p-3 font-semibold uppercase bg-accent-2"
                            >
                                <div class="w-[20%]">No</div>
                                <div class="w-full h-full text-center">
                                    Target Utama
                                </div>
                                <div class="w-full h-full text-center">
                                    Score Max
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    1
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    2
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="flex w-full mb-10">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    3
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="w-1/2">
                            <div
                                class="flex p-3 font-semibold text-white uppercase bg-accent-1"
                            >
                                <div class="w-[20%]">No</div>
                                <div class="w-full h-full text-center">
                                    Target Utama
                                </div>
                                <div class="w-full h-full text-center">
                                    Score Max
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    1
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    2
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="flex w-full mb-10">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    3
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <UIDivider />

                    <!-- form penilaian -->

                    <div class="flex justify-between w-full my-10 text-start">
                        <div class="flex gap-x-3">
                            <p class="font-bold uppercase">
                                PENILAIAN KOMPETENSI INTI
                            </p>
                            <p class="text-[#0A70A9]">(maximum score: 25)</p>
                        </div>
                        <div>
                            <p>download contoh</p>
                        </div>
                    </div>

                    <div class="flex justify-between w-full gap-x-5">
                        <div class="w-1/2">
                            <div
                                class="flex p-3 font-semibold uppercase bg-accent-2"
                            >
                                <div class="w-[20%]">No</div>
                                <div class="w-full h-full text-center">
                                    Target Utama
                                </div>
                                <div class="w-full h-full text-center">
                                    Score Max
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    1
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    2
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="flex w-full mb-10">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    3
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="w-1/2">
                            <div
                                class="flex p-3 font-semibold text-white uppercase bg-accent-1"
                            >
                                <div class="w-[20%]">No</div>
                                <div class="w-full h-full text-center">
                                    Target Utama
                                </div>
                                <div class="w-full h-full text-center">
                                    Score Max
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    1
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    2
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="flex w-full mb-10">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    3
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <UIDivider />

                    <!-- form upload  -->
                    <div
                        class="flex items-start justify-between max-w-[500px] my-10"
                    >
                        <div class="flex flex-col items-start">
                            <p class="font-semibold">Lampiran</p>
                            <div class="flex items-center gap-x-5">
                                <UIButton
                                    variant="form"
                                    class="w-[200px]"
                                    type="file"
                                >
                                    Upload File
                                </UIButton>
                                <p class="text-xs">
                                    Mohon melampirkan struktur organisasi
                                    sebelum dan sesudah
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="flex items-center justify-end w-full mt-5 gap-x-4"
                    >
                        <UIButton variant="form" class="w-[200px]">
                            Submit
                        </UIButton>
                        <UIButton variant="form" class="w-[200px]">
                            Simpan ke Draft
                        </UIButton>
                    </div>
                </BasicForm>
            </BasicCard>
        </div>
    </div>
</template>

<script setup>
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import { ref } from "vue";
import BasicCard from "../../components/BasicCard.vue";
import BasicForm from "../../components/BasicForm.vue";
import FormInputBasic from "../../components/FormInputBasic.vue";
import IconMagnifier from "../../components/icons/IconMagnifying.vue";
import UIDivider from "../../components/ui/UIDivider.vue";
import UIButton from "../../components/ui/UIButton.vue";
import LabelForm from "../../components/LabelForm.vue";

const listInfo = ref([
    "Perusahaan ",
    "Jabatan ",
    "Kelas Jabatan ",
    "Divisi / Departemen ",
    "Cost Center ",
    "Lokasi Kerja ",
    "Melapor Ke ",
    "Immediate Manager",
]);

const statusLama = ref([
    "1450 CP Prima - Jakarta (HO)",
    "Specialist Organization Development",
    "4A",
    "Organization Development",
    "1450 145766 HR Corporate",
    "DKI Jakarta_SCBD",
    "Panca Dias Purnomo - 22000130",
    "22001234 - Panca Dias Purnomo",
]);

const statusBaru = ref([
    "1450 CP Prima - Jakarta 0401",
    "-",
    "4A",
    "Center of Excellence",
    "-",
    "-",
    "22200169 - A.A Sagung Purnama Dewi Pata",
    "22001234 - Panca Dias Purnomo",
]);

const headerTunjangan = ref(["Nama Tunjangan", "Nilai Tunjangan", "Net"]);
</script>
