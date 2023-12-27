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
                        <div class="w-full mb-10">
                            <FormNIKAutocomplete
                                v-model="selectedNIKValues"
                                :custom-service="getEmployyeeByProb"
                            />

                            <FormEvaluasiItemWrapper>
                                <FormInputBasic
                                    disabled="true"
                                    label="Jabatan"
                                    :model-value="
                                        selectedNIKValues?.details?.posisi
                                    "
                                />
                                <FormInputBasic
                                    disabled="true"
                                    label="Divisi / Departement"
                                    :model-value="
                                        selectedNIKValues?.details?.busunit
                                    "
                                />
                            </FormEvaluasiItemWrapper>
                            <FormEvaluasiItemWrapper>
                                <FormInputBasic
                                    disabled="true"
                                    label="Tanggal Masuk"
                                    type="date"
                                    :model-value="
                                        selectedNIKValues?.details?.joindate
                                    "
                                />
                                <FormInputBasic
                                    disabled="true"
                                    label="usia"
                                    :model-value="
                                        selectedNIKValues?.details?.age
                                    "
                                />
                            </FormEvaluasiItemWrapper>
                            <FormEvaluasiItemWrapper>
                                <FormInputBasic
                                    disabled="true"
                                    label="Level"
                                    :model-value="
                                        selectedNIKValues?.details?.level
                                    "
                                />
                                <FormInputBasic
                                    disabled="true"
                                    label="Status Karyawan"
                                    :model-value="
                                        selectedNIKValues?.details?.empstatus
                                    "
                                />
                            </FormEvaluasiItemWrapper>
                            <FormEvaluasiItemWrapper>
                                <div class="w-full">
                                    <FormEvaluasiItemWrapper
                                        class="text-base font-semibold leading-5"
                                    >
                                        Probation
                                    </FormEvaluasiItemWrapper>

                                    <FormEvaluasiItemWrapper>
                                        <FormInputBasic
                                            type="date"
                                            placeholder="Dari"
                                        />
                                        <FormInputBasic
                                            type="date"
                                            placeholder="Sampai"
                                        />
                                    </FormEvaluasiItemWrapper>
                                </div>
                            </FormEvaluasiItemWrapper>
                        </div>

                        <UIDivider />
                        <!-- form pencapaian -->

                        <FormTablePencapaian formAction="mutate" />

                        <UIDivider />

                        <!-- form penilaian -->

                        <FormTableKompetensi />

                        <UIDivider />

                        <!-- form akhir  -->
                        <div
                            class="flex items-start justify-between my-10 w-full"
                        >
                            <div
                                class="flex flex-col items-start gap-12 w-full"
                            >
                                <FormEvaluasiItemWrapper
                                    class="md:items-center"
                                >
                                    <p class="font-semibold">
                                        PENILAIAN AKHIR (GRAND TOTAL SCORE)
                                    </p>
                                    <div
                                        class="bg-accent-1 px-10 py-2 text-white font-semibold md:w-auto md:h-auto w-[60px] flex justify-center items-center"
                                    >
                                        0
                                    </div>
                                </FormEvaluasiItemWrapper>
                                <FormEvaluasiItemWrapper
                                    class="md:items-center"
                                >
                                    <p class="max-w-[420px] min-w-full">
                                        Berdasarkan penilaian diatas perkenankan
                                        kami mengajukan karyawan tersebut untuk
                                    </p>

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
                                </FormEvaluasiItemWrapper>
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

import Modal from "../../components/Modal.vue";
import { useModalStore } from "../../stores/index.js";
import FormNIKAutocomplete from "../../components/FormNIKAutocomplete.vue";

import FormTableKompetensi from "../../components/evaluasi/formKompetensi/FormTableKompetensi.vue";
import ToolTip from "../../components/ToolTip.vue";
import FormTablePencapaian from "../../components/evaluasi/formPencapaian/FormTablePencapaian.vue";
import FormEvaluasiItemWrapper from "../../components/evaluasi/wrapper/formevaluasiitemwrapper.vue";
import { getEmployyeeByProb } from "../../services/form.services";

const store = useModalStore();

const payload = ref({});

const showSuccessModal = ref(false);

const handleSubmit = () => {
    store.toggleModal();
    showSuccessModal.value = true;
};

const tooltip = ref(false);

const selectedNIKValues = ref({});

const listInfoForm = [
    "Penilaian masa percobaan/PKWTT <b> paling lambat  3 (tiga) minggu sebelumnya </b> sudah diterima oleh HR Services area",
    "Penilaian masa kontrak/PKWT <b> paling lambat 1,5 (satu setengah) bulan sebelumnya</b> sudah diterima oleh HR Services area",
    "Total nilai dibawah<b> 70 diakhiri hubungan kerjanya </b>",
];
</script>
