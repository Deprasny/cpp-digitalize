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

export default {
    name: "DebouncedCurrencyInput",
    props: {
        modelValue: Number, // Vue 2: value
        options: Object,
        disabled: Boolean,
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
