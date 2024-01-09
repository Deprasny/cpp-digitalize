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
                                            :model-value="
                                                selectedNIKValues?.details
                                                    ?.joindate
                                            "
                                            disabled="true"
                                        />
                                        <FormInputBasic
                                            disabled="true"
                                            type="date"
                                            placeholder="Sampai"
                                            :model-value="
                                                selectedNIKValues?.details
                                                    ?.enddate
                                            "
                                        />
                                    </FormEvaluasiItemWrapper>
                                </div>
                            </FormEvaluasiItemWrapper>
                        </div>

                        <UIDivider />

                        <!-- form pencapaian -->

                        <div class="w-full py-20" v-if="isFetchingMaxScore">
                            <UILoader class="w-10 h-10" />
                        </div>
                        <FormTablePencapaian
                            v-else
                            formAction="mutate"
                            :on-get-total-values="getTotalKPIValues"
                            :on-get-values="getKPIValues"
                            :errors="validations.prob_score_kpi.$errors"
                            :maxValues="MAX_KPI"
                            :fetchingMaxVal="isFetchingMaxScore"
                        />

                        <UIDivider />

                        <!-- form penilaian -->

                        <FormTableKompetensi
                            :on-get-values="getCompetenceValues"
                            :on-get-total-values="getTotalCompetenceValues"
                            :is-loading-max-val="isFetchingMaxScore"
                            :max-values="MAX_COMP"
                            :score-list-values="listProbationScoreComp"
                            :fetching-score-list-values="
                                isFetchingListProbationScoreComp
                            "
                            :errors="validations.prob_score_comp.$errors"
                        />

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
                                        {{ payload.prob_score_final }}
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
                                        v-if="!loadingDropdownProbationData"
                                        :dropdownOptions="dropdownProbationData"
                                        :selectedOptionText="
                                            payload.result?.label
                                        "
                                        @update:selectedOptionText="
                                            payload.result = $event
                                        "
                                    />

                                    <UILoader v-else />
                                </FormEvaluasiItemWrapper>

                                <div
                                    class="flex flex-col gap-1 w-full"
                                    v-if="payload.result.value === '20'"
                                >
                                    <FormEvaluasiItemWrapper
                                        class="w-[300px] py-6"
                                    >
                                        <div
                                            class="w-full flex gap-2 items-center"
                                        >
                                            <Dropdown
                                                class="border border-black rounded-md"
                                                :dropdown-options="contractTime"
                                                :selected-option-text="
                                                    payload.contract_time?.label
                                                "
                                                @update:selected-option-text="
                                                    payload.contract_time =
                                                        $event
                                                "
                                                :is-loading="
                                                    isFetchingContractTime
                                                "
                                            />

                                            <p class="font-semibold">Bulan</p>
                                        </div>
                                    </FormEvaluasiItemWrapper>

                                    <FormNotes :on-get-values="getNotes" />
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
                        @click="handleSubmit({ isDraft: false })"
                    >
                        Submit
                    </UIButton>
                    <UIButton
                        variant="form"
                        class="w-[200px]"
                        @click="handleSubmit({ isDraft: true })"
                    >
                        Simpan ke Draft
                    </UIButton>
                </div>
            </BasicForm>
            <Modal
                :isModalOpen="store.isModalOpen"
                :is-loading="isLoading"
                @toggleModal="store.toggleModal"
                @submit="onMutate"
                modalTitle="Anda yakin untuk submit Form Evaluasi berikut?"
            />

            <Modal
                v-if="showSuccessModal"
                :isModalOpen="showSuccessModal"
                @toggleModal="showSuccessModal = false"
                modalTitle="Form Evaluasi Anda telah berhasil disubmit"
                modalType="success"
            />

            <Modal
                v-if="showErrorModal"
                :isModalOpen="showErrorModal"
                @toggleModal="
                    () => {
                        showErrorModal = false;
                    }
                "
                :modalTitle="errorMessage"
                modalType="danger"
            />
        </div>
    </div>
</template>

<script setup>
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";

import { computed, ref, watch, watchEffect } from "vue";
import BasicCard from "../../components/BasicCard.vue";
import BasicForm from "../../components/BasicForm.vue";
import FormInputBasic from "../../components/FormInputBasic.vue";
import IconMagnifier from "../../components/icons/IconMagnifying.vue";
import UIDivider from "../../components/ui/UIDivider.vue";
import UIButton from "../../components/ui/UIButton.vue";

