<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex items-center justify-between w-full my-5">
            <UIButton :icon="IconChevronLeft" :variant="'secondary'"
                >Evaluasi
            </UIButton>
            <router-link to="/evaluasi/create">
                <UIButton :icon="IconPlus">Buat form evaluasi baru </UIButton>
            </router-link>
        </div>
        <div
            class="flex justify-start w-full -mb-7 gap-x-4 text-[#0A70A9] text-xl ml-10"
        >
            <UIButton :variant="'tab'"
                ><div class="flex gap-x-16">
                    <span>Kontrak</span>
                    <span>0</span>
                </div></UIButton
            >
            <UIButton :variant="'tab'"
                ><div class="flex gap-x-16">
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

const router = useRouter();

const makeData = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            mutasi: `000${i}/Evaluasi/INDIVIDU/X/2023`,
            nama: `User ${i}`,
            tanggal: new Date().toISOString(),
            status: "Approved",
            jenis: "Individu",
            date: new Date().toISOString(),
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
