<template>
  <button
    :class="buttonClasses"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    label: String,
    variant: {
      type: String,
      default: "primary"
    }
  },
  setup(props, { emit }) {
    const onClick = () => {
      emit("click");
    };

    // Define a computed property for dynamic class bindings
    const buttonClasses = computed(() => {
      return {
        "px-4 py-2 font-semibold text-white rounded hover:bg-blue-600": props.variant === "primary",
        "px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600":
          props.variant === "danger"
        // Add more variants as needed
      };
    });

    return {
      onClick,
      buttonClasses
    };
  }
};
</script>
