<template>
    <template v-if="data.length > 0">
        <Table @onCellClick="handleDetail" :columns="columns" :data="data" />
    </template>
    <template v-else>
        <div class="flex items-center justify-center my-20">
            <p v-if="!isLoading" class="text-2xl">Tidak ada data</p>
            <UILoader v-if="isLoading" />
        </div>
    </template>
</template>

<script setup>
import { ref, onBeforeMount, watch } from "vue";
import Table from "@/components/BasicTable.vue";
import { createColumnHelper } from "@tanstack/table-core";
import useFetch from "../../hooks/useFetch";
import UILoader from "../../components/ui/UILoader.vue";
import { getMutationApprovalList } from "../../services/approval.services";
import { useRouter } from "vue-router";

const router = useRouter();

const isLoading = ref(false);

const data = ref([]);

const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor((row) => row.no_mutasi, {
        id: "no_mutasi",
        cell: (info) => info.getValue(),
        header: () => "No Mutasi",
    }),
    columnHelper.accessor((row) => row.jenis_mutasi, {
        id: "jenis_mutasi",
        cell: (info) => {
            const value = info.getValue();

            return value === "Group" ? "Kolektif" : value;
        },
        header: () => "Jenis Mutasi",
    }),
    columnHelper.accessor((row) => row.tgl_pengajuan, {
        id: "tgl_pengajuan",
        cell: (info) => info.getValue(),
        header: () => "Tanggal Pengajuan",
    }),
    columnHelper.accessor((row) => row.due_date, {
        id: "due_date",
        cell: (info) => info.getValue(),
        header: () => "Sampai Dengan",
    }),
    columnHelper.accessor((row) => row.status, {
        id: "status",
        cell: (info) => info.getValue(),
        header: () => "Status",
    }),
    columnHelper.accessor((row) => row.karyawan, {
        id: "karyawan",
        cell: (info) => info.getValue(),
        header: () => "Nama Karyawan",
    }),
    columnHelper.accessor((row) => row.date, {
        id: "date",
        cell: (info) => info.getValue(),
        header: () => "-",
    }),
];

onBeforeMount(async () => {
    isLoading.value = true;
    try {
        const { data: response } = await useFetch({
            services: getMutationApprovalList,
            options: {
                page: 1,
                limit: 10,
            },
        });

        data.value = response?.value?.data;
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
});

const handleDetail = (cell) => {
    router.push({
        name: "mutasi-detail",
        params: { id: cell.row.original?.mut_id },
        query: {
            type: "approval",
            form_type:
                cell.row.original?.jenis_mutasi === "Group"
                    ? "Kolektif"
                    : cell.row.original?.jenis_mutasi,
        },
    });
};
</script>
