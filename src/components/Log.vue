<template>
    <div class="flex justify-end">
        <p class="mx-3 mt-1 font-semibold">Status:</p>
        <div class="flex flex-col w-full ml-10 gap-y-2 md:ml-0">
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
                        v-if="item?.date !== 'DONE'"
                    ></div>
                    <span
                        v-if="index !== data.length - 1"
                        class="absolute h-[100px] transform -translate-x-1/2 border-r-[3px] border-[#0A70A9] border-dotted left-[12px] top-8"
                        >&nbsp;</span
                    >
                </div>
                <div class="flex flex-col pt-1 ml-2 gap-y-2">
                    <p class="text-[#0A70A9]">{{ item.date }}</p>
                    <p class="text-md">{{ item.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
});
</script>
