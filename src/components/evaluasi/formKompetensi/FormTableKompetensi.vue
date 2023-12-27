<template>
    <FormTitleTableKompetensi />

    <div class="overflow-auto">
        <div class="flex max-w-6xl min-w-[900px] gap-2">
            <div class="w-1/2">
                <FormHeaderTableKompetensi
                    type="primary"
                    :data="listHeaderTableKompetensi"
                />

                <FormKompetensiIntiValue :data="dummyKompentensiInti" />
            </div>

            <div class="w-1/2">
                <FormHeaderTableKompetensi
                    type="secondary"
                    :data="listHeaderTableUraianHasil"
                />

                <FormInputKompetensi
                    :values="formKompetensiVal"
                    :on-get-values="(val) => getFormKomptensi(val)"
                />
            </div>
        </div>
    </div>

    <div class="flex justify-end w-full my-10 font-semibold gap-x-20">
        <p>Total Score:</p>
        <p>{{ totalScore }}</p>
    </div>
</template>

<script setup>
import FormHeaderTableKompetensi from "./FormHeaderTableKompetensi.vue";
import FormTitleTableKompetensi from "./FormTitleTableKompetensi.vue";
import {
    dummyKompentensiInti,
    listHeaderTableKompetensi,
    listHeaderTableUraianHasil,
} from "../../../data/evaluasi.data";
import FormKompetensiIntiValue from "./FormKompetensiIntiValue.vue";
import FormInputKompetensi from "./FormInputKompetensi.vue";
import { onMounted, ref, watchEffect } from "vue";

import { watchDebounced } from "@vueuse/core";
import useGetCompetence from "../../../hooks/evaluasi/useGetCompetence";

const values = ref([]);
const totalScore = ref(0);

const getFormKomptensi = (newVal) => {
    values.value = newVal;
};

const { data: competenceData } = useGetCompetence();

watchEffect(() => {
    if (competenceData.length) console.log(competenceData);
});
v;

watchDebounced(
    () => values?.value,
    (newVal) => {
        totalScore.value = newVal.reduce((acc, curr) => {
            return acc + curr.score;
        }, 0);
    },
    { debounce: 1000, deep: true }
);
</script>
