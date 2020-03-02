"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    constructor() {
        this._currentGen = [];
        this._nextGen = [];
        this._interactions = [];
        this._heatMap = [];
        this._dimensions = { cols: 80, rows: 80, gameWidth: 0, gameHeight: 0 };
        this._cellSize = 20;
        this._currentIteration = 0;
        this._tickSpeedMultiplier = 2;
        this._currentGen = new Array(this._dimensions.rows) // New array with rows
            .fill(0).map(row => new Array(this._dimensions.cols) // Fill array and map its contents
            .fill(0)
            .map(col => ({
            state: Math.floor(Math.random() * 2),
            heatCount: 0
        }))); // Map contents to column
        for (let i = 0; i < this._dimensions.rows; i++) {
            for (let j = 0; j < this._dimensions.cols; j++) {
                this._heatMap[i * this._dimensions.cols + j] = 0;
            }
        }
        this._dimensions.gameWidth = this._dimensions.cols * this._cellSize;
        this._dimensions.gameHeight = this._dimensions.rows * this._cellSize;
    }
    /* Getters */
    get nextGenPack() {
        return {
            currentIteration: this._currentIteration,
            nextGen: this._nextGen
        };
    }
    get initPack() {
        return {
            currentGen: this._currentGen,
            currentIteration: this._currentIteration,
            dimensions: this._dimensions,
            cellSize: this._cellSize,
            tickSpeedMultiplier: this._tickSpeedMultiplier,
            heatMap: this._heatMap.filter(v => v != 0)
        };
    }
    get tickSpeed() {
        return this._tickSpeedMultiplier;
    }
    /* Functions */
    addPattern(pattern, offsetRow, offsetCol) {
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern.length; j++) {
                const row = i + offsetRow;
                const col = j + offsetCol;
                if (col < 0 || col >= this._dimensions.cols)
                    continue;
                if (row < 0 || row >= this._dimensions.rows)
                    continue;
                if (pattern[i][j] == 1)
                    this._interactions.push([col, row, pattern[i][j], ++this._heatMap[col + row * this._dimensions.cols]]);
            }
        }
    }
    upgradeGrid() {
        this._nextGen.length = 0;
        for (let row = 0; row < this._dimensions.rows; row++) {
            for (let col = 0; col < this._dimensions.cols; col++) {
                const cellState = this._currentGen[row][col].state;
                let liveNeighbors = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const nRow = row + i;
                        const nCol = col + j;
                        if (i == 0 && j == 0)
                            continue;
                        if (nRow < 0 || nRow >= this._dimensions.rows)
                            continue;
                        if (nCol < 0 || nCol >= this._dimensions.cols)
                            continue;
                        const nCellState = this._currentGen[nRow][nCol].state;
                        if (nCellState)
                            liveNeighbors++;
                    }
                }
                if (cellState && (liveNeighbors < 2 || liveNeighbors > 3)) {
                    this._nextGen.push([row, col, 0, ++this._heatMap[col + row * this._dimensions.cols]]);
                }
                if (!cellState && liveNeighbors == 3) {
                    this._nextGen.push([row, col, 1, ++this._heatMap[col + row * this._dimensions.cols]]);
                }
            }
        }
        this._interactions.forEach(next => {
            this._nextGen.push([next[0], next[1], next[2], next[3]]);
        });
        this._nextGen.forEach(next => {
            this._currentGen[next[0]][next[1]].state = next[2];
            this._currentGen[next[0]][next[1]].heatCount = next[3];
        });
        this._interactions.length = 0;
        this._currentIteration++;
    }
}
exports.Game = Game;
