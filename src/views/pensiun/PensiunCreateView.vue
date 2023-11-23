<template>
    <div>
        <a @click="$router.back()">
            <UIButton :icon="IconChevronLeft" :variant="'secondary'">
                Buat form mutasi baru
            </UIButton>
        </a>

        <UIDivider />

        <div class="mt-10">
            <BasicCard title="FORM PENSIUN">
                <BasicForm class="px-10 py-5">
                    <!-- form basic -->
                    <div class="w-[900px] my-10">
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
                    <div class="flex flex-col mt-10 mb-20">
                        <p class="mb-10 font-semibold">KEPUTUSAN</p>
                        <!-- dropdown  -->
                        <FormDropdown
                            class="w-[300px]"
                            :dropdownOptions="[
                                'Pensiun, Diganti',
                                'Pensiun, Tidak diganti',
                                'Diperpanjang Kontrak',
                            ]"
                            :selectedOptionText="selectedOption"
                            @update:selectedOptionText="
                                handleSelectedOptionUpdate
                            "
                        />
                    </div>

                    <UIDivider />

                    <!-- section 3 -->
                    <div class="my-10">
                        <FormTextArea label="Catatan" v-model="catatan" />
                    </div>

                    <div
                        class="flex items-center justify-end w-full mt-5 gap-x-4"
                    >
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

const selectedOption = ref("Pilih salah satu");

const handleSelectedOptionUpdate = (value) => {
    selectedOption.value = value;
};
</script>
