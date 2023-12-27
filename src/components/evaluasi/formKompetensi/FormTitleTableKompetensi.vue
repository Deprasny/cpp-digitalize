<template>
    <div class="flex justify-between w-full mt-10 mb-5 text-start">
        <div class="flex gap-x-3">
            <p class="font-bold uppercase">PENILAIAN KOMPETENSI INTI</p>
            <p class="text-[#0A70A9]">(maximum score: 25)</p>
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
        `
    >
        <ol class="space-y-2 list-decimal">
            <li v-for="note in listInfoScoreKompetensi" :key="note">
                <span class="text-sm">{{ note }} </span>
            </li>
        </ol>
    </ToolTip>
</template>

<script setup>
import { ref } from "vue";
import ToolTip from "../../ToolTip.vue";

const tooltipScoreKompetensi = ref(false);

const listInfoScoreKompetensi = [
    "Sangat Kurang",
    "Kurang",
    "Cukup",
    "Baik",
    "Sangat Baik",
];

const openInfoScoreKompetensi = () => {
    tooltipScoreKompetensi.value = !tooltipScoreKompetensi.value;
};
</script>
