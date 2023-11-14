<template>
    <header class="flex items-center justify-between p-7">
        <div class="flex items-center gap-x-5">
            <div class="relative">
                <input
                    type="text"
                    placeholder="Search"
                    class="w-[400px] px-4 py-3 text-black placeholder-opacity-50 rounded-lg bg-transparent shadow-lg outline-none appearance-none focus:placeholder-opacity-100 bg-white pr-10"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <component
                        :is="IconMagnifying"
                        class="text-2xl text-gray-600"
                    />
                </div>
            </div>
            <div class="relative">
                <component :is="IconBell" class="text-3xl text-gray-600" />
                <span
                    class="absolute flex items-center justify-center w-4 h-45 text-xs text-white bg-[#0A70A9] rounded-full -top-1 -right-1"
                    >1</span
                >
            </div>
        </div>

        <div class="flex gap-x-5">
            <p class="font-semibold">Hi, Panca Dias Purnomo</p>
            <component
                :is="IconArrowRight"
                class="text-2xl text-gray-600 cursor-pointer"
            />
        </div>
    </header>
</template>

<script setup>
import IconMagnifying from "@/components/icons/IconMagnifying.vue";
import IconBell from "@/components/icons/IconBell.vue";
import IconArrowRight from "../icons/IconArrowRight.vue";
</script>
