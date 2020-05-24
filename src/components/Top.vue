<template>
  <div class="top">
    <h1>
      <span class="wow-red">doge </span><span class="wow-blue">sokoban </span>
    </h1>
    <div class="top-doge-image" />
    <h2>
      <span class="wow-blue">wow </span>
      <span class="wow-red">such </span>
      <span class="wow-yellow">an </span>
      <span class="wow-green">amaze </span>
      <span class="wow-pink">sokoban </span>
      <span class="wow-red">and </span>
      <span class="wow-green">editor </span>
      <span class="wow-pink">wow </span>
    </h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
@import "src/assets/scss/global.scss";
.top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &-doge-image {
    height: 400px;
    width: 400px;
    background-image: url("~@/assets/jpg/doge.jpg");
    background-size: contain;
  }
}
</style>
