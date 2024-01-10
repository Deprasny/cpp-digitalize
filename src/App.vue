<!-- App.vue -->
<template>
  <router-view></router-view>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Roboto:wght@300;400;500&display=swap");
* {
  font-family: "Poppins", sans-serif;
}
</style>

<!-- testing -->

<script>
export default {
  mounted() {
    // Change the page title when the component is mounted
    document.title = "HR Docs - Dokumen Digital HR";
  },
};
</script>
