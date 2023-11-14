<template>
    <div
        class="w-[232px] h-[194px] bg-white rounded-3xl p-5 flex flex-col justify-between shadow-xl overflow-hidden"
    >
        <div class="flex flex-col justify-between">
            <div class="flex gap-x-4">
                <img
                    src="https://sb.kaleidousercontent.com/67418/1920x1545/c5f15ac173/samuel-raita-ridxdghg7pw-unsplash.jpg"
                    alt=""
                    class="object-cover w-12 h-12 rounded-full"
                />

                <div class="flex flex-col text-sm">
                    <p class="font-semibold">Jhone Doe</p>
                    <span>NIK : 123456</span>
                    <span class="text-xs">Specialist Lorem Ipsum</span>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <p class="font-bold">Pensiun</p>
        </div>

        <div
            class="flex items-center justify-center p-3 -m-5 bg-[#0A70A9] gap-x-5 text-white"
        >
            <component :is="IconCloak" class="text-md" />
            <span class="text-xs">Menunggu approval</span>
            <component :is="IconArrowRight" class="cursor-pointer text-md" />
        </div>
    </div>
</template>

<script setup>
import IconCloak from "@/components/icons/IconClock.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";
</script>
