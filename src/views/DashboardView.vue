<template>
    <div class="flex flex-col gap-y-20">
        <div class="flex justify-between mt-5">
            <div
                class="flex flex-wrap justify-center flex-1 sm:justify-start gap-x-16 gap-y-2"
            >
                <template v-if="!isLoading">
                    <StatisticCard
                        v-for="i in data.transaksi"
                        :key="i"
                        :type="i.transaksiCode"
                        :totalTransactions="i.total"
                    />
                </template>

                <template v-else>
                    <div class="mx-auto">
                        <UILoader class="text-accent-1" />
                    </div>
                </template>

                <template v-if="data?.transaksi?.length === 0">
                    <div class="">No Data</div>
                </template>
            </div>
            <p class="hidden sm:block">{{ currentTime }}</p>
        </div>

        <p class="text-2xl text-accent-1">Project Progress</p>
        <DashboardChart />

        <Divider />

        <p class="text-2xl">On Going Project</p>
        <div class="flex flex-wrap gap-x-5 gap-y-2">
            <template v-if="!isLoading">
                <ProfileCard
                    v-for="i in data.employee"
                    :key="i"
                    :name="i.nama"
                    :nik="i.nik"
                    :potition="i.posisi"
                    :photo="i.photo"
                    :status="i.status"
                    :type="i.trans_name"
                />
            </template>

            <template v-else>
                <div class="mx-auto">
                    <UILoader />
                </div>
            </template>

            <template v-if="data?.transaksi?.length === 0">
                <div class="">No Data</div>
            </template>
        </div>
    </div>

    <Modal
        v-if="errorModal"
        :isModalOpen="errorModal"
        @toggleModal="errorModal = ''"
        :modalTitle="errorModal"
        modalType="danger"
    />
</template>

<script setup>
import StatisticCard from "@/components/StatisticCard.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import DashboardChart from "@/components/DashboardChart.vue";
import Divider from "@/components/ui/UIDivider.vue";
import UILoader from "../components/ui/UILoader.vue";
import { useCurrentTime } from "../libs/util";

import { getDashboardData } from "../services/dashboard.services";
import { onBeforeMount, ref } from "vue";
import useFetch from "../hooks/useFetch";
import Modal from "../components/Modal.vue";

const { currentTime } = useCurrentTime();

const errorModal = ref("");

const isLoading = ref(false);

const data = ref({
    employee: [],
    transaksi: [],
});

onBeforeMount(async () => {
    isLoading.value = true;
    try {
        const { data: response, errorMessage } = await useFetch({
            services: getDashboardData,
            options: {
                page: 1,
                limit: 10,
            },
        });
        data.value = {
            employee: response?.value?.employee || {},
            transaksi: response?.value?.totalTransaksi || {},
        };
    } catch (error) {
        errorModal.value = "Terjadi kesalahan saat mengambil data dashboard";
    } finally {
        isLoading.value = false;
    }
});
</script>
