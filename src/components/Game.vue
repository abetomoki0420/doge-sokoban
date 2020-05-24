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
    <h1>
      <span class="wow-red">doge </span><span class="wow-yellow">sokoban</span>
    </h1>
    <h3>
      <span class="wow-pink">use </span><span class="wow-green">wasd </span>
      <span class="wow-red">or </span><span class="wow-pink">arrow </span>
      <span class="wow-blue">keys</span>
    </h3>
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
      <div class="buttons">
        <button @click="move('left')">left</button>
        <button @click="move('down')">down</button>
        <button @click="move('up')">up</button>
        <button @click="move('right')">right</button>
        <button @click="back">back</button>
        <button @click="reset">reset</button>
      </div>
    </div>
    <h1 v-if="checkClear">
      wow such very clear wow
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Cell from "@/components/Cell.vue";
import { Game, GameObject } from "@/class/game";

import { Key } from "@/class/game";
import { mapActions, mapGetters } from "vuex";

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
  async beforeMount() {
    let mapId = "";
    if (this.$route.query.id) {
      mapId = `${this.$route.query.id}`;
    }

    await this.fetchMapByMapId(mapId);

    const responsedGameObjects = [];
    const data = this.getSelectedMap;
    this.size = data.size;
    for (const i in data.objects) {
      const { X, Y, type } = data.objects[i];
      responsedGameObjects.push(new GameObject(X, Y, type));
    }

    const presetObjects = [...this.createWall(), ...responsedGameObjects];

    this.game = new Game(this.size, presetObjects);

    this.$nextTick(() => {
      (this.$refs.wrapper as any).focus();
    });
  },
  computed: {
    ...mapGetters("map", ["getSelectedMap"]),
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
    ...mapActions("map", ["fetchMapByMapId"]),
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
    back() {
      if (!this.game) return;

      this.game.back();
    },
    reset() {
      if (!this.game) return;

      this.game.reset();
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
@import "src/assets/scss/global.scss";
.game_board {
  &_cellrow {
    display: flex;
    justify-content: center;
  }

  &_wrapper {
    text-align: center;
    &:focus {
      outline: 0 black solid;
    }
  }
  .buttons {
    button {
      font-size: 20px;
    }
  }
}
</style>
