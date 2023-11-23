<template>
    <div
        class="w-[252px] h-[194px] bg-white rounded-3xl p-5 flex flex-col justify-between shadow-xl overflow-hidden"
    >
        <div class="flex flex-col justify-between h-[85px]">
            <div class="flex gap-x-4">
                <img :src="photo" class="object-cover w-12 h-12 rounded-full" />

                <div class="flex flex-col text-sm">
                    <p class="font-semibold">{{ name }}</p>
                    <span>NIK : {{ nik }}</span>
                    <span class="text-[10px]">{{ potition }}</span>
                </div>
            </div>
        </div>
        <div class="overflow-hidden">
            <p class="overflow-hidden font-bold">{{ type }}</p>
        </div>

        <div
            class="flex items-center justify-between p-3 -m-5 bg-[#0A70A9] gap-x-5 text-white px-5"
        >
            <component :is="IconCloak" class="text-md" />
            <span class="text-xs">{{ status }}</span>
            <component :is="IconArrowRight" class="cursor-pointer text-md" />
        </div>
    </div>
</template>

<script setup>
import IconCloak from "@/components/icons/IconClock.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";

const props = defineProps({
    name: {
        type: String,
        default: "Jhone Doe",
    },
    nik: {
        type: String,
        default: "123456",
    },
    potition: {
        type: String,
        default: "Specialist Lorem Ipsum",
    },
    photo: {
        type: String,
        default:
            "https://sb.kaleidousercontent.com/67418/1920x1545/c5f15ac173/samuel-raita-ridxdghg7pw-unsplash.jpg",
    },
    status: {
        type: String,
        default: "Menunggu approval",
    },
    type: {
        type: String,
        default: "Pensiun",
    },
});

const { name, nik, potition, photo, status, type } = props;
</script>
