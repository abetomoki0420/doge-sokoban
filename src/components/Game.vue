<template>
  <div
    ref="wrapper"
    @keydown.prevent.left="move('left')"
    @keydown.prevent.a="move('left')"
    @keydown.prevent.down="move('down')"
    @keydown.prevent.s="move('down')"
    @keydown.prevent.up="move('up')"
    @keydown.prevent.w="move('up')"
    @keydown.prevent.right="move('right')"
    @keydown.prevent.d="move('right')"
    tabindex="0"
    class="game_board_wrapper"
  >
    <div class="game_board">
      <div
        v-for="row in gameSize"
        :key="`row_${row}`"
        class="game_board_cellrow"
      >
        <cell
          v-for="cell in gameSize"
          :X="cell"
          :Y="row"
          :key="`row_${row}cell_${cell}`"
          :selected="selectLocation(cell, row)"
        />
      </div>
      <button @click="move('left')">Left</button>
      <button @click="move('down')">Down</button>
      <button @click="move('up')">Up</button>
      <button @click="move('right')">Right</button>
    </div>
    <div v-if="checkClear">
      clear!
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Cell from "@/components/Cell.vue";
import { Game, GameObject } from "@/class/game";

import { Key } from "@/class/game";

interface Data {
  size: number;
  game: Game | null;
}

export default Vue.extend({
  name: "Game",
  data(): Data {
    return {
      size: 8,
      game: null
    };
  },
  components: {
    Cell
  },
  mounted() {
    this.game = new Game(this.size, [
      ...this.createWall(),
      new GameObject(2, 2, "user"),
      new GameObject(5, 3, "box"),
      new GameObject(3, 3, "box"),
      new GameObject(3, 4, "wall"),
      new GameObject(5, 4, "wall"),
      new GameObject(5, 5, "star"),
      new GameObject(3, 5, "star")
    ]);

    this.$nextTick(() => {
      (this.$refs.wrapper as any).focus();
    });
  },
  computed: {
    gameSize(): any {
      if (!this.game) return 0;

      return this.game.getSize();
    },
    count(): any {
      if (!this.game) return 0;

      return this.game.getCount();
    },
    checkClear(): boolean {
      if (!this.game) return false;

      return this.game.isClear();
    }
  },
  methods: {
    selectLocation(x: number, y: number) {
      if (!this.game) return "";

      // 座標を送り
      // 該当するオブジェクトを取得する

      const object = this.game.getObject(x, y);
      if (!object) return "";
      return object.type;
    },
    move(key: Key) {
      if (!this.game) return 0;

      this.game.move(key);
    },
    createWall() {
      const walls = [];

      for (let y = 1; y <= this.size; y++) {
        for (let x = 1; x <= this.size; x++) {
          if (y !== 1 && y !== this.size && x !== 1 && x !== this.size)
            continue;
          walls.push(new GameObject(x, y, "wall"));
        }
      }
      return walls;
    }
  }
});
</script>

<style lang="scss" scoped>
.game_board {
  &_cellrow {
    display: flex;
  }

  &_wrapper {
    height: 90vh;
    width: 90vw;
    &:focus {
      outline: 0 black solid;
    }
  }
}
</style>
