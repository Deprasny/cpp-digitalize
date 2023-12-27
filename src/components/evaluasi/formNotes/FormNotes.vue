<template>
    <FormEvaluasiItemWrapper class="w-[50%]">
        <div class="w-full flex flex-col gap-2">
            <div class="font-semibold">Catatan</div>
            <div class="w-full flex gap-3">
                <div class="w-full flex flex-col">
                    <FormInputBasic
                        class="w-full"
                        v-for="item in notes"
                        v-model="item.value"
                    />
                </div>

                <div class="relative h-full pt-3 flex-col gap-1 flex">
                    <button
                        class="w-6 h-6 grid place-items-center border rounded-full bg-white"
                        @click="addColumns"
                    >
                        <component
                            :is="IconPlus"
                            class="text-xs text-accent-1"
                        />
                    </button>

                    <button
                        class="w-6 h-6 grid place-items-center border rounded-full bg-white"
                        @click="removeColumns"
                    >
                        <component
                            :is="IconMinus"
                            class="text-xs text-accent-1"
                        />
                    </button>
                </div>
            </div>
        </div>
    </FormEvaluasiItemWrapper>
</template>

<script setup>
import { ref, defineProps } from "vue";
import FormInputBasic from "../../FormInputBasic.vue";
import FormEvaluasiItemWrapper from "../wrapper/FormEvaluasiItemWrapper.vue";
import IconPlus from "../../icons/IconPlus.vue";
import IconMinus from "../../icons/IconMinus.vue";
import { watchDebounced } from "@vueuse/core";

const notes = ref([{ value: "" }]);

const props = defineProps(["onGetValues"]);

const addColumns = () => {
    notes.value.push({ value: "" });
};

const removeColumns = () => {
    notes.value.pop();
};

watchDebounced(
    () => notes.value,
    (newVal) => {
        const transformData = newVal.map((item) => item.value);

        props.onGetValues(transformData);
    },
    { debounce: 1000, deep: true }
);
</script>
