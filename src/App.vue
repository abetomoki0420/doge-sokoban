<template>
  <div id="app">
    <app-header />
    <app-content />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "@/components/AppHeader.vue";
import AppContent from "@/components/AppContent.vue";

export default Vue.extend({
  name: "App",
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppContent
  }
});
</script>

<style lang="scss">
* {
  font-family: "Comic Sans MS", cursive, sans-serif;
  touch-action: manipulation;
}

h1,
h2,
h3 {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
