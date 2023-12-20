<template>
    <div
        class="flex p-3 font-semibold uppercase"
        :class="{
            'bg-accent-2': type === 'target',
            'bg-accent-1': type === 'actual',
        }"
    >
        <div class="w-[20%]">No</div>
        <div class="w-full h-full text-center">{{ headerLabel }}</div>
        <div class="flex justify-center w-full h-full text-center gap-x-5">
            {{ headerValue }}

            <button @click="onToggleTooltip" v-if="formAction === 'mutate'">
                <div
                    class="flex items-center justify-center w-5 h-5 border-2 border-black rounded-full"
                >
                    !
                </div>
            </button>
        </div>
    </div>

    <ToolTip
        v-if="tooltipRef"
        class="-top-9 left-[50px]"
        @close="onToggleTooltip"
    >
        <ol class="space-y-2 list-decimal">
            <li v-for="note in tooltipContent" :key="note">
                <span class="text-sm">{{ note }} </span>
            </li>
        </ol>
    </ToolTip>
</template>

<script setup>
import { ref, defineProps } from "vue";
import ToolTip from "../ToolTip.vue";

const { tooltipRef } = defineProps([
    "headerLabel",
    "headerValue",
    "tooltipRef",
    "onToggleTooltip",
    "tooltipContent",
    "type",
    "formAction",
]);
</script>
