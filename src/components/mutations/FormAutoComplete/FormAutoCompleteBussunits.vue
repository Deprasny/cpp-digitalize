<template>
  <FormAutocomplete
    noBorder="true"
    :data="data.val"
    id="company-status"
    :isLoading="data.isLoading"
    v-model="selectedValue"
    :modelValue="modelValue"
    @update:modelValue="updateModelValue"
    :onInput="handleChangesValue"
  />
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";

import useFetch from "../../../hooks/useFetch";
import FormAutocomplete from "../../FormAutocomplete.vue";
import debounce from "../../../utils/debounce";
import { getAllBusinessUnit } from "../../../services/form.services";
import { watchDebounced } from "@vueuse/core";

const props = defineProps(["isError", "errorMessage", "values"]);
const emit = defineEmits(["update:modelValue"]);

function updateModelValue(newValue) {
  emit("update:modelValue", newValue);
}

const fetchData = async (searchValue) => {
  data.value.isLoading = true;
  try {
    const { data: response } = await useFetch({
      services: getAllBusinessUnit,
      options: {
        params: { page: 1, limit: 25, cari: searchValue },
      },
    });

    function transformBusinessUnitValues(response) {
      return response?.value.map((item) => ({
        label: item?.division_name,
        value: item?.division_id,
      }));
    }

    data.value.val = transformBusinessUnitValues(response);
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

const input = ref("");

const handleChangesValue = (event) => {
  input.value = event.target.value;
};

watchDebounced(
  () => input.value,
  (newVal) => {
    fetchData(newVal);
  },
  { debounce: 1000 }
);

watchDebounced(
  () => props.values && data?.value?.val?.length > 0,
  (newVal) => {
    if (newVal) {
      const selected = data?.value?.val?.find(
        (item) => item?.label === props?.values
      );
      updateModelValue(selected);
    }
  },
  { debounce: 1000, immediate: true }
);

onMounted(() => {
  fetchData();
});
</script>
