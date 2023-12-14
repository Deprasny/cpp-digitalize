<template>
    <div class="flex flex-col items-center">
        <div class="flex items-center justify-between w-full my-5">
            <UIButton
                @click="$router.back()"
                :icon="IconChevronLeft"
                variant="secondary"
                >Mutasi
            </UIButton>
            <router-link to="/mutasi/create">
                <UIButton :icon="IconPlus">Buat form mutasi baru </UIButton>
            </router-link>
        </div>

        <template v-if="!isLoading">
            <Table
                @onCellClick="handleDetail"
                :columns="columns"
                :data="data"
            />
        </template>
        <template v-else>
            <UILoader />
        </template>
    </div>

    <Modal
        v-if="errorModal"
        :isModalOpen="errorModal"
        @toggleModal="handleToggleModal"
        :modalTitle="errorModal"
        modalType="danger"
    />
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import Table from "@/components/BasicTable.vue";
import { createColumnHelper } from "@tanstack/table-core";
import UIButton from "@/components/ui/UIButton.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import { useRouter } from "vue-router";
import UILoader from "../../components/ui/UILoader.vue";

import useFetch from "../../hooks/useFetch";
import { getMutationsTable } from "../../services/mutation.services";
import Modal from "../../components/Modal.vue";

const router = useRouter();

const data = ref([]);

const errorModal = ref("");

const isLoading = ref(false);

onBeforeMount(async () => {
    isLoading.value = true;
    try {
        const { data: response } = await useFetch({
            services: getMutationsTable,
            options: {
                page: 1,
                limit: 10,
            },
        });

        data.value = response?.value;
    } catch (error) {
        errorModal.value = "Terjadi kesalahan saat mengambil data mutasi";
    } finally {
        isLoading.value = false;
    }
});

const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor((row) => row.no_mutasi, {
        id: "no_mutasi",
        cell: (info) => info.getValue(),
        header: () => "Mutasi no",
    }),
    columnHelper.accessor((row) => row.karyawan, {
        id: "karyawan",
        cell: (info) => info.getValue(),
        header: () => "Nama Karyawan",
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
    columnHelper.accessor((row) => row.jenis_mutasi, {
        id: "jenis_mutasi",
        cell: (info) => info.getValue(),
        header: () => "Jenis",
    }),
    columnHelper.accessor((row) => row.tgl_pengajuan, {
        id: "tgl_pengajuan",
        cell: (info) => info.getValue(),
        header: () => "Date",
    }),
    columnHelper.accessor((row) => row.draft, {
        id: "type",
        cell: (info) => (info.getValue() ? "Draft" : ""),
        header: () => "",
    }),
];

const handleToggleModal = () => {
    errorModal.value = "";
    router.push({ name: "dashboard" });
};

const handleDetail = (cell) => {
    const mut_id = cell.row.original?.mut_id;

    router.push({
        name: "mutasi-detail",
        params: { id: mut_id },
        query: {
            form_type: cell.row.original?.jenis_mutasi,
        },
    });
};
</script>
