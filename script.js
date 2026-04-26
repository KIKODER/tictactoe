//Gameboard logic//
const gameBoard = (() => {
    const boardArray = Array(9).fill(null);

    const getBoard = () => boardArray;

    const reset = () => {
        for (let i = 0; i < boardArray.length; i++) {
            boardArray[i] = null;
        }
    };

    const setMark = (index, mark) => {
        if (!Number.isInteger(index)) return false;
        if (index < 0 || index >= boardArray.length) return false;
        if (boardArray[index] !== null) return false;

        boardArray[index] = mark;
        return true;
    };

    return { getBoard, reset, setMark };
})();

//Player factory//
function createPlayer(name, mark) {
    return { name, mark };
}

//Game loop logic//
const gameController = (() => {
    const board = gameBoard;

    const winLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let player1 = null;
    let player2 = null;
    let currentPlayer = null;
    let gameOver = false;

    const switchMark = (mark) => {
        return mark === "X" ? "O" : "X";
    };

    const switchPlayer = () => (currentPlayer === player1 ? player2 : player1);

    const checkWin = (mark) => {
        const state = board.getBoard();
        for (let i = 0; i < winLines.length; i++) {
            const [a, b, c] = winLines[i];
            if (
                state[a] === mark &&
                state[b] === mark &&
                state[c] === mark) {
                return winLines[i];
            }
        }
        return null;
    };

    const checkTie = () => {
        const state = board.getBoard();
        for (let i = 0; i < state.length; i++) {
            if (state[i] === null) return false;
        }
        return true;
    };

    const start = (name1, name2, mark1) => {
        board.reset();
        gameOver = false;

        const mark2 = switchMark(mark1);

        player1 = createPlayer(name1, mark1);
        player2 = createPlayer(name2, mark2);
        currentPlayer = player1;
    };

    const playMove = (index) => {
        if (gameOver) {
            return { success: false, message: "Game is over." };
        }

        const placed = board.setMark(index, currentPlayer.mark);

        if (!placed) {
            return { success: false, message: "That cell is already taken." };
        }

        const winningLine = checkWin(currentPlayer.mark);
        if (winningLine) {
            gameOver = true;
            return {
                success: true,
                winner: currentPlayer,
                tie: false,
                gameOver: true,
                winningLine
            };
        }

        if (checkTie()) {
            gameOver = true;
            return {
                success: true,
                winner: null,
                tie: true,
                gameOver: true,
                winningLine: null
            };
        }

        switchPlayer();

        return {
            success: true,
            winner: null,
            tie: false,
            gameOver: false,
            winningLine: null
        };
    };

    const getBoard = () => board.getBoard();
    const getCurrentPlayer = () => currentPlayer;
    const isGameOver = () => gameOver;

    return { start, playMove, getBoard, getCurrentPlayer, isGameOver };
})();

//DOM logic//

const playboard = document.querySelector("#playboard");

//gameController.start();//
//gameController.playRound();//