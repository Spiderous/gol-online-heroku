export class Game {
    private _currentGen: Array<Array<number>> = [];
    private _nextGen: Array<Array<number>> = [];
    private _dimensions = { cols: 40, rows: 40 };
    private _cellSize: number = 20;

    private _currentIteration: number = 0;
    private _tickSpeedMultiplier: number = 1;

    constructor() {
        this._currentGen = new Array(this._dimensions.rows) // New array with rows
            .fill(0).map(row => new Array(this._dimensions.cols) // Fill array and map its contents
                .fill(0).map(col => Math.floor(Math.random() * 2))); // Map contents to columns
    }

    /* Getters */
    get updatePack(): object {
        return {
            currentGen: this._currentGen,
            currentIteration: this._currentIteration
        };
    }

    get initPack(): object {
        return {
            currentGen: this._currentGen,
            currentIteration: this._currentIteration,
            dimensions: this._dimensions,
            cellSize: this._cellSize,
            tickSpeedMultiplier: this._tickSpeedMultiplier
        }
    }

    get tickSpeed(): number {
        return this._tickSpeedMultiplier;
    }

    /* Functions */
    addPattern(pattern: Array<Array<number>>, offsetRow: number, offsetCol: number) {
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern.length; j++) {
                const row = i + offsetRow;
                const col = j + offsetCol;

                if (col < 0 || col >= this._dimensions.cols) continue;
                if (row < 0 || row >= this._dimensions.rows) continue;

                if (pattern[i][j] == 1)
                    this._nextGen.push([col, row, pattern[i][j]]);
            }
        }
    }

    upgradeGrid() {
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

                        if (nCell) liveNeighbors++;
                    }
                }

                if (cell && liveNeighbors < 2) this._nextGen.push([row, col, 0]);
                if (cell && liveNeighbors > 3) this._nextGen.push([row, col, 0]);
                if (!cell && liveNeighbors == 3) this._nextGen.push([row, col, 1]);
            }
        }

        this._nextGen.forEach(next => {
            this._currentGen[next[0]][next[1]] = next[2];
        });

        this._currentIteration++;
    }
}