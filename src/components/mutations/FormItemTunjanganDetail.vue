<template>
    <div class="h-full w-full" v-if="data.length > 0">
        <div v-for="(item, index) in data" :key="index">
            <p>
                {{
                    `${item?.muta_allow_code} : ${formatRupiah(
                        item?.muta_allow_amount
                    )}`
                }}
            </p>
        </div>
        <UIDivider class="mt-2" />

        <p>Total : {{ formatRupiah(total) }}</p>
    </div>
    <div v-else class="h-20">-</div>
</template>

<script setup>
import formatRupiah from "../../utils/formatCurrencyRupiah";
import UIDivider from "../ui/UIDivider.vue";
import { watchEffect, ref } from "vue";

const { data } = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
});

const total = ref(0);

watchEffect(() => {
    if (data.length > 0) {
        total.value = data.reduce(
            (acc, curr) => acc + Number(curr.muta_allow_amount),
            0
        );
    }
});
</script>
