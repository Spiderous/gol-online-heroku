"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    constructor() {
        this._currentGen = [];
        this._nextGen = [];
        this._interactions = [];
        this._dimensions = { cols: 70, rows: 70, gameWidth: 0, gameHeight: 0 };
        this._cellSize = 20;
        this._currentIteration = 0;
        this._tickSpeedMultiplier = 3;
        this._currentGen = new Array(this._dimensions.rows) // New array with rows
            .fill(0).map(row => new Array(this._dimensions.cols) // Fill array and map its contents
            .fill(0).map(col => Math.floor(Math.random() * 2))); // Map contents to columns
        this._dimensions.gameWidth = this._dimensions.cols * this._cellSize;
        this._dimensions.gameHeight = this._dimensions.rows * this._cellSize;
    }
    /* Getters */
    get updatePack() {
        return {
            currentGen: this._currentGen,
            currentIteration: this._currentIteration
        };
    }
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
            tickSpeedMultiplier: this._tickSpeedMultiplier
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
                    this._interactions.push([col, row, pattern[i][j]]);
            }
        }
    }
    upgradeGrid() {
        this._nextGen.length = 0;
        for (let row = 0; row < this._dimensions.rows; row++) {
            for (let col = 0; col < this._dimensions.cols; col++) {
                const cell = this._currentGen[row][col];
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
                        const nCell = this._currentGen[nRow][nCol];
                        if (nCell)
                            liveNeighbors++;
                    }
                }
                if (cell && liveNeighbors < 2)
                    this._nextGen.push([row, col, 0]);
                if (cell && liveNeighbors > 3)
                    this._nextGen.push([row, col, 0]);
                if (!cell && liveNeighbors == 3)
                    this._nextGen.push([row, col, 1]);
            }
        }
        this._interactions.forEach(next => {
            this._nextGen.push([next[0], next[1], next[2]]);
        });
        this._nextGen.forEach(next => {
            this._currentGen[next[0]][next[1]] = next[2];
        });
        this._interactions.length = 0;
        this._currentIteration++;
    }
}
exports.Game = Game;
