<template>
    <div class="relative w-full mb-4">
        <label :for="id" class="text-base font-semibold leading-5 text-black">{{
            label
        }}</label>
        <div class="relative flex items-center mt-3 w-full border p-2">
            <div
                class="h-full pr-2 text-lg cursor-pointer m-auto top-0 bottom-0 flex items-center justify-center pl-2"
            >
                <component :is="IconMagnifier" />
            </div>

            <v-select
                :options="data"
                class="style-chooser"
                :id="id"
                :placeholder="placeholder"
                :onSearch="debounce(fetchData, 500)"
                :v-model="value"
            >
            </v-select>
        </div>
    </div>
</template>

<script setup>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import IconMagnifier from "./icons/IconMagnifying.vue";
import { onMounted, ref, watch } from "vue";
import useFetch from "../hooks/useFetch";
import { getEmployeeByUser } from "../services/form.services";
import debounce from "../utils/debounce";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },

    placeholder: {
        type: String,
        default: "isi data",
        required: false,
    },
});

const emit = defineEmits(["update:value", "toggleIcon"]);

const value = ref("");
onMounted(() => {
    fetchData();
});

console.log(value.value);

const data = ref([]);

const fetchData = async () => {
    const { data: response } = await useFetch({
        services: getEmployeeByUser,
        options: {
            page: 1,
            limit: 10,
            cari: value.value,
        },
    });

    data.value = response?.value.map((item) => {
        return {
            label: `${item?.nik} - ${item?.nama}`,
            value: item?.nik,
            details: item,
        };
    });
};
</script>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
    border: none;
}

.style-chooser .vs__search::placeholder {
    color: #394066 !important;
}

.style-chooser {
    width: 100%;
    height: 100%;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
    fill: #394066;
}
</style>
