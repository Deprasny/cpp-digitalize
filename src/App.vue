<template>
  <div>
    <Button
      label="Primary Button"
      variant="primary"
      @click="handleClick"
    />
    <Button
      label="Danger Button"
      variant="danger"
      @click="handleClick"
    />
  </div>
</template>

<script>
import Button from "./components/ui/Button.vue";

export default {
  components: {
    Button
  },
  methods: {
    handleClick() {
      // Handle button click here
    }
  }
};
</script>
