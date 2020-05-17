<template>
  <div class="cell_container">
    <div class="cell_container_body" :class="isSelected" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { GameObjectType } from "@/class/game";

export default Vue.extend({
  name: "Cell",
  props: {
    X: Number,
    Y: Number,
    selected: {
      type: String as PropType<GameObjectType>,
      required: false
    }
  },
  computed: {
    isSelected(): string {
      return this.selected;
    }
  }
});
</script>

<style lang="scss" scoped>
$container_size: 50px;
$magnification: 1;
$container_body_size: $container_size * $magnification;
$theme_color: rgba(0, 0, 0, 0.1);
$user_color: $theme_color;
$box_color: tomato;
$wall_color: green;
$star_color: yellow;

@mixin box($size) {
  width: $size;
  height: $size;
}

.cell {
  &_container {
    display: flex;
    justify-content: center;
    align-content: center;
    @include box($container_size);
    &_body {
      @include box($container_body_size);
      border: 1px solid $theme_color;
      box-sizing: border-box;
      background-image: url("~@/assets/jpg/floor.jpg");
      background-size: contain;
      &.user {
        background-image: url("~@/assets/jpg/doge.jpg");
        background-size: contain;
      }
      &.box {
        background-image: url("~@/assets/jpg/box.jpg");
        background-size: cover;
      }
      &.wall {
        background-image: url("~@/assets/jpg/wall.jpg");
        background-size: cover;
      }
      &.star {
        background-image: url("~@/assets/jpg/wow.jpg");
        background-size: cover;
      }
    }
  }
}
</style>
