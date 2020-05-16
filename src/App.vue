<template>
  <div id="app">
    <game/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Game from "@/components/Game.vue";

export default Vue.extend({
  name: 'App',
  data(){
    return{
    }
  },
  components: {
    Game
  }
});
</script>

<style lang="scss" scoped>
  .app{
    display: flex;
    justify-content: center;
  }
</style>
