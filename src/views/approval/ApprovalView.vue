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
            class="flex justify-start w-full md:mb-7 mb-2 gap-x-4 text-[#0A70A9] text-xl md:ml-10 ml-0"
        >
            <UIButton v-for="data in filter" variant="tab"
                ><div class="flex gap-2 text-sm md:gap-x-16 md:text-base">
                    <span>{{ data.label }}</span>
                    <span>{{ data.value }}</span>
                </div></UIButton
            >
        </div>
        <template v-if="data.length > 0">
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
</template>

<script setup>
import { ref, onBeforeMount, watch } from "vue";
import Table from "@/components/BasicTable.vue";
import { createColumnHelper } from "@tanstack/table-core";
import UIButton from "@/components/ui/UIButton.vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import { useRouter } from "vue-router";
import UILoader from "@/components/ui/UILoader.vue";
import { getFormattedDate } from "@/libs/util";
import useFetch from "@/hooks/useFetch";
import { getMutationApprovalList } from "@/services/approval.services";

const router = useRouter();

const data = ref([]);

onBeforeMount(async () => {
    const { data: response } = await useFetch({
        services: getMutationApprovalList,
        options: {
            page: 1,
            limit: 10,
        },
    });

    data.value = response?.value?.data;
});

const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor((row) => row.no_mutasi, {
        id: "no_mutasi",
        cell: (info) => info.getValue(),
        header: () => "No Mutasi",
    }),
    columnHelper.accessor((row) => row.jenis_mutasi, {
        id: "jenis_mutasi",
        cell: (info) => info.getValue(),
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

const handleDetail = (cell) => {
    router.push({
        name: "mutasi-detail",
        params: { id: cell.row.original?.mut_id },
        query: { type: "approval" },
    });
};

const filter = ref([
    { label: "Mutasi", value: 10 },
    { label: "Evaluasi", value: 10 },
    { label: "Pensiun", value: 10 },
]);
</script>
