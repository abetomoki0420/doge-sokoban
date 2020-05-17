<template>
  <div class="editor">
    <h1>Doge Sokoban Editor</h1>
    <div>
      <span>size</span>
      <input min="6" max="10" type="number" v-model.number="size" />
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
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Cell from "@/components/Cell.vue";

interface CellInfo {
  X: number;
  Y: number;
  type: string;
}

interface Data {
  size: number;
  editedCells: CellInfo[];
}

export default Vue.extend({
  name: "Game",
  data(): Data {
    return {
      size: 6,
      editedCells: []
    };
  },
  components: {
    Cell
  },
  computed: {},
  methods: {
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

      if (targetCell) {
        switch (targetCell.type) {
          case "": {
            targetCell.type = "user";
            break;
          }
          case "user": {
            targetCell.type = "wall";
            break;
          }
          case "wall": {
            targetCell.type = "box";
            break;
          }
          case "box": {
            targetCell.type = "star";
            break;
          }
          case "star": {
            targetCell.type = "";
            break;
          }
          default:
            break;
        }
      } else {
        this.editedCells.push({
          X: x,
          Y: y,
          type: "user"
        });
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.editor {
  text-align: center;
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
}
</style>
