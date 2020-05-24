<template>
  <div
    @keydown.prevent.space="selectPallete('')"
    @keydown.prevent.a="selectPallete('user')"
    @keydown.prevent.s="selectPallete('wall')"
    @keydown.prevent.d="selectPallete('box')"
    @keydown.prevent.f="selectPallete('star')"
    class="editor"
    tabindex="-1"
  >
    <h1>doge sokoban editor</h1>
    <div>
      <span>size</span>
      <input min="6" max="10" type="number" v-model.number="size" />
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
    <button @click="save">Save</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Cell from "@/components/Cell.vue";
import { GameObjectType } from "@/class/game";

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
}

export default Vue.extend({
  name: "Game",
  data(): Data {
    return {
      size: 6,
      editedCells: [],
      pallets: ["", "user", "wall", "box", "star"],
      selectedPallete: ""
    };
  },
  components: {
    Cell
  },
  computed: {},
  methods: {
    reset() {
      this.editedCells = [];
    },
    async save() {
      const cells = this.editedCells.filter(cell => cell.type !== "");

      const payload = {
        size: this.size,
        objects: cells
      };

      try {
        await this.axios.post(
          "https://us-central1-doge-sokoban.cloudfunctions.net/createMap",
          payload,
          {
            headers: { "Content-Type": "application/json" }
          }
        );
      } catch (e) {
        console.log(e);
      }
    },
    move(e: MouseEvent, x: number, y: number) {
      console.log(e.buttons);
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
