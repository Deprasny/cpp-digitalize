<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex items-center justify-between w-full my-5">
            <UIButton
                @click="$router.back()"
                :icon="IconChevronLeft"
                :variant="'secondary'"
                >Butuh Approval
            </UIButton>
        </div>
        <div
            class="flex justify-start w-full -mb-7 gap-x-4 text-[#0A70A9] text-xl ml-10"
        >
            <UIButton v-for="data in filter" variant="tab"
                ><div class="flex gap-x-16">
                    <span>{{ data.label }}</span>
                    <span>{{ data.value }}</span>
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
            date: "New",
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
        header: () => "No Mutasi",
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
        header: () => "-",
    }),
];

const handleDetail = (cell) => {
    router.push({
        name: "pensiun-detail",
        params: { id: cell.row.id },
        query: { type: "approval" },
    });
};

const filter = ref([
    { label: "Mutasi", value: 10 },
    { label: "Evaluasi", value: 10 },
    { label: "Pensiun", value: 10 },
]);
</script>
