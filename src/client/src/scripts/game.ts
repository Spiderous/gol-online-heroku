import { Vue, Component } from "vue-property-decorator";
import io from "socket.io-client";

import PatternCreator from './pattern_creator'

enum GameState {
    LOADING = 0,
    PREPARED = 1,
    RUNNING = 2
}

class Game {

}


@Component
export default class Home extends Vue {
    patternCreator: PatternCreator = new PatternCreator(this);
    gameState: number = GameState.LOADING;

    camera = {
        offsetX: 0,
        offsetY: 0
    }

    mouseCursor = {
        overCell: {
            col: -1,
            row: -1
        },
        clickPos: {
            x: 0,
            y: 0
        },
        dragging: false,
    };

    isDev: boolean = process.env.NODE_ENV === "development";
    devPort: number = 2000;

    gameGrid!: {
        currentGen: number[][];
        currentIteration: number;
        dimensions: { cols: number; rows: number, gameWidth: number; gameHeight: number; };
        cellSize: number;
        tickSpeedMultiplier: number;
    };

    context!: CanvasRenderingContext2D;
    canvasWidth!: number;
    canvasHeight!: number;
    canvasRatio: number = 16 / 9;

    responsiveSm: number = 600;

    socket!: any;

    created() {
        this.socket = io(this.isDev ? `http://localhost:${this.devPort}` : "");

        this.handleSocketConnection();
    }

    mounted() {
        this.context = (this.$refs.canvas as HTMLCanvasElement).getContext(
            "2d"
        ) as CanvasRenderingContext2D;

        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }

    handleSocketConnection(): void {
        this.socket.on("init_pack", (initPack: any) => {
            this.gameGrid = { ...initPack };

            this.resizeCanvas();
            this.camera.offsetX = (this.context.canvas.width - this.gameGrid.dimensions.cols * this.gameGrid.cellSize) / 2;
            this.camera.offsetY = (this.context.canvas.height - this.gameGrid.dimensions.rows * this.gameGrid.cellSize) / 2;

            this.gameState = GameState.RUNNING;
            this.renderGame();
        });

        this.socket.on("update_pack", (updatePack: any) => {
            this.gameGrid.currentGen = updatePack.currentGen;
            this.gameGrid.currentIteration = updatePack.currentIteration;
        });
    }

    resizeCanvas() {
        let width = (window.innerWidth < this.responsiveSm ? 1 : 0.8) * window.innerWidth;
        let height = window.innerHeight < width / this.canvasRatio || window.innerWidth < this.responsiveSm ? window.innerHeight : width / this.canvasRatio;

        this.context.canvas.width = width;
        this.context.canvas.height = height;

        this.canvasWidth = width;
        this.canvasHeight = height;
    }

    mouseMove(e: MouseEvent) {
        if (this.gameState != GameState.RUNNING) return;

        const boundaries = this.context.canvas.getBoundingClientRect();
        this.mouseCursor.overCell.col = Math.floor(
            (e.pageX - this.camera.offsetX - boundaries.left) / this.gameGrid.cellSize
        );

        this.mouseCursor.overCell.row = Math.floor(
            (e.pageY - this.camera.offsetY - boundaries.top) / this.gameGrid.cellSize
        );


        if (this.mouseCursor.dragging) {
            this.camera.offsetX = e.pageX - this.mouseCursor.clickPos.x;
            this.camera.offsetY = e.pageY - this.mouseCursor.clickPos.y;
        }
    }

    mouseDown(e: MouseEvent) {
        if (this.gameState != GameState.RUNNING) return;
        if (this.patternCreator.isPlacing) return;


        this.mouseCursor.clickPos.x = e.pageX - this.camera.offsetX;
        this.mouseCursor.clickPos.y = e.pageY - this.camera.offsetY;
        this.mouseCursor.dragging = true;
    }

    mouseUp(e: MouseEvent) {
        if (this.gameState != GameState.RUNNING) return;

        this.mouseCursor.dragging = false;
    }

    canvasClick(e: MouseEvent) {
        if (this.gameState != GameState.RUNNING) return;

        if (this.patternCreator.isOpen || !this.patternCreator.isPlacing) return;

        this.socket.emit("create_pattern", {
            pattern: this.patternCreator.grid,
            offsetRow: this.mouseCursor.overCell.row - 2,
            offsetCol: this.mouseCursor.overCell.col - 2
        });

        this.patternCreator.resetGrid();
        this.patternCreator.closeCreator();
    }

    renderGame() {
        if (this.gameState != GameState.RUNNING) {
            requestAnimationFrame(this.renderGame);
            return;
        }

        this.context.fillStyle = "#333";
        this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        this.context.save();
        this.context.transform(1, 0, 0, 1, this.camera.offsetX, this.camera.offsetY);

        // Rendering grid
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

        //Render pattern preview if in placing pattern mode
        let outOfBounds = false;
        if (this.patternCreator.isPlacing) {
            this.context.fillStyle = "green";

            for (let i = 0; i < this.patternCreator.grid.length; i++) {
                for (let j = 0; j < this.patternCreator.grid.length; j++) {
                    const offsetCol = (this.mouseCursor.overCell.col + j - 2) * this.gameGrid.cellSize;
                    const offsetRow = (this.mouseCursor.overCell.row + i - 2) * this.gameGrid.cellSize;

                    if (this.patternCreator.grid[i][j] == 1) {
                        if (offsetRow < 0 || offsetRow >= this.gameGrid.dimensions.gameHeight) {
                            outOfBounds = true;
                            continue;
                        }

                        if (offsetCol < 0 || offsetCol >= this.gameGrid.dimensions.gameWidth) {
                            outOfBounds = true;
                            continue;
                        }


                        this.context.fillRect(
                            offsetCol,
                            offsetRow,
                            this.gameGrid.cellSize,
                            this.gameGrid.cellSize
                        );
                    }
                }
            }

            this.context.strokeStyle = outOfBounds ? "red" : "black";
            this.context.lineWidth = 2;
            this.context.strokeRect(
                (this.mouseCursor.overCell.col - 2) * this.gameGrid.cellSize,
                (this.mouseCursor.overCell.row - 2) * this.gameGrid.cellSize,
                this.gameGrid.cellSize * 5,
                this.gameGrid.cellSize * 5
            );
        }

        this.context.restore();
        requestAnimationFrame(this.renderGame);
    }
}