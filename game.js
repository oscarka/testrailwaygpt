// 初始化游戏板
const gameBoard = document.getElementById('gameBoard');
const boardSize = 8; // 8x8 方块
const blockColors = ['red', 'green', 'blue', 'yellow', 'purple'];

// 生成游戏方块
function generateBoard() {
    for (let i = 0; i < boardSize * boardSize; i++) {
        const block = document.createElement('div');
        block.classList.add('game-block');
        block.style.backgroundColor = blockColors[Math.floor(Math.random() * blockColors.length)];
        gameBoard.appendChild(block);
    }
}

generateBoard();
