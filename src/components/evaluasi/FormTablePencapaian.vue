<template>
    <div
        class="flex justify-between w-full my-10 text-start md:flex-row flex-col gap-4"
        v-if="formAction === 'mutate'"
    >
        <div class="flex gap-x-3 md:flex-row flex-col gap-2">
            <p class="font-bold uppercase">Pencapaian Target</p>
            <p class="text-[#0A70A9] text-sm md:text-base">
                (maximum score: 75)
            </p>
        </div>
        <div class="flex gap-x-5 text-sm md:text-base">
            <p>Download contoh</p>
            <IconDownload />
        </div>
    </div>

    <div v-else class="w-full font-semibold text-lg">
        PENILAIAN CAPAIAN TARGET
    </div>

    <div class="overflow-auto">
        <div class="flex w-full max-w-6xl min-w-[900px] gap-2">
            <div class="w-1/2">
                <FormHeaderPenpacapian
                    :formAction="formAction"
                    headerLabel="TARGET UTAMA"
                    headerValue="Score Max"
                    :tooltip-ref="tooltipScoreMax"
                    :tooltip-content="listInfoScore"
                    :on-toggle-tooltip="openInfoScoreMax"
                    type="target"
                />

                <FormInputTablePencapaian
                    :formAction="formAction"
                    v-for="(val, index) in inputTarget"
                    :number="index + 1"
                    :inputLabel="val.inputLabel"
                    :inputValue="val.inputVal"
                    @update:inputLabel="(value) => (val.inputLabel = value)"
                    @update:inputValue="(value) => (val.inputVal = value)"
                />
            </div>

            <div class="w-1/2 relative">
                <FormHeaderPenpacapian
                    :formAction="formAction"
                    headerLabel="ACTUAL ACHIVEMENT"
                    headerValue="Score"
                    :tooltip-ref="tooltipScore"
                    :tooltip-content="listInfoScore"
                    :on-toggle-tooltip="openInfoScore"
                    type="actual"
                />

                <FormInputTablePencapaian
                    :formAction="formAction"
                    v-for="(val, index) in inputActual"
                    :number="index + 1"
                    :inputLabel="val.inputLabel"
                    :inputValue="val.inputVal"
                    @update:inputLabel="(value) => (val.inputLabel = value)"
                    @update:inputValue="(value) => (val.inputVal = value)"
                />
            </div>
            <div
                class="relative h-full pt-3 flex-col gap-1 flex"
                v-if="formAction === 'mutate'"
            >
                <button
                    class="w-6 h-6 grid place-items-center border rounded-full bg-white"
                    @click="addColumns"
                    v-if="inputTarget.length < 5"
                >
                    <component :is="IconPlus" class="text-xs text-accent-1" />
                </button>

                <button
                    v-if="inputTarget.length > 1"
                    class="w-6 h-6 grid place-items-center border rounded-full bg-white"
                    @click="removeColumns"
                >
                    <component :is="IconMinus" class="text-xs text-accent-1" />
                </button>
            </div>
        </div>
    </div>

    <div class="flex justify-end w-full my-10 font-semibold">
        <div
            class="flex gap-5"
            :class="{
                '': formAction === 'mutate',
                'bg-accent-1 p-2 text-white': formAction !== 'mutate',
            }"
        >
            <p class="font-medium">Total Score:</p>
            <p class="font-semibold">30</p>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import FormInputTablePencapaian from "./FormInputTablePencapaian.vue";
import ToolTip from "../ToolTip.vue";
import FormHeaderPenpacapian from "./FormHeaderPenpacapian.vue";
import IconPlus from "../icons/IconPlus.vue";
import IconMinus from "../icons/IconMinus.vue";
import IconDownload from "../icons/IconDownload.vue";

const {} = defineProps(["formAction"]);

const tooltipScore = ref(false);
const tooltipScoreMax = ref(false);

const inputTarget = ref([
    {
        inputVal: "",
        inputLabel: "",
    },
    {
        inputVal: "",
        inputLabel: "",
    },
    {
        inputVal: "",
        inputLabel: "",
    },
]);

const inputActual = ref([
    {
        inputVal: "",
        inputLabel: "",
    },
    {
        inputVal: "",
        inputLabel: "",
    },
    {
        inputVal: "",
        inputLabel: "",
    },
]);

const listInfoScore = [
    "Tentukan bobot nilai di setiap dari setiap point target utama",
    "Contoh, bobot target no 1 adalah 20",
    "Nilai akhir bobot jika ditambahkan semua maksimal adalah 75",
];

const openInfoScore = () => {
    tooltipScore.value = !tooltipScore.value;
};

const openInfoScoreMax = () => {
    tooltipScoreMax.value = !tooltipScoreMax.value;
};

const addColumns = () => {
    if (inputTarget.value.length >= 5) return;

    inputTarget.value.push({
        inputVal: "",
        inputLabel: "",
    });

    inputActual.value.push({
        inputVal: "",
        inputLabel: "",
    });
};

const removeColumns = () => {
    inputTarget.value.pop();
    inputActual.value.pop();
};
</script>
