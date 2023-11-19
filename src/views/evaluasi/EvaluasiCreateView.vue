<template>
    <div>
        <a @click="$router.back()">
            <UIButton :icon="IconChevronLeft" :variant="'secondary'">
                Buat form mutasi baru
            </UIButton>
        </a>

        <UIDivider />

        <div class="mt-10">
            <BasicCard title="FORM EVALUASI">
                <BasicForm class="px-10 py-5">
                    <!-- form basic -->
                    <div class="w-[900px] my-10">
                        <FormInputBasic
                            label="Nama & NIK"
                            :icon="IconMagnifier"
                        />

                        <div class="flex gap-x-7">
                            <FormInputBasic label="Jabatan" />
                            <FormInputBasic label="Divisi / Departement" />
                        </div>
                        <div class="flex gap-x-7">
                            <FormInputBasic label="Tanggal Masuk" type="date" />
                            <FormInputBasic label="usia" />
                        </div>
                        <div class="flex gap-x-7">
                            <FormInputBasic label="Level" type="date" />
                            <FormInputBasic label="Status Karyawan" />
                        </div>
                        <div class="flex gap-x-7">
                            <FormInputBasic label="Probation" type="date" />
                            <FormInputBasic label="-" />
                        </div>
                    </div>

                    <UIDivider />
                    <!-- form pencapaian -->

                    <div class="flex justify-between w-full my-10 text-start">
                        <div class="flex gap-x-3">
                            <p class="font-bold uppercase">Pencapaian Target</p>
                            <p class="text-[#0A70A9]">(maximum score: 75)</p>
                        </div>
                        <div>
                            <p>download contoh</p>
                        </div>
                    </div>

                    <div class="flex justify-between w-full gap-x-5">
                        <div class="w-1/2">
                            <div
                                class="flex p-3 font-semibold uppercase bg-accent-2"
                            >
                                <div class="w-[20%]">No</div>
                                <div class="w-full h-full text-center">
                                    Target Utama
                                </div>
                                <div class="w-full h-full text-center">
                                    Score Max
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    1
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    2
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="flex w-full mb-10">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    3
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="w-1/2">
                            <div
                                class="flex p-3 font-semibold text-white uppercase bg-accent-1"
                            >
                                <div class="w-[20%]">No</div>
                                <div class="w-full h-full text-center">
                                    Target Utama
                                </div>
                                <div class="w-full h-full text-center">
                                    Score Max
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    1
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    2
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="flex w-full mb-10">
                                <div
                                    class="w-[20%] text-center h-full py-4 border border-black"
                                >
                                    3
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex justify-end w-full mb-10 font-semibold gap-x-20"
                    >
                        <p>Total Score:</p>
                        <p>-</p>
                    </div>

                    <UIDivider />

                    <!-- form penilaian -->

                    <div
                        class="flex justify-between w-full mt-10 mb-5 text-start"
                    >
                        <div class="flex gap-x-3">
                            <p class="font-bold uppercase">
                                PENILAIAN KOMPETENSI INTI
                            </p>
                            <p class="text-[#0A70A9]">(maximum score: 25)</p>
                        </div>
                        <div>
                            <p>download contoh</p>
                        </div>
                    </div>
                    <p class="mb-10">Score diisi dengan angka 1-5</p>

                    <div class="flex justify-between w-full gap-x-5">
                        <div class="w-1/2">
                            <div
                                class="flex p-3 font-semibold uppercase bg-accent-2"
                            >
                                <div class="w-full h-full text-center">
                                    KOMPETENSI INTI
                                </div>
                            </div>

                            <div v-for="i in 5" class="flex w-full" :key="i">
                                <div
                                    class="items-start w-full p-4 border border-black h-[150px]"
                                >
                                    <p class="font-semibold">
                                        Prioritize Customer /Prioritaskan
                                        Pelanggan
                                    </p>
                                    <p class="font-light">
                                        Always put customer satisfaction as
                                        priority/Selalu mengutamakan kepuasan
                                        pelanggan)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="w-1/2">
                            <div
                                class="flex p-3 font-semibold text-white uppercase bg-accent-1"
                            >
                                <div class="w-full h-full text-center">
                                    URAIAN HASIL PENILAIAN
                                </div>
                                <div class="text-end pr-5 w-[25%]">Score</div>
                            </div>

                            <div
                                v-for="i in 5"
                                class="flex w-full h-[150px]"
                                :key="i"
                            >
                                <div
                                    class="w-full h-full p-4 border border-black"
                                >
                                    <input
                                        placeholder="fill here"
                                        type="text"
                                    />
                                </div>
                                <div
                                    class="h-full p-4 border border-black w-[20%]"
                                >
                                    <input class="w-full" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="flex justify-end w-full my-10 font-semibold gap-x-20"
                    >
                        <p>Total Score:</p>
                        <p>-</p>
                    </div>

                    <UIDivider />

                    <!-- form akhir  -->
                    <div
                        class="flex items-start justify-between max-w-[500px] my-10"
                    >
                        <div class="flex flex-col items-start gap-y-5">
                            <div class="flex justify-between gap-x-5">
                                <p class="font-semibold">
                                    PENILAIAN AKHIR (GRAND TOTAL SCORE)
                                </p>
                                <button>-</button>
                            </div>
                            <div class="flex items-center gap-x-5">
                                <p>
                                    Berdasarkan penilaian diatas perkenankan
                                    kami mengajukan karyawan tersebut untuk :
                                </p>

                                <!-- dropdown  -->

                                <div
                                    class="relative shadow-xl -top-8"
                                    @click="toggleDropdown"
                                >
                                    <div
                                        class="absolute w-[300px] mt-2 bg-white border border-gray-500 rounded-md shadow-xs dropdown-content z-10"
                                    >
                                        <a href="#" class="block px-2 py-2">
                                            <span
                                                class="flex items-center justify-between"
                                            >
                                                <span
                                                    class="text-sm font-light text-gray-800"
                                                    >{{
                                                        selectedOption ||
                                                        "Pilih Individu / Group"
                                                    }}</span
                                                >
                                                <component
                                                    :is="IconChevronLeft"
                                                />
                                            </span>
                                        </a>

                                        <div v-show="isDropdownOpen">
                                            <div
                                                v-for="(
                                                    option, index
                                                ) in dropdownOptions"
                                                :key="index"
                                            >
                                                <div
                                                    class="block px-4 py-4 text-gray-800 hover:bg-line-gradient hover:border-l-accent-1 hover:border-2 hover:py-6 hover:text-accent-1 hover:font-semibold"
                                                    @click="
                                                        handleDropdownItemClick(
                                                            option
                                                        )
                                                    "
                                                >
                                                    {{ option }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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

const isDropdownOpen = ref(false);
const selectedOption = ref(null);
const dropdownOptions = ref(["Individu", "Group"]);

const toggleDropdown = () => {
    event.preventDefault();
    isDropdownOpen.value = !isDropdownOpen.value;
};

const handleDropdownItemClick = (option) => {
    selectedOption.value = option;
    isDropdownOpen.value = true;
};
</script>
