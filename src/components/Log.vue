<template>
    <p class="mx-3 mt-1 font-semibold">Status:</p>
    <div class="flex flex-col w-[20%] gap-y-2">
        <div
            v-for="(item, index) in data"
            :key="index"
            :class="{ 'last-item': index === data.length - 1 }"
            class="flex h-[120px]"
        >
            <div class="relative h-full">
                <div
                    class="inline-block border-2 border-[#0A70A9] w-5 h-5 rounded-full mt-2 ml-1"
                ></div>
                <div
                    class="absolute bg-[#0A70A9] w-3 h-3 rounded-full top-[12px] right-[4px]"
                    v-if="index !== 0"
                ></div>
                <span
                    v-if="index !== data.length - 1"
                    class="absolute h-[120px] transform -translate-x-1/2 border-r-[3px] border-[#0A70A9] border-dotted left-[12px] top-8"
                    >&nbsp;</span
                >
            </div>
            <div class="flex flex-col pt-1 ml-2 gap-y-2">
                <p class="text-[#0A70A9]">{{ item.date }}</p>
                <p class="text-lg">{{ item.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    data: {
        type: Array,
        default: () => [],
    },
});
</script>
