<template>
  <div class="editor" tabindex="-1">
    <h1>
      <span class="wow-red">doge </span><span class="wow-yellow">sokoban </span
      ><span class="wow-blue">editor </span>
    </h1>
    <div class="size-section">
      <span class="size-section-label">size:</span>
      <input
        class="size-section-input"
        min="6"
        max="10"
        type="number"
        v-model.number="size"
      />
    </div>
    <div class="pallettePanels">
      <cell
        class="pallete touchable"
        :class="{ selected: selectedPallete === pallete }"
        v-for="(pallete, index) in pallets"
        :key="`row_${1}cell_${index}`"
        :selected="pallete"
        @click.native="selectPallete(pallete)"
      />
    </div>
    <div class="game_board">
      <div v-for="row in size" :key="`row_${row}`" class="game_board_cellrow">
        <cell
          class="touchable"
          @click.native="editCell(cell, row)"
          v-for="cell in size"
          :X="cell"
          :Y="row"
          :key="`row_${row}cell_${cell}`"
          :selected="checkCellType(cell, row)"
          @mouseover.native="move($event, cell, row)"
        />
      </div>
    </div>
    <button @click="reset">Reset</button>
    <div class="controls">
      <div>input your amazing sokoban name!</div>
      <input v-model="inputedName" class="controls-input-name" type="text" />
      <button @click="save" :disabled="!validate">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Cell from "@/components/Cell.vue";
import { GameObjectType } from "@/class/game";
import { mapActions, mapGetters } from "vuex";

interface CellInfo {
  X: number;
  Y: number;
  type: GameObjectType;
}

interface Data {
  size: number;
  editedCells: CellInfo[];
  pallets: GameObjectType[];
  selectedPallete: GameObjectType;
  inputedName: string;
}

export default Vue.extend({
  name: "Game",
  data(): Data {
    return {
      size: 6,
      editedCells: [],
      pallets: ["", "user", "wall", "box", "star"],
      selectedPallete: "",
      inputedName: ""
    };
  },
  components: {
    Cell
  },
  computed: {
    ...mapGetters("auth", ["getCurrentUser"]),
    validate(): boolean {
      const user = this.editedCells.filter(cell => cell.type === "user");
      if (user.length !== 1) return false;

      const box = this.editedCells.filter(cell => cell.type === "box");
      const star = this.editedCells.filter(cell => cell.type === "star");

      if (box.length < 1) return false;
      if (star.length < 1) return false;

      if (box.length !== star.length) return false;

      if (this.inputedName.length < 1) return false;
      return true;
    }
  },
  methods: {
    ...mapActions("map", ["createMap"]),
    reset() {
      this.editedCells = [];
    },
    async save() {
      const cells = this.editedCells.filter(cell => cell.type !== "");

      try {
        const { uid } = this.getCurrentUser;
        const payload = {
          uid: uid,
          size: this.size,
          name: this.inputedName,
          objects: cells
        };
        await this.createMap(payload);
        await this.$router.push("/list");
      } catch (e) {
        console.log(e);
      }
    },
    move(e: MouseEvent, x: number, y: number) {
      if (e.buttons === 0) return;

      this.editCell(x, y);
    },
    selectPallete(type: GameObjectType) {
      this.selectedPallete = type;
    },
    checkCellType(x: number, y: number): string {
      const cell = this.editedCells.find(cell => {
        return cell.X === x && cell.Y === y;
      });

      if (cell) {
        return cell.type;
      }

      return "";
    },
    editCell(x: number, y: number) {
      const targetCell = this.editedCells.find(cell => {
        return cell.X === x && cell.Y === y;
      });

      if (!targetCell) {
        this.editedCells.push({
          X: x,
          Y: y,
          type: this.selectedPallete
        });
        return;
      }

      targetCell.type = this.selectedPallete;
    }
  }
});
</script>

<style lang="scss" scoped>
@import "src/assets/scss/global.scss";

.editor {
  text-align: center;
  &:focus {
    outline: 0 black solid;
  }
}

.pallettePanels {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  .pallete {
    margin-right: 8px;
    &.selected {
      border: 3px solid tomato;
    }
  }
}

.game_board {
  &_cellrow {
    display: flex;
    justify-content: center;
  }
  .buttons {
    button {
      font-size: 20px;
    }
  }
}

.size-section {
  margin-bottom: 8px;
  &-label {
    margin-right: 4px;
  }
  &-input {
    font-size: 20px;
  }
}

.controls {
  &-input-name {
    margin-right: 8px;
  }
}

.touchable {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    outline: 0 black solid;
  }
}
</style>
