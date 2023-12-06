<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex items-center justify-between w-full my-5">
            <UIButton
                @click="$router.back()"
                :icon="IconChevronLeft"
                :variant="'secondary'"
                >Evaluasi
            </UIButton>
            <router-link to="/evaluasi/create">
                <UIButton :icon="IconPlus">Buat form evaluasi baru </UIButton>
            </router-link>
        </div>
        <div
            class="flex justify-start w-full md:mb-7 mb-2 gap-x-4 text-[#0A70A9] text-xl ml-0 md:ml-10"
        >
            <UIButton variant="tab"
                ><div class="flex gap-2 md:gap-x-16 md:text-base text-sm">
                    <span>Kontrak</span>
                    <span>0</span>
                </div></UIButton
            >
            <UIButton variant="tab"
                ><div class="flex gap-2 md:gap-x-16 md:text-base text-sm">
                    <span>Probation</span>
                    <span>0</span>
                </div></UIButton
            >
        </div>
        <Table @onCellClick="handleDetail" :columns="columns" :data="data" />
    </div>
</template>

<script setup>
import Table from "@/components/BasicTable.vue";
import { createColumnHelper } from "@tanstack/table-core";
import { ref } from "vue";
import UIButton from "@/components/ui/UIButton.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import { useRouter } from "vue-router";
import { getFormattedDate } from "@/libs/util";

const router = useRouter();

const getRandomName = () => {
    const names = [
        "WANI MULYANI",
        "PAULIN FARIDA",
        "FEBI SURYATMI",
        "KAJEN BUDIMAN",
        "HANI UTAMI",
    ];

    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
};

const makeData = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            mutasi: `000${i}/Evaluasi/INDIVIDU/X/2023`,
            nama: getRandomName(),
            tanggal: getFormattedDate(new Date()),
            status: "Approved",
            jenis: "Individu",
            date: getFormattedDate(new Date()),
        });
    }
    return data;
};
const data = ref(makeData(4));

const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor((row) => row.mutasi, {
        id: "mutasi",
        cell: (info) => info.getValue(),
        header: () => "No Evaluasi",
    }),
    columnHelper.accessor((row) => row.nama, {
        id: "nama",
        cell: (info) => info.getValue(),
        header: () => "Nama Karyawan",
    }),
    columnHelper.accessor((row) => row.tanggal, {
        id: "tanggal",
        cell: (info) => info.getValue(),
        header: () => "Tanggal Pengajuan",
    }),
    columnHelper.accessor((row) => row.status, {
        id: "status",
        cell: (info) => info.getValue(),
        header: () => "Status",
    }),
    columnHelper.accessor((row) => row.date, {
        id: "date",
        cell: (info) => info.getValue(),
        header: () => "Due Date",
    }),
];

const handleDetail = (cell) => {
    router.push({ name: "evaluasi-detail", params: { id: cell.row.id } });
};
</script>
