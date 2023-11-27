<template>
    <div>
        <a @click="$router.back()">
            <UIButton :icon="IconChevronLeft" :variant="'secondary'">
                Buat form evaluasi baru
            </UIButton>
        </a>

        <UIDivider />

        <div class="mt-10">
            <BasicForm>
                <BasicCard
                    @tooltip="openInfo"
                    title="FORM EVALUASI"
                    tooltip="true"
                >
                    <ToolTip v-if="tooltip" class="left-[710px] -top-10">
                        <p class="font-semibold">Catatan</p>
                        <ol class="space-y-2 list-decimal">
                            <li v-for="note in listInfoForm" :key="note">
                                <span v-html="note"></span>
                            </li>
                        </ol>
                    </ToolTip>
                    <div class="px-10 py-5">
                        <!-- form basic -->
                        <div class="w-[900px] mb-10">
                            <FormInputBasic
                                label="Nama & NIK"
                                :icon="IconMagnifier"
                            />

                            <div class="flex gap-x-7">
                                <FormInputBasic label="Jabatan" />
                                <FormInputBasic label="Divisi / Departement" />
                            </div>
                            <div class="flex gap-x-7">
                                <FormInputBasic
                                    label="Tanggal Masuk"
                                    type="date"
                                />
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

                        <div
                            class="flex justify-between w-full my-10 text-start"
                        >
                            <div class="flex gap-x-3">
                                <p class="font-bold uppercase">
                                    Pencapaian Target
                                </p>
                                <p class="text-[#0A70A9]">
                                    (maximum score: 75)
                                </p>
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
                                    <div
                                        class="flex justify-center w-full h-full text-center gap-x-5"
                                    >
                                        Score Max

                                        <button @click="openInfoScoreMax">
                                            <div
                                                class="flex items-center justify-center w-5 h-5 border-2 border-black rounded-full"
                                            >
                                                !
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <ToolTip
                                    v-if="tooltipScoreMax"
                                    class="-top-9 left-[50px]"
                                >
                                    <ol class="space-y-2 list-decimal">
                                        <li
                                            v-for="note in listInfoScore"
                                            :key="note"
                                        >
                                            <span class="text-sm"
                                                >{{ note }}
                                            </span>
                                        </li>
                                    </ol>
                                </ToolTip>

                                <div class="flex w-full" v-for="i in 3">
                                    <div
                                        class="w-[20%] text-center h-full py-4 border border-black"
                                    >
                                        {{ i }}
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
                                        ACTUAL ACHIEVEMENT
                                    </div>
                                    <div
                                        class="flex justify-center w-full h-full text-center gap-x-5"
                                    >
                                        Score

                                        <button @click="openInfoScore">
                                            <div
                                                class="flex items-center justify-center w-5 h-5 border-2 border-white rounded-full"
                                            >
                                                !
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <ToolTip
                                    v-if="tooltipScore"
                                    class="-top-8 left-8"
                                >
                                    <ol class="space-y-2 list-decimal">
                                        <li
                                            v-for="note in listInfoScore"
                                            :key="note"
                                        >
                                            <span class="text-sm"
                                                >{{ note }}
                                            </span>
                                        </li>
                                    </ol>
                                </ToolTip>

                                <div class="flex w-full" v-for="i in 3">
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
                            </div>
                        </div>
                        <div
                            class="flex justify-end w-full mb-10 font-semibold gap-x-20"
                        >
                            <p>Total Score:</p>
                            <p>-</p>
                        </div>

                        <UIDivider />

                        <!-- form penilaian -->

                        <div
                            class="flex justify-between w-full mt-10 mb-5 text-start"
                        >
                            <div class="flex gap-x-3">
                                <p class="font-bold uppercase">
                                    PENILAIAN KOMPETENSI INTI
                                </p>
                                <p class="text-[#0A70A9]">
                                    (maximum score: 25)
                                </p>
                            </div>
                            <div>
                                <p>download contoh</p>
                            </div>
                        </div>
                        <p class="mb-10">
                            Score diisi dengan angka 1-5
                            <button @click="openInfoScoreKompetensi">
                                <div
                                    class="flex items-center justify-center w-5 h-5 border-2 rounded-full border-accent-1"
                                >
                                    <span class="text-accent-1">!</span>
                                </div>
                            </button>
                        </p>
                        <ToolTip
                            v-if="tooltipScoreKompetensi"
                            class="-top-16 left-[260px]"
                        >
                            <ol class="space-y-2 list-decimal">
                                <li
                                    v-for="note in listInfoScoreKompetensi"
                                    :key="note"
                                >
                                    <span class="text-sm">{{ note }} </span>
                                </li>
                            </ol>
                        </ToolTip>

                        <div class="flex justify-between w-full gap-x-5">
                            <div class="w-1/2">
                                <div
                                    class="flex p-3 font-semibold uppercase bg-accent-2"
                                >
                                    <div class="w-full h-full text-center">
                                        KOMPETENSI INTI
                                    </div>
                                </div>

                                <div
                                    v-for="i in 5"
                                    class="flex w-full"
                                    :key="i"
                                >
                                    <div
                                        class="items-start w-full p-4 border border-black h-[150px]"
                                    >
                                        <p class="font-semibold">
                                            Prioritize Customer /Prioritaskan
                                            Pelanggan
                                        </p>
                                        <p class="font-light">
                                            Always put customer satisfaction as
                                            priority/Selalu mengutamakan
                                            kepuasan pelanggan)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="w-1/2">
                                <div
                                    class="flex p-3 font-semibold text-white uppercase bg-accent-1"
                                >
                                    <div class="w-full h-full text-center">
                                        URAIAN HASIL PENILAIAN
                                    </div>
                                    <div class="text-end pr-5 w-[25%]">
                                        Score
                                    </div>
                                </div>

                                <div
                                    v-for="i in 5"
                                    class="flex w-full h-[150px]"
                                    :key="i"
                                >
                                    <div
                                        class="w-full h-full p-4 border border-black"
                                    >
                                        <input
                                            placeholder="fill here"
                                            type="text"
                                        />
                                    </div>
                                    <div
                                        class="h-full p-4 border border-black w-[20%]"
                                    >
                                        <input class="w-full" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            class="flex justify-end w-full my-10 font-semibold gap-x-20"
                        >
                            <p>Total Score:</p>
                            <p>-</p>
                        </div>

                        <UIDivider />

                        <!-- form akhir  -->
                        <div
                            class="flex items-start justify-between max-w-[500px] my-10"
                        >
                            <div class="flex flex-col items-start gap-y-5">
                                <div class="flex justify-between gap-x-5">
                                    <p class="font-semibold">
                                        PENILAIAN AKHIR (GRAND TOTAL SCORE)
                                    </p>
                                    <button>-</button>
                                </div>
                                <div class="flex items-center gap-x-5">
                                    <p>
                                        Berdasarkan penilaian diatas perkenankan
                                        kami mengajukan karyawan tersebut untuk
                                        :
                                    </p>

                                    <!-- dropdown  -->
                                    <FormDropdown
                                        :dropdownOptions="[
                                            'Diangkat menjadi karyawan tetap',
                                            'Diperpanjang masa kontraknya',
                                            'Diakhiri hubungan kerjanya',
                                        ]"
                                        :selectedOptionText="selectedOption"
                                        @update:selectedOptionText="
                                            handleSelectedOptionUpdate
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </BasicCard>
                <div
                    class="flex items-center justify-start w-full mt-5 gap-x-4"
                >
                    <UIButton variant="form" class="w-[200px]">
                        Submit
                    </UIButton>
                    <UIButton variant="form" class="w-[200px]">
                        Simpan ke Draft
                    </UIButton>
                </div>
            </BasicForm>
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
import FormDropdown from "../../components/FormDropdown.vue";
import ToolTip from "../../components/ToolTip.vue";

