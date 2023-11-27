<template>
    <div class="mt-28">
        <BasicForm>
            <BasicCard title="FORM MUTASI">
                <div class="px-10 py-5">
                    <!-- form basic -->
                    <div class="w-[900px]">
                        <FormInputBasic
                            label="Nama & NIK"
                            :icon="IconMagnifier"
                            v-model="values.nik"
                        />

                        <div class="flex gap-x-7">
                            <FormInputBasic label="Tanggal Masuk" type="date" />
                            <FormInputBasic label="Home Base" />
                        </div>
                        <div class="flex gap-x-7">
                            <FormInputBasic label="Tanggal Lahir" type="date" />
                            <FormInputBasic label="Pendidikan" />
                        </div>
                        <div class="flex gap-x-7">
                            <FormInputBasic
                                label="Tanggal Efektif Mutasi"
                                type="date"
                            />
                            <FormInputBasic
                                label="Alasan Mutasi"
                                v-model="values.mut_reason"
                            />
                        </div>
                    </div>

                    <!-- form status -->
                    <div class="flex items-baseline justify-between my-10">
                        <div class="flex flex-col items-start w-1/5">
                            <div class="py-1">-</div>
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
                                class="w-full py-1 text-lg font-bold bg-accent-2"
                            >
                                STATUS LAMA
                            </div>
                            <div
                                v-for="status in statusLama"
                                :key="status"
                                class="w-full py-4 border border-l-0 border-black"
                            >
                                {{ status }}
                            </div>
                            <div
                                class="flex justify-between w-full mt-10 bg-accent-2"
                            >
                                <div
                                    v-for="header in headerTunjangan"
                                    :key="header"
                                    class="w-full py-1 font-semibold border-black border-x"
                                >
                                    {{ header }}
                                </div>
                            </div>
                            <div
                                v-for="(_, index) in columns"
                                :key="index"
                                class="flex justify-between w-full"
                            >
                                <div class="relative">
                                    <div
                                        v-if="index === columns - 1"
                                        class="absolute top-1 -left-5"
                                    >
                                        <button
                                            v-if="columns > 1"
                                            @click="removeColumn"
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                                <div
                                    class="w-full py-1 font-semibold border border-black"
                                    v-for="i in 3"
                                >
                                    <input type="text" class="max-w-[150px]" />
                                </div>
                            </div>
                            <p class="self-start mt-5 font-semibold">
                                Total : 1.000.000
                            </p>
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
                                class="w-full py-4 border border-l-0 border-black last:border-b-[2px]"
                            >
                                {{ status }}
                            </div>

                            <div
                                class="flex justify-between w-full mt-10 bg-accent-1"
                            >
                                <div
                                    v-for="header in headerTunjangan"
                                    :key="header"
                                    class="w-full py-1 font-semibold text-white border-black border-x"
                                >
                                    {{ header }}
                                </div>
                            </div>

                            <div
                                v-for="(_, index) in columns"
                                :key="index"
                                class="flex justify-between w-full"
                            >
                                <div
                                    class="w-full py-1 font-semibold border border-black"
                                    v-for="i in 3"
                                >
                                    <input type="text" class="max-w-[150px]" />
                                </div>
                                <div class="relative">
                                    <div
                                        v-if="index === columns - 1"
                                        class="absolute top-2 -right-7"
                                    >
                                        <button
                                            v-if="columns < 5"
                                            @click="addColumn"
                                        >
                                            <div
                                                class="p-1 bg-red-600 rounded-full"
                                            >
                                                <component
                                                    :is="IconPlus"
                                                    class="text-xs text-white"
                                                />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p class="self-start mt-5 font-semibold">
                                Total : 1.000.000
                            </p>
                        </div>
                    </div>

                    <UIDivider />

                    <!-- form radio  -->
                    <div class="flex items-start justify-between w-full my-10">
                        <div class="flex flex-col items-start">
                            <p class="font-semibold">Keluarga</p>
                            <p class="mb-3 text-xs italic">
                                (Pilih salah satu)
                            </p>
                            <div class="flex gap-x-2">
                                <input type="radio" name="keluarga" />
                                <p>Ikut pindah kelokasi kerja baru</p>
                            </div>
                            <div class="flex gap-x-2">
                                <input type="radio" name="keluarga" />
                                <p>Ikut pindah kelokasi kerja baru</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-start">
                            <p class="font-semibold">Tunj. Perumahan</p>
                            <p class="mb-3 text-xs italic">
                                (Pilih salah satu)
                            </p>
                            <div class="flex gap-x-2">
                                <input type="radio" name="tunjangan" />
                                <p>Diambil Bulanan</p>
                            </div>
                            <div class="flex gap-x-2">
                                <input type="radio" name="tunjangan" />
                                <p>Diambil per 1 Tahun</p>
                            </div>
                            <div class="flex gap-x-2">
                                <input type="radio" name="tunjangan" />
                                <p>Diambil per 2 Tahun</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-start">
                            <p class="font-semibold">Transportasi Barang</p>
                            <p class="mb-3 text-xs italic">
                                (Pilih salah satu)
                            </p>
                            <div class="flex gap-x-2">
                                <input type="radio" name="barang" />
                                <p>Ambil Tunai</p>
                            </div>
                            <div class="flex gap-x-2">
                                <input type="radio" name="barang" />
                                <p>Difasilitasi Perusahaan</p>
                            </div>
                        </div>
                    </div>

                    <UIDivider />

                    <!-- form additional -->
                    <div class="w-[900px] my-10">
                        <div class="flex gap-x-7">
                            <FormInputBasic label="Sisa Cuti" />
                            <FormInputBasic label="Sisa Plafon Berobat" />
                        </div>
                        <div class="flex gap-x-7">
                            <FormInputBasic
                                label="Hak Karyawan Belum Terbayar"
                            />
                            <FormInputBasic label="Hutang ke Perusahaan" />
                        </div>
                        <FormInputBasic label="Keterangan" />
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
                                    Mohon melampirkan struktur organisasi
                                    sebelum dan sesudah
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </BasicCard>
            <div class="flex items-center justify-start w-full mt-5 gap-x-4">
                <UIButton variant="form" class="w-[200px]"> Submit </UIButton>
                <UIButton variant="form" class="w-[200px]">
                    Simpan ke Draft
                </UIButton>
            </div>
        </BasicForm>
    </div>
