<script setup>
import { getCoreRowModel } from "@tanstack/table-core";
import { FlexRender, useVueTable } from "@tanstack/vue-table";

const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    data: {
        type: Array,
        required: true,
    },
});

const table = useVueTable({
    columns: props.columns,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
    <table class="w-full mx-5 shadow-xl table-fixed text-start">
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
                    class="py-8 pl-5 text-base font-light leading-4 text-black break-words"
                    v-for="cell in row.getVisibleCells()"
                    :key="cell.id"
                >
                    <FlexRender
                        :render="cell.column.columnDef.cell"
                        :props="cell.getContext()"
                    />
                </td>
            </tr>
        </tbody>
    </table>
</template>