const tooltip = ref(false);
const tooltipScore = ref(false);
const tooltipScoreMax = ref(false);
const tooltipScoreKompetensi = ref(false);

const listInfoForm = [
    "Penilaian masa percobaan/PKWTT <b> paling lambat  3 (tiga) minggu sebelumnya </b> sudah diterima oleh HR Services area",
    "Penilaian masa kontrak/PKWT <b> paling lambat 1,5 (satu setengah) bulan sebelumnya</b> sudah diterima oleh HR Services area",
    "Total nilai dibawah<b> 70 diakhiri hubungan kerjanya </b>",
];

const listInfoScore = [
    "Tentukan bobot nilai di setiap dari setiap point target utama",
    "Contoh, bobot target no 1 adalah 20",
    "Nilai akhir bobot jika ditambahkan semua maksimal adalah 75",
];

const listInfoScoreKompetensi = [
    "Sangat Kurang",
    "Kurang",
    "Cukup",
    "Baik",
    "Sangat Baik",
];

const selectedOption = ref("Pilih salah satu");

const handleSelectedOptionUpdate = (newOption) => {
    selectedOption.value = newOption;
};

const openInfo = () => {
    tooltip.value = !tooltip.value;
};

const openInfoScore = () => {
    tooltipScore.value = !tooltipScore.value;
};

const openInfoScoreMax = () => {
    tooltipScoreMax.value = !tooltipScoreMax.value;
};

const openInfoScoreKompetensi = () => {
    tooltipScoreKompetensi.value = !tooltipScoreKompetensi.value;
};
</script>
