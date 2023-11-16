<template>
    <div class="mt-28">
        <BasicCard title="FORM MUTASI">
            <BasicForm class="px-10 py-5">
                <!-- form basic -->
                <div>
                    <div class="w-[485px]">
                        <FormInputBasic
                            label="Nama & NIK"
                            :icon="IconMagnifier"
                            v-model="nama"
                            @addName="addName"
                        />
                    </div>
                    <div
                        v-if="enteredNames"
                        class="flex flex-wrap w-full my-8 gap-x-4 gap-y-4"
                    >
                        <div
                            v-for="(name, index) in enteredNames"
                            :key="index"
                            class="text-black w-[270px] p-3 rounded-2xl shadow-xl px-6 flex justify-between relative overflow-hidden"
                        >
                            {{ name }}
                            <button
                                @click="removeName(index)"
                                class="absolute top-0 right-0 p-2 text-white bg-[#FB6255] cursor-pointer rounded-bl-full text-xs"
                            >
                                X
                            </button>
                        </div>
                    </div>
                    <div class="flex gap-x-7">
                        <FormInputBasic
                            label="Tanggal Efektif Mutasi"
                            type="date"
                        />
                        <FormInputBasic label="Alasan Mutasi" />
                    </div>
                </div>

                <!-- form status -->
                <div class="flex items-baseline justify-between my-10">
                    <div class="flex flex-col items-start w-1/5">
                        <div class="py-1">-</div>
                        <div
                            v-for="list in listInfo"
                            :key="list"
                            class="w-full py-4 font-semibold"
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
                            {{ status }}
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
                            {{ status }}
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
                                Mohon melampirkan struktur organisasi sebelum
                                dan sesudah
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-end w-full mt-5 gap-x-4">
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
</template>
<script setup>
import { ref } from "vue";
import BasicCard from "../../components/BasicCard.vue";
import BasicForm from "../../components/BasicForm.vue";
import FormInputBasic from "../../components/FormInputBasic.vue";
import IconMagnifier from "../../components/icons/IconMagnifying.vue";
import UIDivider from "../../components/ui/UIDivider.vue";
import UIButton from "../../components/ui/UIButton.vue";
import LabelForm from "../../components/LabelForm.vue";

const nama = ref("");
const enteredNames = ref([]);

const addName = () => {
    enteredNames.value.push(nama.value);
    nama.value = "";
    console.log(enteredNames.value);
};

const listInfo = ref([
    "Perusahaan ",
    "Jabatan ",
    "Kelas Jabatan ",
    "Divisi / Departemen ",
    "Cost Center ",
    "Lokasi Kerja ",
    "Melapor Ke ",
]);

const statusLama = ref([
    "1450 CP Prima - Jakarta (HO)",
    "Specialist Organization Development",
    "4A",
    "Organization Development",
    "1450 145766 HR Corporate",
    "DKI Jakarta_SCBD",
    "Panca Dias Purnomo - 22000130",
]);

const statusBaru = ref([
    "1450 CP Prima - Jakarta 0401",
    "-",
    "4A",
    "Center of Excellence",
    "-",
    "-",
    "22200169 - A.A Sagung Purnama Dewi Pata",
]);
</script>
