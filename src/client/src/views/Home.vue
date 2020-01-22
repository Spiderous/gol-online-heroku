<template>
  <div class="game">
    <!-- 5x5 pattern creator  -->
    <section class="creator" v-if="creatorOpen">
      <h1 class="creator-header">Kreator struktur</h1>

      <ul class="creator-grid">
        <ul class="grid-row" v-for="(row, i) in patternCreator" :key="i">
          <ul class="grid-col" v-for="(col, j) in patternCreator[i]" :key="j">
            <li
              class="grid-cell"
              :class="patternCreator[i][j] ? 'activated' : ''"
              @click="$set(patternCreator[i], j, patternCreator[i][j] ? 0 : 1)"
            ></li>
          </ul>
        </ul>
      </ul>

      <div class="creator-actions">
        <button
          class="action_choose-pattern"
          @click="creatorOpen = false; placingPattern = true;"
        >Dodaj strukturę</button>
        <button
          class="action_close-creator"
          @click="creatorOpen = false; placingPattern = false;"
        >Wyjdź z kreatora</button>
      </div>
    </section>

    <main class="main-content">
      <div class="game-wrapper">
        <div class="floating-actions">
          <button
            class="action_open-creator"
            @click="creatorOpen = !creatorOpen"
          >{{ creatorOpen ? "Zamknij kreator" : "Otwórz kreator" }}</button>
        </div>
        <canvas ref="canvas" @mousemove="mouseMove" @click="canvasClick"></canvas>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
/* eslint-disable */

import { Vue, Component, Ref } from "vue-property-decorator";
import io from "socket.io-client";
import { Socket } from "socket.io";

