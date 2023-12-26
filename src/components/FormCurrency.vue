<template>
    <input ref="inputRef" type="text" />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";
import { watchDebounced } from "@vueuse/core";

export default {
    name: "DebouncedCurrencyInput",
    props: {
        modelValue: Number, // Vue 2: value
        options: Object,
    },
    setup(props, { emit }) {
        const { inputRef, numberValue } = useCurrencyInput(
            {
                currency: "IDR",
                hideCurrencySymbolOnFocus: false,
                hideGroupingSeparatorOnFocus: false,
                hideNegligibleDecimalDigitsOnFocus: false,
            },
            false
        );

        watchDebounced(
            numberValue,
            (value) => emit("update:modelValue", value),
            {
                debounce: 1000,
            }
        );

        return { inputRef };
    },
};
</script>
