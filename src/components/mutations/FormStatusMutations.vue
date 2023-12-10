<template>
    <div class="overflow-x-auto">
        <div class="flex items-baseline justify-between my-10 w-[900px]">
            <div class="flex flex-col items-start w-1/5 gap-[0.5px]">
                <div class=""></div>
                <div
                    v-for="list in listInfo"
                    :key="list"
                    class="w-full py-[17px] h-16 font-semibold"
                >
                    <LabelForm :label="list" />
                </div>
            </div>
            <div class="flex flex-col items-center flex-1 text-center">
                <div class="w-full py-1 text-lg font-bold bg-accent-2">
                    STATUS LAMA
                </div>
                <div
                    v-for="status in statusLama"
                    :key="status"
                    class="w-full h-16 py-4 border border-l-0 border-black"
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
            <div class="flex flex-col items-center flex-1 text-center">
                <div
                    class="w-full py-1 text-lg font-bold text-white bg-accent-1"
                >
                    STATUS BARU
                </div>
                <div
                    v-for="(status, index) in statusBaru"
                    :key="status"
                    class="w-full py-4 border border-l-0 border-black last:border-b-[2px] h-16"
                    :class="{ 'bg-gray-100': isDisabled }"
                >
                    <template v-if="status?.type === `dropdown`">
                        <Dropdown
                            :dropdownOptions="status?.options"
                            :selectedOptionText="status?.value.label"
                            @update:selected-option-text="status.value = $event"
                            :disabled="isDisabled"
                        />
                    </template>
                    <template v-else>
                        {{ statusLama[index] }}
                    </template>
                </div>

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
</script>
