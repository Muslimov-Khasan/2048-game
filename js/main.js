
const gridSize = 4;
let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
let score = 0;

const isGameOver = () => {
    // Check if there are any valid moves left
    // You need to implement this logic based on your game rules
    // For simplicity, let's assume the game is over when there are no empty cells
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] === 0) {
                return false; // There is an empty cell, so the game is not over
            }
        }
    }
    return true; // No empty cells, game over
};

const openGameOverModal = () => {
    const modal = document.getElementById("game-over-modal");
    const finalScoreSpan = document.getElementById("final-score");
    finalScoreSpan.textContent = score;
    modal.style.display = "block";
};

const closeModal = () => {
    const modal = document.getElementById("game-over-modal");
    modal.style.display = "none";
};

const generateTile = () => {
    const value = Math.random() < 0.9 ? 2 : 4;
    const emptyCells = [];
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 0) {
                emptyCells.push({ row: rowIndex, col: colIndex });
            }
        });
    });

    if (emptyCells.length > 0) {
        const randomCell =
            emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.row][randomCell.col] = value;
    }
};

const updateGrid = () => {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";

    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const tile = document.createElement("div");
            tile.className = `tile tile-${cell || 0}`;
            tile.textContent = cell || "";
            gridContainer.appendChild(tile);
        });
    });

    document.getElementById("score").textContent = score;
};

const resetGame = () => {
    closeModal();

    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    score = 0;
    generateTile();
    generateTile();
    updateGrid();
};

const move = (direction) => {
    let moved = false;

    if (isGameOver()) {
        openGameOverModal();
    }
    const moveLeft = () => {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 1; col < gridSize; col++) {
                if (grid[row][col] !== 0) {
                    let currentCol = col;
                    while (currentCol > 0 && grid[row][currentCol - 1] === 0) {
                        grid[row][currentCol - 1] = grid[row][currentCol];
                        grid[row][currentCol] = 0;
                        currentCol--;
                        moved = true;
                    }

                    if (
                        currentCol > 0 &&
                        grid[row][currentCol - 1] === grid[row][currentCol]
                    ) {
                        grid[row][currentCol - 1] *= 2;
                        score += grid[row][currentCol - 1];
                        grid[row][currentCol] = 0;
                        moved = true;
                    }
                }
            }
        }
    };

    const moveRight = () => {
        for (let row = 0; row < gridSize; row++) {
            for (let col = gridSize - 2; col >= 0; col--) {
                if (grid[row][col] !== 0) {
                    let currentCol = col;
                    while (
                        currentCol < gridSize - 1 &&
                        grid[row][currentCol + 1] === 0
                    ) {
                        grid[row][currentCol + 1] = grid[row][currentCol];
                        grid[row][currentCol] = 0;
                        currentCol++;
                        moved = true;
                    }

                    if (
                        currentCol < gridSize - 1 &&
                        grid[row][currentCol + 1] === grid[row][currentCol]
                    ) {
                        grid[row][currentCol + 1] *= 2;
                        score += grid[row][currentCol + 1];
                        grid[row][currentCol] = 0;
                        moved = true;
                    }
                }
            }
        }
    };

    const moveUp = () => {
        for (let col = 0; col < gridSize; col++) {
            for (let row = 1; row < gridSize; row++) {
                if (grid[row][col] !== 0) {
                    let currentRow = row;
                    while (currentRow > 0 && grid[currentRow - 1][col] === 0) {
                        grid[currentRow - 1][col] = grid[currentRow][col];
                        grid[currentRow][col] = 0;
                        currentRow--;
                        moved = true;
                    }

                    if (
                        currentRow > 0 &&
                        grid[currentRow - 1][col] === grid[currentRow][col]
                    ) {
                        grid[currentRow - 1][col] *= 2;
                        score += grid[currentRow - 1][col];
                        grid[currentRow][col] = 0;
                        moved = true;
                    }
                }
            }
        }
    };

    const moveDown = () => {
        for (let col = 0; col < gridSize; col++) {
            for (let row = gridSize - 2; row >= 0; row--) {
                if (grid[row][col] !== 0) {
                    let currentRow = row;
                    while (
                        currentRow < gridSize - 1 &&
                        grid[currentRow + 1][col] === 0
                    ) {
                        grid[currentRow + 1][col] = grid[currentRow][col];
                        grid[currentRow][col] = 0;
                        currentRow++;
                        moved = true;
                    }

                    if (
                        currentRow < gridSize - 1 &&
                        grid[currentRow + 1][col] === grid[currentRow][col]
                    ) {
                        grid[currentRow + 1][col] *= 2;
                        score += grid[currentRow + 1][col];
                        grid[currentRow][col] = 0;
                        moved = true;
                    }
                }
            }
        }
    };

    switch (direction) {
        case "up":
            moveUp();
            break;
        case "down":
            moveDown();
            break;
        case "left":
            moveLeft();
            break;
        case "right":
            moveRight();
            break;
    }

    if (moved) {
        generateTile();
        updateGrid();

        if (isGameOver()) {
            openGameOverModal();
        }
    }
};

const handleKeyPress = (event) => {
    console.log(event.key);
    switch (event.key) {
        case "ArrowUp":
            move("up");
            break;
        case "ArrowDown":
            move("down");
            break;
        case "ArrowLeft":
            move("left");
            break;
        case "ArrowRight":
            move("right");
            break;
    }
};

const resetButton = document.getElementById('reset-btn');
resetButton.addEventListener('click', resetGame);

document.addEventListener('keydown', handleKeyPress);
resetGame(); // Initialize the game
