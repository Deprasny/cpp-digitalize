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
                    <ToolTip
                        v-if="tooltip"
                        @close="openInfo"
                        class="left-[60%] -top-10"
                    >
                        <p class="font-semibold">Catatan</p>
                        <ol class="space-y-2 list-decimal">
                            <li v-for="note in listInfoForm" :key="note">
                                <span v-html="note"></span>
                            </li>
                        </ol>
                    </ToolTip>
                    <div class="px-10 py-5">
                        <!-- form basic -->
                        <div class="w-full mb-10">
                            <FormNIKAutocomplete v-model="selectedNIKValues" />

                            <FormEvaluasiItemWrapper>
                                <FormInputBasic
                                    label="Jabatan"
                                    :model-value="
                                        selectedNIKValues?.details?.posisi
                                    "
                                />
                                <FormInputBasic
                                    label="Divisi / Departement"
                                    :model-value="
                                        selectedNIKValues?.details?.busunit
                                    "
                                />
                            </FormEvaluasiItemWrapper>
                            <FormEvaluasiItemWrapper>
                                <FormInputBasic
                                    label="Tanggal Masuk"
                                    type="date"
                                    :model-value="
                                        selectedNIKValues?.details?.joindate
                                    "
                                />
                                <FormInputBasic label="usia" />
                            </FormEvaluasiItemWrapper>
                            <FormEvaluasiItemWrapper>
                                <FormInputBasic
                                    label="Level"
                                    :model-value="
                                        selectedNIKValues?.details?.level
                                    "
                                />
                                <FormInputBasic label="Status Karyawan" />
                            </FormEvaluasiItemWrapper>
                            <FormEvaluasiItemWrapper>
                                <FormInputBasic label="Probation" type="date" />
                            </FormEvaluasiItemWrapper>
                        </div>

                        <UIDivider />
                        <!-- form pencapaian -->

                        <FormTablePencapaian formAction="mutate" />

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
                            @close="openInfoScoreKompetensi"
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
                    <UIButton
                        variant="form"
                        class="w-[200px]"
                        @click="store.toggleModal"
                    >
                        Submit
                    </UIButton>
                    <UIButton variant="form" class="w-[200px]">
                        Simpan ke Draft
                    </UIButton>
                </div>
            </BasicForm>
            <Modal
                :isModalOpen="store.isModalOpen"
                @toggleModal="store.toggleModal"
                @submit="handleSubmit"
                modalTitle="Anda yakin untuk submit Form Evaluasi berikut?"
            />

            <Modal
                v-if="showSuccessModal"
                :isModalOpen="showSuccessModal"
                @toggleModal="showSuccessModal = false"
                modalTitle="Form Evaluasi Anda telah berhasil disubmit"
                modalType="success"
            />
        </div>
    </div>
</template>

<script setup>
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import IconDownload from "@/components/icons/IconDownload.vue";
import { ref } from "vue";
import BasicCard from "../../components/BasicCard.vue";
import BasicForm from "../../components/BasicForm.vue";
import FormInputBasic from "../../components/FormInputBasic.vue";
import IconMagnifier from "../../components/icons/IconMagnifying.vue";
import UIDivider from "../../components/ui/UIDivider.vue";
import UIButton from "../../components/ui/UIButton.vue";
import FormDropdown from "../../components/FormDropdown.vue";
import ToolTip from "../../components/ToolTip.vue";
import Modal from "../../components/Modal.vue";
import { useModalStore } from "../../stores/index.js";
import FormNIKAutocomplete from "../../components/FormNIKAutocomplete.vue";
import FormEvaluasiItemWrapper from "../../components/evaluasi/wrapper/FormEvaluasiItemWrapper.vue";
import FormTablePencapaian from "../../components/evaluasi/FormTablePencapaian.vue";

const store = useModalStore();

const showSuccessModal = ref(false);

const handleSubmit = () => {
    store.toggleModal();
    showSuccessModal.value = true;
};

const tooltip = ref(false);
const tooltipScore = ref(false);
const tooltipScoreMax = ref(false);
const tooltipScoreKompetensi = ref(false);

const selectedNIKValues = ref({});

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
