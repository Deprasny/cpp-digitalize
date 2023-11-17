<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex items-center justify-between w-full my-5">
            <UIButton :icon="IconChevronLeft" :variant="'secondary'"
                >Mutasi
            </UIButton>
            <router-link to="/mutasi/create">
                <UIButton :icon="IconPlus">Buat form mutasi baru </UIButton>
            </router-link>
        </div>
        <Table @onCellClick="handleDetail" :columns="columns" :data="data" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import Table from "@/components/BasicTable.vue";
import { createColumnHelper } from "@tanstack/table-core";
import UIButton from "@/components/ui/UIButton.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const makeData = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            mutasi: `000${i}/MUTASI/INDIVIDU/X/2023`,
            nama: `User ${i}`,
            tanggal: new Date().toISOString(),
            status: "Approved",
            jenis: "Individu",
            date: new Date().toISOString(),
        });
    }
    return data;
};
const data = ref(makeData(20));

const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor((row) => row.mutasi, {
        id: "mutasi",
        cell: (info) => info.getValue(),
        header: () => "Mutasi no",
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
    columnHelper.accessor((row) => row.jenis, {
        id: "jenis",
        cell: (info) => info.getValue(),
        header: () => "Jenis",
    }),
    columnHelper.accessor((row) => row.date, {
        id: "date",
        cell: (info) => info.getValue(),
        header: () => "Date",
    }),
];

const handleDetail = (cell) => {
    router.push({ name: "mutasi-detail", params: { id: cell.row.id } });
};
</script>