import Modal from "../../components/Modal.vue";
import { useModalStore } from "../../stores/index.js";
import FormNIKAutocomplete from "../../components/FormNIKAutocomplete.vue";

import FormTableKompetensi from "../../components/evaluasi/formKompetensi/FormTableKompetensi.vue";
import ToolTip from "../../components/ToolTip.vue";
import FormTablePencapaian from "../../components/evaluasi/formPencapaian/FormTablePencapaian.vue";
import FormEvaluasiItemWrapper from "../../components/evaluasi/wrapper/FormEvaluasiItemWrapper.vue";
import { getEmployyeeByProb } from "../../services/form.services";

import useGetResultProbation from "../../hooks/evaluasi/useGetResultProbation";
import UILoader from "../../components/ui/UILoader.vue";
import { watchDebounced } from "@vueuse/core";
import useCreateProbations from "../../hooks/evaluasi/useCreateProbations";
import { useRouter } from "vue-router";
import FormNotes from "../../components/evaluasi/formNotes/FormNotes.vue";
import { getEvaluasiValidations } from "../../validations/evaluasi.validation";
import useGetFormProbationVal from "../../hooks/evaluasi/useGetFormProbationsVal";
import FormDropdown from "../../components/FormDropdown.vue";
import Dropdown from "../../components/Dropdown.vue";

const store = useModalStore();
const tooltip = ref(false);

const selectedNIKValues = ref({});
const listInfoForm = [
    "Penilaian masa percobaan/PKWTT <b> paling lambat  3 (tiga) minggu sebelumnya </b> sudah diterima oleh HR Services area",
    "Penilaian masa kontrak/PKWT <b> paling lambat 1,5 (satu setengah) bulan sebelumnya</b> sudah diterima oleh HR Services area",
    "Total nilai dibawah<b> 70 diakhiri hubungan kerjanya </b>",
];

const router = useRouter();

const payload = ref({
    kpi: [],
    nik: "",
    competence: [],
    prob_score_kpi: 0,
    prob_score_comp: 0,
    prob_score_final: 0,
    result: "",
    note: [],
    draft: false,
});

const { data: dropdownProbationData, isLoading: loadingDropdownProbationData } =
    useGetResultProbation();

const { maxScoreState, contractTimeState, listProbationScoreCompState } =
    useGetFormProbationVal({
        payload: payload?.value,
    });

const { MAX_COMP, MAX_KPI, isFetchingMaxScore } = maxScoreState;

const { contractTime, isFetchingContractTime } = contractTimeState;

const { listProbationScoreComp, isFetchingListProbationScoreComp } =
    listProbationScoreCompState;

const validations = getEvaluasiValidations({
    values: payload,
    maxScoreState: maxScoreState,
});

const { mutate, isLoading, errorMessage } = useCreateProbations({
    callback: {
        onSuccess: () => {
            store.toggleModal();
            showSuccessModal.value = true;
            setTimeout(() => {
                router.push({ name: "evaluasi" });
            }, 1000);
        },

        onError: () => {
            store.toggleModal();
            showErrorModal.value = true;
        },
    },
});

const showErrorModal = ref(false);
const showSuccessModal = ref(false);

const getKPIValues = (newVal) => {
    payload.value.kpi = newVal;
};

const getCompetenceValues = (newVal) => {
    payload.value.competence = newVal;
};

const getTotalKPIValues = (newVal) => {
    payload.value.prob_score_kpi = newVal;
};

const getTotalCompetenceValues = (newVal) => {
    payload.value.prob_score_comp = newVal;
};

const getNotes = (newVal) => {
    payload.value.note = newVal;
};

watchDebounced(
    () => selectedNIKValues.value?.value,
    (newVal) => {
        payload.value.nik = newVal;
    },
    { debounce: 1000 }
);

watchEffect(() => {
    console.log(listProbationScoreComp?.value);

    if (payload.value.prob_score_comp && payload.value.prob_score_kpi) {
        payload.value.prob_score_final =
            payload.value.prob_score_comp + payload.value.prob_score_kpi;
    }
});

const handleSubmit = async ({ isDraft }) => {
    const isValid = await validations.value.$validate();

    if (!isValid) {
        scrollTo(0, 0);
    } else {
        payload.value.draft = isDraft;
        store.toggleModal();
    }
};

const onMutate = () => {
    const transformValues = {
        ...payload.value,
        result: payload.value.result?.value,
    };

    mutate({
        body: transformValues,
    });
};
</script>
