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

        <template v-if="data.length > 0">
            <Table
                @onCellClick="handleDetail"
                :columns="columns"
                :data="data"
            />
        </template>
        <template v-else>
            <p>Loading...</p>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeMount } from "vue";
import Table from "@/components/BasicTable.vue";
import { createColumnHelper } from "@tanstack/table-core";
import UIButton from "@/components/ui/UIButton.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import { useRouter } from "vue-router";

import useFetch from "../../hooks/useFetch";
import { getMutationsTable } from "../../services/mutation.services";

const router = useRouter();

const data = ref([]);

onBeforeMount(async () => {
    const { data: response } = await useFetch({
        services: getMutationsTable,
        options: {
            page: 1,
            limit: 10,
        },
    });

    data.value = response?.value;
});

const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor((row) => row.mut_req_no, {
        id: "mut_req_no",
        cell: (info) => info.getValue(),
        header: () => "Mutasi no",
    }),
    columnHelper.accessor((row) => row.employee_name, {
        id: "employee_name",
        cell: (info) => info.getValue(),
        header: () => "Nama Karyawan",
    }),
    columnHelper.accessor((row) => row.mut_date, {
        id: "mut_date",
        cell: (info) => info.getValue(),
        header: () => "Tanggal Pengajuan",
    }),
    columnHelper.accessor((row) => row.step_status, {
        id: "step_status",
        cell: (info) => info.getValue(),
        header: () => "Status",
    }),
    columnHelper.accessor((row) => row.mut_type, {
        id: "mut_type",
        cell: (info) => info.getValue(),
        header: () => "Jenis",
    }),
    columnHelper.accessor((row) => row.mut_date, {
        id: "mut_date",
        cell: (info) => info.getValue(),
        header: () => "Date",
    }),
];

const handleDetail = (cell) => {
    router.push({ name: "mutasi-detail", params: { id: cell.row.id } });
};
</script>
