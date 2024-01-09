<template v-if="numberOfValues">
    <div
        v-for="(item, itemIdx) in values"
        class="flex w-full h-[150px] relative"
        :key="itemIdx"
    >
        <div
            class="w-full h-full border border-black"
            :class="{
                'border-red-500': errors.length > 0,
            }"
        >
            <input
                v-for="(column, columnIdx) in item.notes"
                placeholder="fill here"
                type="text"
                class="w-full h-[30px] border border-gray-200"
                :key="columnIdx"
                :value="column.val"
                @input="handleChangesNotes($event, itemIdx, columnIdx)"
            />
        </div>
        <div
            class="border border-black w-[80px] h-full"
            :class="{
                'border-red-500': errors.length > 0,
            }"
        >
            <!-- <input class="w-full h-full" type="number" v-model="item.score" /> -->
            <Dropdown
                :dropdown-options="scoreListValues"
                v-model="item.score"
            />
        </div>

        <div class="absolute -right-9 h-full pt-3 flex-col gap-1 flex">
            <button
                class="w-6 h-6 grid place-items-center border rounded-full bg-white"
                @click="addColumns(itemIdx)"
                v-if="item.notes.length < 5"
            >
                <component :is="IconPlus" class="text-xs text-accent-1" />
            </button>

            <button
                v-if="item.notes.length > 1"
                class="w-6 h-6 grid place-items-center border rounded-full bg-white"
                @click="removeColumns(itemIdx)"
            >
                <component :is="IconMinus" class="text-xs text-accent-1" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import IconPlus from "../../icons/IconPlus.vue";
import IconMinus from "../../icons/IconMinus.vue";
import { watchDebounced } from "@vueuse/core";
import Dropdown from "../../Dropdown.vue";

const props = defineProps([
    "values",
    "onGetValues",
    "numberOfValues",
    "errors",
    "scoreListValues",
    "fetchingScoreListValues",
]);

const valueOfTable = {
    notes: [{ val: "" }],
    score: 0,
};

const repeatedValues = computed(() =>
    Array.from({ length: props.numberOfValues }, () => ({ ...valueOfTable }))
);

const values = ref(JSON.parse(JSON.stringify(repeatedValues.value)));

watchDebounced(
    () => values?.value,
    (newVal) => {
        if (newVal) {
            const transformValues = newVal.map((item) => ({
                ...item,
                notes: item?.notes.map((note) => note.val),
                score: Number(item?.score),
            }));

            props.onGetValues(transformValues);
        }
    },
    { debounce: 1000, deep: true }
);

const handleChangesNotes = (event, itemIdx, columnIdx) => {
    values.value[itemIdx].notes[columnIdx].val = event.target.value;
};

const addColumns = (itemIdx) => {
    values?.value?.[itemIdx].notes.push({ val: "" });
};

const removeColumns = (itemIdx) => {
    values?.value?.[itemIdx].notes.pop();
};
</script>
