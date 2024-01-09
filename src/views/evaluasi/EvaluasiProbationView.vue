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
        :data="data?.data"
        v-if="!isFetching && data?.data?.length > 0"
    />
</template>

<script setup>
import Table from "@/components/BasicTable.vue";
import { createColumnHelper } from "@tanstack/table-core";
import { ref, watchEffect } from "vue";
import UIButton from "@/components/ui/UIButton.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import { useRouter } from "vue-router";
import { getFormattedDate } from "@/libs/util";
import useGetListEvaluasi from "../../hooks/evaluasi/useGetListEvaluasi";
import UILoader from "../../components/ui/UILoader.vue";

const router = useRouter();

const { data, errorMessage, isError, isFetching } = useGetListEvaluasi({
    params: {
        jenis: "probation",
    },
});

const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor((row) => row.prob_req_no, {
        id: "prob_req_no",
        cell: (info) => info.getValue(),
        header: () => "No Evaluasi",
    }),
    columnHelper.accessor((row) => row.nama_karyawan, {
        id: "nama_karyawan",
        cell: (info) => info.getValue(),
        header: () => "Nama Karyawan",
    }),
    columnHelper.accessor((row) => row.prob_date, {
        id: "prob_date",
        cell: (info) => info.getValue(),
        header: () => "Tanggal Pengajuan",
    }),
    columnHelper.accessor((row) => row.status, {
        id: "status",
        cell: (info) => info.getValue(),
        header: () => "Status",
    }),
    columnHelper.accessor((row) => row.due_date, {
        id: "due_date",
        cell: (info) => info.getValue(),
        header: () => "Due Date",
    }),
];

const handleDetail = (cell) => {
    router.push({
        name: "evaluasi-detail",
        params: { id: cell?.row?.original?.id },
    });
};
</script>
