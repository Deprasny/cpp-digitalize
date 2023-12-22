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
        :onSearch="debounce(fetchData, 500)"
    />
</template>

<script setup>
import { onMounted, ref } from "vue";

import useFetch from "../../../hooks/useFetch";
import FormAutocomplete from "../../FormAutocomplete.vue";
import debounce from "../../../utils/debounce";
import {
    getAllBusinessUnit,
    getAllCostCenter,
} from "../../../services/form.services";

const props = defineProps(["isError", "errorMessage"]);
const emit = defineEmits(["update:modelValue"]);

function updateModelValue(newValue) {
    emit("update:modelValue", newValue);
}

const fetchData = async (searchValue) => {
    data.value.isLoading = true;
    try {
        const { data: response } = await useFetch({
            services: getAllCostCenter,
            options: {
                params: { page: 1, limit: 25, cari: searchValue },
            },
        });

        function transformCostCenterValues(response) {
            return response?.value.map((item) => ({
                label: `${item?.dept_id} ${item?.division_id} ${item?.dept_name}`,
                value: `${item?.dept_id} ${item?.division_id} ${item?.dept_name}`,
            }));
        }
        data.value.val = transformCostCenterValues(response);
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

onMounted(() => {
    fetchData();
});
</script>
