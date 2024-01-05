<template>
    <input
        ref="inputRef"
        type="text"
        class="text-right w-full h-full"
        :class="{
            'bg-gray-100': disabled,
            'bg-white': !disabled,
        }"
    />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";
import { watchDebounced } from "@vueuse/core";
import { watch } from "vue";

export default {
    name: "FormCurrency",
    props: {
        modelValue: Number, // Vue 2: value
        options: Object,
        disabled: Boolean,
    },
    setup(props, { emit }) {
        const { inputRef, numberValue, setOptions, setValue } =
            useCurrencyInput(
                {
                    currency: "IDR",
                    hideCurrencySymbolOnFocus: false,
                    hideGroupingSeparatorOnFocus: false,
                    hideNegligibleDecimalDigitsOnFocus: false,
                    accountingSign: false,
                    useGrouping: true,
                },
                false
            );

        watch(
            () => props.modelValue, // Vue 2: props.value
            (value) => {
                setValue(value);
            },
            { immediate: true, deep: true }
        );

        watch(
            () => props.options,
            (options) => {
                setOptions(options);
            }
        );

        watchDebounced(
            numberValue,
            (value) => emit("update:modelValue", value),
            { debounce: 1000 }
        ); // Vue 2: emit('input', value)

        return { inputRef };
    },
};
</script>
