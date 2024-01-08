<template>
    <div
        class="flex items-center justify-center w-full py-10"
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

    <div
        class="flex items-center justify-center w-full py-10"
        v-if="!isFetching && data?.length === 0"
    >
        <p class="text-2xl">Tidak ada data</p>
    </div>

    <Modal
        v-if="isErrorModal"
        :isModalOpen="isErrorModal"
        @toggleModal="isErrorModal = false"
        modalTitle="Terjadi Kesalahan Saat Mengambil Data"
        modalType="danger"
    />
</template>

<script setup>
import { watchEffect, ref } from "vue";
import { createColumnHelper } from "@tanstack/table-core";
import useGetListApprovalEvaluasi from "../../hooks/evaluasi/useGetListApprovalEvaluasi.js";
import UILoader from "../../components/ui/UILoader.vue";
import Table from "@/components/BasicTable.vue";
import { useRouter } from "vue-router";
import Modal from "../../components/Modal.vue";

const isErrorModal = ref(false);

console.log(isErrorModal.value);

const { data, isFetching } = useGetListApprovalEvaluasi({
    onError: () => {
        isErrorModal.value = true;
    },
});

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
