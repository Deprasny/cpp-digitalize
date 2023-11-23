<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex items-center justify-between w-full my-5">
            <UIButton
                @click="$router.back()"
                :icon="IconChevronLeft"
                :variant="'secondary'"
                >Pensiun
            </UIButton>
            <router-link to="/pensiun/create">
                <UIButton :icon="IconPlus">Buat form pensiun baru </UIButton>
            </router-link>
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

const makeData = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            mutasi: `000${i}/PENSIUN/X/2023`,
            nama: `User ${i}`,
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
        header: () => "No Pensiun",
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
    router.push({ name: "pensiun-detail", params: { id: cell.row.id } });
};
</script>
