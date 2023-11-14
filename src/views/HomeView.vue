<template>
    <div class="flex flex-col gap-y-20">
        <div class="flex justify-between mt-5">
            <div class="flex gap-x-16">
                <StatisticCard v-for="i in 3" :key="i" />
            </div>
            <p>Kamis, 21 September 2023 | 10:15:22</p>
        </div>

        <p class="text-2xl text-accent-1">Project Progress</p>
        <DashboardChart />

        <div class="w-full h-1 bg-line"></div>

        <p class="text-2xl">On Going Project</p>
        <div class="flex gap-x-10">
            <ProfileCard v-for="i in 4" :key="i" />
        </div>
    </div>
</template>

<script setup>
import StatisticCard from "@/components/StatisticCard.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import DashboardChart from "@/components/DashboardChart.vue";
</script>
