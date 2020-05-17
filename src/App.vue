<template>
  <div id="app">
    <div>
      <router-link to="/?id=1">Top</router-link>
    </div>
    <div>
      <router-link to="/list">List</router-link>
    </div>
    <div>
      <router-link to="/editor">Editor</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import Game from "@/components/Game.vue";

export default Vue.extend({
  name: "App",
  data() {
    return {};
  },
  components: {
    // Game
  }
});
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  width: 100vw;
  justify-content: center;
}
</style>