</template>
<script setup>
import { ref } from "vue";
import BasicCard from "../../components/BasicCard.vue";
import BasicForm from "../../components/BasicForm.vue";
import FormInputBasic from "../../components/FormInputBasic.vue";
import IconMagnifier from "../../components/icons/IconMagnifying.vue";
import IconPlus from "../../components/icons/IconPlus.vue";
import UIDivider from "../../components/ui/UIDivider.vue";
import UIButton from "../../components/ui/UIButton.vue";
import LabelForm from "../../components/LabelForm.vue";

const listInfo = ref([
    "Perusahaan ",
    "Jabatan ",
    "Kelas Jabatan ",
    "Business Units",
    "Cost Center ",
    "Lokasi Kerja ",
    "Melapor Ke ",
    "Immediate Manager",
]);

const statusLama = ref([
    "1450 CP Prima - Jakarta (HO)",
    "Specialist Organization Development",
    "4A",
    "Organization Development",
    "1450 145766 HR Corporate",
    "DKI Jakarta_SCBD",
    "Panca Dias Purnomo - 22000130",
    "22001234 - Panca Dias Purnomo",
]);

const statusBaru = ref([
    "1450 CP Prima - Jakarta 0401",
    "-",
    "4A",
    "Center of Excellence",
    "-",
    "-",
    "22200169 - A.A Sagung Purnama Dewi Pata",
    "22001234 - Panca Dias Purnomo",
]);

const columns = ref(1);

const addColumn = () => {
    columns.value++;
};

const removeColumn = () => {
    columns.value--;
};

const values = ref({
    nik: "",
    mut_type: "Individu",
    mut_reason: "",
});

const headerTunjangan = ref(["Nama Tunjangan", "Nilai Tunjangan", "Net"]);
</script>
