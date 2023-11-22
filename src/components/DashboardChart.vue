<script setup>
import { ref } from "vue";
import { Bar } from "vue-chartjs";
import { createGradient } from "@/libs/util";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ChartDataLabels
);

const chartData = ref({
    labels: ["Mutasi", "Evaluasi", "Pensiun"],
    datasets: [
        {
            label: "Outstanding",
            backgroundColor: createGradient("#0A70A9", "#AFE2FF"),
            borderWidth: 1,
            data: [120, 64, 64],
            borderRadius: {
                topLeft: 100,
                topRight: 100,
            },
        },
        {
            label: "Finished",
            backgroundColor: createGradient("#D2A92A", "#EFD995"),
            borderWidth: 1,
            data: [36, 26, 73],
            borderRadius: {
                topLeft: 100,
                topRight: 100,
            },
        },
    ],
});

const chartOptions = ref({
    responsive: true,
    scales: {
        x: {
            grid: {
                display: false, // Hide x-axis grid lines
            },
            ticks: {
                font: {
                    size: 15,
                    weight: "lighter",
                },
            },
        },
        y: {
            display: false,
        },
    },
    indexAxis: "x",
    barPercentage: 0.7,
    categoryPercentage: 0.6,
    plugins: {
        datalabels: {
            color: "white", // Set the color of the data labels
            anchor: "end", // Position the labels at the end of the bars
            align: "start", // Align the labels to the top of the bars
            formatter: (value) => value,
            font: {
                size: 20,
                weight: "bold",
            },
        },
        legend: {
            display: true,
            labels: {
                usePointStyle: true,
                font: {
                    size: 14,
                },
            },
            position: "right",
        },
    },
});
</script>

<template>
    <div class="w-[70%]">
        <Bar :options="chartOptions" :data="chartData" />
    </div>
</template>
