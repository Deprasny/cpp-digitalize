<template>
    <div class="w-full h-full flex-col py-2">
        <div class="flex justify-between w-full mt-10 mb-5 text-start">
            <div
                class="flex gap-x-3"
                :class="{
                    'text-red-500': errors.length > 0,
                }"
            >
                <p class="font-bold uppercase">PENILAIAN KOMPETENSI INTI</p>
                <UILoader v-if="isLoadingMaxVal" class="w-5 h-5" />
                <p
                    v-else
                    class="text-[#0A70A9]"
                    :class="{
                        'text-red-500': errors.length > 0,
                    }"
                >
                    (maximum score: {{ maxValues || 0 }})
                </p>
            </div>
        </div>

        <p
            class="mb-2"
            :class="{
                'text-red-500': errors.length > 0,
            }"
        >
            Score diisi dengan angka 1-5
            <button @click="openInfoScoreKompetensi">
                <div
                    class="flex items-center justify-center w-5 h-5 border-2 rounded-full border-accent-1"
                >
                    <span class="text-accent-1">!</span>
                </div>
            </button>
        </p>

        <div
            v-if="errors?.length > 0"
            class="text-sm text-red-500 pt-2"
            v-for="error of errors"
            :key="error.$uid"
        >
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>

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
import { ref, defineProps } from "vue";
import ToolTip from "../../ToolTip.vue";
import UILoader from "../../ui/UILoader.vue";

const props = defineProps(["isLoadingMaxVal", "maxValues", "errors"]);

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
