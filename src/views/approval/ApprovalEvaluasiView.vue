<template>
    <div
        class="w-full py-10 flex justify-center items-center"
        v-if="isFetching"
    >
        <UILoader />
    </div>
    <Table
        @onCellClick="handleDetail"
        :columns="columns"
        :data="data"
        v-if="!isFetching && data?.length > 0"
    />
</template>

<script setup>
import { watchEffect } from "vue";
import { createColumnHelper } from "@tanstack/table-core";
import useGetListApprovalEvaluasi from "../../hooks/evaluasi/useGetListApprovalEvaluasi.js";
import UILoader from "../../components/ui/UILoader.vue";
import Table from "@/components/BasicTable.vue";
import { useRouter } from "vue-router";
import Modal from "../../components/Modal.vue";

const { data, isFetching, errorMessage, isError, revalidate } =
    useGetListApprovalEvaluasi();

const router = useRouter();

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor((row) => row.no_probation, {
        id: "no_probation",
        cell: (info) => info.getValue(),
        header: () => "No Evaluasi",
    }),
    columnHelper.accessor((row) => row.tgl_pengajuan, {
        id: "tgl_pengajuan",
        cell: (info) => info.getValue(),
        header: () => "Tanggal Pengajuan",
    }),
    columnHelper.accessor((row) => row.status, {
        id: "status",
        cell: (info) => info.getValue(),
        header: () => "Status",
    }),
];

const handleDetail = (cell) => {
    router.push({
        name: "evaluasi-detail-approval",
        params: { id: cell?.row?.original?.id },
    });
};
</script>
