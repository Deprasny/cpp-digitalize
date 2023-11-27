<template>
    <div>
        <a @click="$router.back()">
            <UIButton :icon="IconChevronLeft" :variant="'secondary'">
                Buat form pensiun baru
            </UIButton>
        </a>

        <UIDivider />

        <div class="mt-10">
            <BasicForm>
                <BasicCard title="FORM PENSIUN">
                    <div class="px-10 py-5">
                        <!-- form basic -->
                        <div class="w-[900px] mb -10">
                            <FormInputBasic
                                label="Nama & NIK"
                                :icon="IconMagnifier"
                            />

                            <div class="flex gap-x-7">
                                <FormInputBasic label="Jabatan" />
                                <FormInputBasic label="Level" />
                            </div>
                            <div class="flex gap-x-7">
                                <FormInputBasic label="BU Head" />
                                <FormInputBasic label="Divisi" />
                            </div>
                            <div class="flex gap-x-7">
                                <FormInputBasic label="Personal Area" />
                                <FormInputBasic label="Usia" />
                            </div>
                            <div class="flex gap-x-7">
                                <FormInputBasic label="Status" />
                                <FormInputBasic label="Tanggal Pensiun" />
                            </div>
                            <div class="flex gap-x-7">
                                <FormInputBasic label="Year of Service" />
                                <FormInputBasic label="-" />
                            </div>
                        </div>

                        <UIDivider />
                        <!-- section 2  -->
                        <div class="flex gap-x-10">
                            <div class="flex flex-col mt-10 mb-20">
                                <p class="font-semibold mb-9">KEPUTUSAN</p>
                                <div class="flex gap-x-10">
                                    <!-- dropdown  -->
                                    <FormDropdown
                                        class="w-[300px]"
                                        :dropdownOptions="[
                                            'Pensiun, Diganti',
                                            'Pensiun, Tidak diganti',
                                            'Diperpanjang Kontrak',
                                        ]"
                                        :selectedOptionText="
                                            selectedOptionKeputusan
                                        "
                                        @update:selectedOptionText="
                                            handleSelectedKeputusan
                                        "
                                    />
                                    <FormDropdown
                                        v-if="
                                            selectedOptionKeputusan ===
                                            'Diperpanjang Kontrak'
                                        "
                                        classes="min-w-[100px]"
                                        :dropdownOptions="[
                                            '1',
                                            '2',
                                            '3',
                                            '4',
                                            '5',
                                            '6',
                                            '7',
                                            '8',
                                            '9',
                                            '10',
                                        ]"
                                        :selectedOptionText="
                                            selectedOptionPeriode
                                        "
                                        @update:selectedOptionText="
                                            handleSelectedPeriode
                                        "
                                    />
                                </div>
                            </div>
                            <div
                                class="flex flex-col mt-10"
                                v-if="
                                    selectedOptionKeputusan ===
                                    'Pensiun, Diganti'
                                "
                            >
                                <div class="flex flex-col gap-x-5">
                                    <!-- dropdown  -->
                                    <div class="w-[285px]">
                                        <FormInputBasic
                                            label="CALON PENGGANTI"
                                            :icon="IconMagnifier"
                                            v-model="nama"
                                            @addName="addName"
                                            placeholder="Isi nama pengganti"
                                        />
                                    </div>
                                    <div
                                        v-if="enteredNames.length > 0"
                                        class="flex flex-wrap w-full my-5 gap-x-4 gap-y-4"
                                    >
                                        <div
                                            v-for="(
                                                name, index
                                            ) in enteredNames"
                                            :key="name"
                                            class="text-black w-[270px] p-3 rounded-2xl shadow-xl px-6 flex justify-between relative overflow-hidden"
                                        >
                                            {{ name }}
                                            <button
                                                :key="name"
                                                @click="() => removeName(index)"
                                                class="absolute top-0 right-0 p-2 text-white bg-[#FB6255] cursor-pointer rounded-bl-full text-xs"
                                            >
                                                X
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <UIDivider />

                        <!-- section 3 -->
                        <div class="my-10">
                            <FormTextArea label="Catatan" v-model="catatan" />
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
import FormTextArea from "../../components/FormTextArea.vue";

const nama = ref("");
const enteredNames = ref([]);

const addName = () => {
    enteredNames.value.push(nama.value);
    nama.value = "";
};
const removeName = (index) => {
    enteredNames.value.splice(index, 1);
};

const selectedOptionKeputusan = ref("Pilih salah satu");
const selectedOptionPeriode = ref("Pilih");

const handleSelectedKeputusan = (value) => {
    selectedOptionKeputusan.value = value;
};
const handleSelectedPeriode = (value) => {
    selectedOptionPeriode.value = value;
};
</script>