@Component
export default class Home extends Vue {
  patternCreator: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];
  creatorOpen: boolean = false;
  placingPattern: boolean = false;

  mouseCursor = {
    overCell: {
      col: -1,
      row: -1
    }
  };

  isDev: boolean = process.env.NODE_ENV === "development";
  devPort: number = 2000;

  gameGrid!: {
    currentGen: number[][];
    currentIteration: number;
    dimensions: { cols: number; rows: number };
    cellSize: number;
    tickSpeedMultiplier: number;
  };

  context!: CanvasRenderingContext2D;
  canvasWidth!: number;
  canvasHeight!: number;
  canvasRatio: number = 16 / 9;

  socket!: any;

  created() {
    this.socket = io(this.isDev ? `http://localhost:${this.devPort}` : "");

    this.handleSocketConnection();
  }

  mounted() {
    this.context = (this.$refs.canvas as HTMLCanvasElement).getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    // this.resizeCanvas();
    //
    // window.addEventListener("resize", () => {
    // this.resizeCanvas();
    // console.log("Resized!");
    // });
  }

  handleSocketConnection(): void {
    this.socket.on("init_pack", (initPack: any) => {
      this.gameGrid = { ...initPack };

      this.canvasWidth = initPack.cellSize * initPack.dimensions.cols;
      this.canvasHeight = initPack.cellSize * initPack.dimensions.rows;

      this.context.canvas.width = this.canvasWidth;
      this.context.canvas.height = this.canvasHeight;

      this.renderGame();
    });

    this.socket.on("update_pack", (updatePack: any) => {
      this.gameGrid.currentGen = updatePack.currentGen;
      this.gameGrid.currentIteration = updatePack.currentIteration;
    });
  }

  resizeCanvas() {
    this.canvasWidth = window.innerWidth * 0.7;
    this.canvasHeight = this.canvasWidth / this.canvasRatio;

    this.context.canvas.width = this.canvasWidth;
    this.context.canvas.height = this.canvasHeight;
  }

  mouseMove(e: MouseEvent) {
    const boundaries = this.context.canvas.getBoundingClientRect();
    this.mouseCursor.overCell.col = Math.floor(
      (e.pageX - boundaries.left) / this.gameGrid.cellSize
    );

    this.mouseCursor.overCell.row = Math.floor(
      (e.pageY - boundaries.top) / this.gameGrid.cellSize
    );
  }

  canvasClick(e: MouseEvent) {
    if (this.creatorOpen || !this.placingPattern) return;

    this.socket.emit("create_pattern", {
      pattern: this.patternCreator,
      offsetRow: this.mouseCursor.overCell.row - 2,
      offsetCol: this.mouseCursor.overCell.col - 2
    });

    this.patternCreator = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];

    this.placingPattern = false;
  }

  changeCreatorCellState(row: number, col: number) {
    this.$set(
      this.patternCreator[row],
      col,
      this.patternCreator[row][col] ? 0 : 1
    );
  }

  renderGame() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.lineWidth = 1;
    this.context.strokeStyle = "gray";

    for (let col = 0; col < this.gameGrid.dimensions.cols; col++) {
      for (let row = 0; row < this.gameGrid.dimensions.rows; row++) {
        const cell = this.gameGrid.currentGen[col][row];

        this.context.fillStyle = cell ? "black" : "white";

        this.context.fillRect(
          col * this.gameGrid.cellSize,
          row * this.gameGrid.cellSize,
          this.gameGrid.cellSize,
          this.gameGrid.cellSize
        );
        this.context.strokeRect(
          col * this.gameGrid.cellSize,
          row * this.gameGrid.cellSize,
          this.gameGrid.cellSize,
          this.gameGrid.cellSize
        );
      }
    }

    if (!this.creatorOpen && !this.placingPattern) {
      this.context.lineWidth = 3;
      this.context.strokeStyle = "red";
      this.context.strokeRect(
        this.mouseCursor.overCell.col * this.gameGrid.cellSize,
        this.mouseCursor.overCell.row * this.gameGrid.cellSize,
        this.gameGrid.cellSize,
        this.gameGrid.cellSize
      );
    }

    if (this.placingPattern) {
      this.context.fillStyle = "green";

      for (let i = 0; i < this.patternCreator.length; i++) {
        for (let j = 0; j < this.patternCreator.length; j++) {
          if (this.patternCreator[i][j]) {
            this.context.fillRect(
              (this.mouseCursor.overCell.col + j - 2) * this.gameGrid.cellSize,
              (this.mouseCursor.overCell.row + i - 2) * this.gameGrid.cellSize,
              this.gameGrid.cellSize,
              this.gameGrid.cellSize
            );
          }
        }
      }

      this.context.strokeStyle = "black";
      this.context.lineWidth = 2;
      this.context.strokeRect(
        (this.mouseCursor.overCell.col - 2) * this.gameGrid.cellSize,
        (this.mouseCursor.overCell.row - 2) * this.gameGrid.cellSize,
        this.gameGrid.cellSize * 5,
        this.gameGrid.cellSize * 5
      );
    }

    requestAnimationFrame(this.renderGame);
  }

  fillRect(x: number, y: number, w: number, h: number, color: string) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, w, h);
  }

  strokeRect(x: number, y: number, w: number, h: number, color: string) {
    this.context.fillStyle = color;
    this.context.strokeRect(x, y, w, h);
  }
}
</script>

<style lang="scss" scoped>
.game {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  outline: none;
  border: none;

  &:focus {
    color: white;
  }

  background: rgba(black, 0.8);
  padding: 0.6rem;
  font-size: 1.1rem;
  color: gold;

  cursor: pointer;
}

.creator {
  position: fixed;
  z-index: 4;

  background: rgba(black, 0.8);
  color: white;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  &-header {
    font-size: 4rem;
    margin-bottom: 2rem;
  }

  &-grid {
    display: flex;
    flex-direction: column;

    font-size: 1.5rem;
    margin-bottom: 1rem;

    .grid-row {
      display: flex;
    }

    .grid-cell {
      border: 1px solid gray;
      background: white;

      width: 45px;
      height: 45px;

      &.activated {
        background: black;
      }
    }
  }

  &-actions button {
    margin: 1rem 1rem;
  }
}

.main-content {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  .floating-actions {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;

    padding: 0.2rem;
  }

  canvas {
    position: relative;
    z-index: 1;
  }
}
</style>