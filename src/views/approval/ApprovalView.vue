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
            class="flex justify-start w-full md:-mb-6 mb-2 gap-x-4 text-[#0A70A9] text-xl md:ml-10 ml-0"
        >
            <UIButton
                v-for="data in filter"
                @click="$router.push(`/approval/${data.label}`)"
                :variant="data.label === currentPath ? 'tab-active' : 'tab'"
                ><div class="flex gap-2 text-sm md:gap-x-16 md:text-base">
                    <span class="uppercase">{{ data.label }}</span>
                    <template v-if="data.label === 'mutasi'">
                        <span>
                            {{ valueApproval.length }}
                        </span>
                    </template>
                    <template v-else>
                        <span>0</span>
                    </template>
                </div></UIButton
            >
        </div>
        <router-view></router-view>
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

const valueApproval = ref([]);

onBeforeMount(async () => {
    const { data: response } = await useFetch({
        services: getMutationApprovalList,
        options: {
            page: 1,
            limit: 10,
        },
    });

    valueApproval.value = response?.value?.data;
});

const router = useRouter();
const currentPath = ref(router.currentRoute.value.path.split("/")[2]);

watch(
    () => router.currentRoute.value.path.split("/")[2],
    (newPath) => {
        currentPath.value = newPath;
    }
);

const filter = ref([
    { label: "mutasi", value: 10 },
    { label: "evaluasi", value: 10 },
    { label: "pensiun", value: 10 },
]);
</script>
