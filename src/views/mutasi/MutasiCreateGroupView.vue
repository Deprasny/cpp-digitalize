<template>
    <div class="mt-28">
        <BasicForm>
            <BasicCard title="FORM MUTASI">
                <div class="px-10 py-5 w-full">
                    <!-- form basic -->
                    <div>
                        <div class="flex w-full gap-x-2 md:flex-row flex-col">
                            <FormInputBasic
                                label="Nama & NIK"
                                :icon="IconMagnifier"
                                v-model="nama"
                                @addName="addName"
                            />
                            <UIButton
                                variant="form"
                                @click="addName"
                                class="mt-9"
                                >Add NIK</UIButton
                            >
                        </div>
                        <div
                            v-if="enteredNames.length > 0"
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
                        <div class="flex gap-x-7 md:flex-row flex-col">
                            <FormInputBasic
                                label="Tanggal Efektif Mutasi"
                                type="date"
                            />
                            <FormInputBasic label="Alasan Mutasi" />
                        </div>
                    </div>

                    <!-- form status -->
                    <div class="overflow-x-auto">
                        <div
                            class="flex items-baseline justify-between my-10 w-[900px]"
                        >
                            <div class="flex flex-col items-start w-1/5">
                                <div class="py-1"></div>
                                <div
                                    v-for="list in listInfo"
                                    :key="list"
                                    class="w-full py-[17px] font-semibold"
                                >
                                    <LabelForm :label="list" />
                                </div>
                            </div>
                            <div
                                class="flex flex-col items-center flex-1 text-center"
                            >
                                <div
                                    class="w-full py-1 text-lg font-bold text-black bg-accent-2"
                                >
                                    STATUS LAMA
                                </div>
                                <div
                                    v-for="status in statusLama"
                                    :key="status"
                                    class="w-full py-4 border border-l-0 border-black last:border-b-[2px] h-[60px]"
                                >
                                    {{ status }}
                                </div>
                            </div>
                            <div
                                class="flex flex-col items-center flex-1 text-center"
                            >
                                <div
                                    class="w-full py-1 text-lg font-bold text-white bg-accent-1"
                                >
                                    STATUS BARU
                                </div>
                                <div
                                    v-for="status in statusBaru"
                                    :key="status"
                                    class="w-full py-4 border border-black border-r-2 last:border-b-[2px] h-[60px]"
                                >
                                    <Dropdown
                                        :dropdownOptions="status.options"
                                        :selectedOptionText="status.value"
                                        @update:selectedOptionText="
                                            status = $event
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <UIDivider />

                    <!-- form upload  -->
                    <div
                        class="flex items-start justify-between md:max-w-[500px] w-full my-10"
                    >
                        <div class="flex flex-col items-start">
                            <p class="font-semibold">Lampiran</p>
                            <div
                                class="flex md:items-center items-start gap-x-5 md:flex-row flex-col"
                            >
                                <UIButton
                                    variant="form"
                                    class="w-[200px]"
                                    type="file"
                                >
                                    Upload File
                                </UIButton>
                                <p class="text-xs">
                                    Mohon melampirkan struktur organisasi
                                    sebelum dan sesudah
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </BasicCard>
            <div
                class="flex items-center justify-start w-full mt-5 md:gap-x-4 gap-x-2"
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
            modalTitle="Anda yakin untuk submit Form Mutasi berikut? "
        />

        <Modal
            v-if="showSuccessModal"
            :isModalOpen="showSuccessModal"
            @toggleModal="showSuccessModal = false"
            modalTitle="Form Mutasi Anda telah berhasil disubmit"
            modalType="success"
        />
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
import Modal from "../../components/Modal.vue";
import { useModalStore } from "../../stores/index.js";
import Dropdown from "../../components/Dropdown.vue";
import {
    formLabelTitle,
    statusBaruDefaultValues,
    statusLamaDefaultValues,
} from "../../data/mutations.data";

const store = useModalStore();

const showSuccessModal = ref(false);

const handleSubmit = () => {
    store.toggleModal();
    showSuccessModal.value = true;
};

const nama = ref("");
const enteredNames = ref([]);

const addName = () => {
    enteredNames.value.push(nama.value);
    nama.value = "";
};

const removeName = (index) => {
    enteredNames.value.splice(index, 1);
};

const listInfo = ref(formLabelTitle);

const statusLama = ref(statusLamaDefaultValues);

const statusBaru = ref(statusBaruDefaultValues);
</script>
