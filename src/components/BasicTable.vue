<script setup>
import { ref, defineProps, defineEmits } from "vue";
import {
    getCoreRowModel,
    getPaginationRowModel,
    useVueTable,
    FlexRender,
} from "@tanstack/vue-table";

const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    data: {
        type: Array,
        required: true,
    },
    pageSize: {
        type: Number,
        default: 5,
    },
});

const table = useVueTable({
    columns: props.columns,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
        pagination: {
            pageIndex: 0,
            pageSize: props.pageSize,
        },
    },
});

const emit = defineEmits(["onCellClick"]);

const currentPage = ref(1);

function handlePageChange(newPage) {
    const pageCount = table.getPageCount();

    // Ensure the newPage is within valid bounds
    newPage = Math.max(1, Math.min(newPage, pageCount));

    currentPage.value = newPage;
    table.setPageIndex(newPage - 1);
}

function handlePageSizeChange(newPageSize) {
    table.setPageSize(newPageSize);
}
</script>

<template>
    <div class="w-full">
        <table
            class="w-full mx-5 shadow-xl table-fixed text-start hidden md:table"
        >
            <thead>
                <tr>
                    <th
                        class="p-5 font-bold first:rounded-tl-lg last:rounded-tr-lg bg-accent-2 text-start"
                        v-for="header in table.getFlatHeaders()"
                        :key="header.id"
                    >
                        <FlexRender
                            :render="header.column.columnDef.header"
                            :props="header.getContext()"
                        />
                    </th>
                </tr>
            </thead>

            <tbody class="bg-white">
                <tr
                    v-for="row in table.getRowModel().rows"
                    :key="row.id"
                    class="border-b border-black last:border-b-0"
                >
                    <td
                        class="py-8 pl-5 text-base font-light leading-4 text-black break-words cursor-pointer"
                        v-for="cell in row.getVisibleCells()"
                        :key="cell.id"
                        @click="emit('onCellClick', cell)"
                    >
                        <FlexRender
                            :render="cell.column.columnDef.cell"
                            :props="cell.getContext()"
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Mobile Version -->
        <div class="md:hidden w-full">
            <div
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                class="mb-4"
            >
                <div class="bg-white border shadow-md p-4 rounded-lg w-full">
                    <div v-for="cell in row.getVisibleCells()" :key="cell.id">
                        <strong @click="emit('onCellClick', cell)">{{
                            cell.column.columnDef.header()
                        }}</strong>
                        <p class="text-black break-words cursor-pointer">
                            {{
                                cell.column.columnDef.cell({
                                    ...cell.getContext(),
                                    row,
                                })
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-center w-full gap-2 mt-4">
            <!-- Previous Page Button -->
            <button
                class="p-1 border rounded"
                @click="handlePageChange(currentPage - 1)"
                :disabled="currentPage === 1"
            >
                &lt;
            </button>

            <!-- Page Buttons -->
            <button
                v-for="page in Array.from(
                    { length: table.getPageCount() },
                    (_, i) => i + 1
                )"
                :key="page"
                class="p-1 border rounded"
                @click="() => handlePageChange(page)"
                :disabled="currentPage === page"
            >
                {{ page }}
            </button>

            <!-- Next Page Button -->
            <button
                class="p-1 border rounded"
                @click="handlePageChange(currentPage + 1)"
                :disabled="currentPage === table.getPageCount()"
            >
                &gt;
            </button>
        </div>
    </div>
</template>
