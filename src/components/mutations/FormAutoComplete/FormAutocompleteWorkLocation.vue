<template>
    <FormAutocomplete
        noBorder="true"
        :data="data.val"
        id="company-status"
        :isLoading="data.isLoading"
        v-model="selectedValue"
        :reduceOption="onReduceOptions"
        :modelValue="modelValue"
        @update:modelValue="updateModelValue"
        :onInput="handleChangesValue"
    />
</template>

<script setup>
import { onMounted, ref } from "vue";

import useFetch from "../../../hooks/useFetch";
import FormAutocomplete from "../../FormAutocomplete.vue";
import debounce from "../../../utils/debounce";
import { getAllWorkLocation } from "../../../services/form.services";
import { watchDebounced } from "@vueuse/core";

const props = defineProps(["isError", "errorMessage"]);
const emit = defineEmits(["update:modelValue"]);

function updateModelValue(newValue) {
    emit("update:modelValue", newValue);
}

const fetchData = async (searchValue) => {
    data.value.isLoading = true;
    try {
        const { data: response } = await useFetch({
            services: getAllWorkLocation,
            options: {
                params: { page: 1, limit: 25, cari: searchValue },
            },
        });

        function transformWorkLocationValues(response) {
            return response?.value.map((item) => ({
                label: `${item?.worklocation_code} - ${item?.worklocation_name}`,
                value: item?.worklocation_code,
            }));
        }
        data.value.val = transformWorkLocationValues(response);
    } catch (error) {
    } finally {
        data.value.isLoading = false;
    }
};

const data = ref({
    val: [],
    isLoading: false,
});

const selectedValue = ref({});

const onReduceOptions = (option) => {
    return option.value;
};

const input = ref("");

const handleChangesValue = (event) => {
    input.value = event.target.value;
};

watchDebounced(
    () => input.value,
    () => {
        fetchData(input.value);
    },
    { debounce: 1000 }
);

onMounted(() => {
    fetchData();
});
</script>
