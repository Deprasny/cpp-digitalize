<template>
    <div class="overflow-x-auto h-full w-full">
        <div class="flex my-10 w-[1000px]">
            <div class="flex flex-col items-center text-center flex-1">
                <div class="w-full h-10"></div>
                <div
                    v-for="list in listInfo"
                    :key="list"
                    class="w-48 font-semibold h-20 flex items-center"
                >
                    <LabelForm :label="list" />
                </div>
            </div>
            <div class="flex flex-col items-center text-center flex-1">
                <div class="w-full py-1 text-lg font-bold bg-accent-2">
                    STATUS LAMA
                </div>
                <div
                    v-for="status in statusLama"
                    :key="status"
                    class="w-full h-20 py-2 border border-l-0 text-left border-black flex items-center"
                    :class="status === '-' ? 'bg-gray-100' : ''"
                >
                    {{ status }}
                </div>

                <template v-if="!isGroup">
                    <div class="flex justify-between w-full mt-10 bg-accent-2">
                        <div
                            v-for="header in headerTunjangan"
                            :key="header"
                            class="w-full py-1 font-semibold border-black border-x"
                        >
                            {{ header }}
                        </div>
                    </div>
                    <div
                        v-for="(_, index) in columns"
                        :key="index"
                        class="flex justify-between w-full"
                    >
                        <div
                            class="w-full py-1 font-semibold bg-gray-100 border border-black"
                            v-for="i in 3"
                        >
                            <input
                                disabled
                                type="text"
                                class="max-w-[150px] bg-transparent"
                            />
                        </div>
                    </div>
                    <p class="self-start mt-5 font-semibold">Total : 0</p>
                </template>
            </div>
            <div class="flex flex-col flex-1 text-center">
                <div
                    class="w-full py-1 text-lg font-bold text-white bg-accent-1"
                >
                    STATUS BARU
                </div>

                <FormStatusBaruItem>
                    <FormAutocomplete
                        :data="options.company"
                        id="company-status"
                        :isLoading="options.isLoading"
                    />
                </FormStatusBaruItem>
                <FormStatusBaruItem>
                    <FormAutocomplete
                        :data="options.position"
                        id="position-status"
                        :isLoading="options.isLoading"
                    />
                </FormStatusBaruItem>
                <FormStatusBaruItem>
                    <div class="px-4 h-full py-2 flex items-center">
                        {{ statusLama[2] }}
                    </div>
                </FormStatusBaruItem>
                <FormStatusBaruItem>
                    <FormAutocomplete
                        :data="options.bussunit"
                        id="bussunit-status"
                        :isLoading="options.isLoading"
                    />
                </FormStatusBaruItem>
                <FormStatusBaruItem>
                    <FormAutocomplete
                        :data="options.costCenter"
                        id="costcenter-status"
                        :isLoading="options.isLoading"
                    />
                </FormStatusBaruItem>
                <FormStatusBaruItem>
                    <FormAutocomplete
                        :data="options.workLocation"
                        id="worklocation-status"
                        :isLoading="options.isLoading"
                    />
                </FormStatusBaruItem>
                <!-- <FormStatusBaruItem>
                    <FormAutocomplete :data="status?.options" />
                </FormStatusBaruItem>
                <FormStatusBaruItem>
                    <FormAutocomplete :data="status?.options" />
                </FormStatusBaruItem> -->

                <template v-if="!isGroup">
                    <div class="flex justify-between w-full mt-10 bg-accent-1">
                        <div
                            v-for="header in headerTunjangan"
                            :key="header"
                            class="w-full py-1 font-semibold text-white border-black border-x"
                        >
                            {{ header }}
                        </div>
                    </div>

                    <div
                        v-for="(item, index) in columns"
                        :key="index"
                        class="flex justify-between w-full"
                    >
                        <div
                            class="w-full py-1 font-semibold border border-black"
                            v-for="i in columnsData"
                        >
                            <input
                                :type="i.type"
                                class="max-w-[150px]"
                                :value="columnsValue[index][i.property]"
                                @input="
                                    columnsValue[index][i.property] =
                                        $event.target.value
                                "
                            />
                        </div>
                        <div class="relative">
                            <div
                                v-if="index === columns - 1"
                                class="absolute top-2 -right-7"
                            >
                                <button v-if="columns < 7" @click="addColumn">
                                    <div class="p-1 bg-red-600 rounded-full">
                                        <component
                                            :is="IconPlus"
                                            class="text-xs text-white"
                                        />
                                    </div>
                                </button>
                            </div>
                            <div
                                v-if="index === columns - 2"
                                class="absolute top-1 -right-5"
                            >
                                <button @click="removeColumn">-</button>
                            </div>
                        </div>
                    </div>

                    <p class="self-start mt-5 font-semibold">
                        Total : {{ totalTunjangan }}
                    </p>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import LabelForm from "@/components/LabelForm.vue";
import Dropdown from "../Dropdown.vue";
import IconPlus from "../../components/icons/IconPlus.vue";
import FormAutocomplete from "../FormAutocomplete.vue";
import FormStatusBaruItem from "./FormStatusBaruItem.vue";
import useFormAutoFill from "../../hooks/useFormAutoFill";
import { onMounted, ref } from "vue";

const props = defineProps([
    "listInfo",
    "statusLama",
    "statusBaru",
    "headerTunjangan",
    "columns",
    "columnsData",
    "columnsValue",
    "isGroup",
    "totalTunjangan",
    "addColumn",
    "removeColumn",
]);

const options = ref({
    isLoading: false,
    company: [],
    position: [],
    bussunit: [],
    costCenter: [],
    workLocation: [],
});

const fetchAutoFillForms = async () => {
    options.value.isLoading = true;
    try {
        const {
            businessUnitValues,
            companyValues,
            costCenterValues,
            positionValues,
            workLocationValues,
        } = await useFormAutoFill();

        options.value.company = companyValues;
        options.value.position = positionValues;
        options.value.bussunit = businessUnitValues;
        options.value.costCenter = costCenterValues;
        options.value.workLocation = workLocationValues;
    } catch (e) {
        console.log(e);
    } finally {
        options.value.isLoading = false;
    }
};

onMounted(() => {
    fetchAutoFillForms();
});
</script>
