<template>
    <FormAutocomplete
        :data="data.val"
        id="nik-individu"
        v-model="selectedValue"
        label="Nama & NIK"
        placeholder="Cari nama karyawan / NIK"
        isSearchIcon="true"
        :isLoading="data.isLoading"
        :onSearch="debounce(fetchData, 500)"
        :modelValue="modelValue"
        @update:modelValue="updateModelValue"
        :isError="isError"
        :errorMessage="errorMessage"
    />
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { getEmployeeByUser } from "../services/form.services";
import useFetch from "../hooks/useFetch";
import FormAutocomplete from "./FormAutocomplete.vue";
import debounce from "../utils/debounce";

const props = defineProps(["isError", "errorMessage"]);
const emit = defineEmits(["update:modelValue"]);

function updateModelValue(newValue) {
    emit("update:modelValue", newValue);
}

const fetchData = async (searchValue) => {
    data.value.isLoading = true;
    try {
        const { data: response } = await useFetch({
            services: getEmployeeByUser,
            options: {
                page: 1,
                limit: 10,
                cari: searchValue,
            },
        });

        data.value.val = response?.value.map((item) => {
            return {
                label: `${item?.nik} - ${item?.nama}`,
                value: item?.nik,
                details: item,
            };
        });
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

onMounted(() => {
    fetchData();
});
</script>
