//Gameboard logic//
const gameBoard = (() => {
    const boardArray = Array(9).fill(null);

    const getBoard = () => boardArray;

    const logBoard = () => console.log(boardArray);

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

    return { getBoard, logBoard, reset, setMark };
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

    const isValidMark = (mark) => {
        const cleaned = mark.trim().toUpperCase();
        return cleaned === "X" || cleaned === "O";
    };

    const getValidMark = (promptText) => {
        let mark = prompt(promptText);
        while (mark === null || !isValidMark(mark)) {
            mark = prompt("Invalid mark. Please enter 'X' or 'O':");
        }
        return mark.trim().toUpperCase();
    };

    const switchMark = (mark) => {
        return mark === "X" ? "O" : "X";
    };

    const setIndex = (playerName) => {
        let input = prompt(`${playerName}, enter a number between 0-8:`);
        while (input === null || input.trim() === "" || Number.isNaN(Number(input))) {
            input = prompt(`Invalid input. ${playerName}, enter a number between 0-8:`);
        }
        return Number(input);
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

    const playTurn = () => {
        let boardIndex = setIndex(currentPlayer.name);
        while (!board.setMark(boardIndex, currentPlayer.mark)) {
            boardIndex = setIndex(currentPlayer.name);
        }
        board.logBoard();
    };

    const start = () => {
        board.reset();
        gameOver = false;

        const name1 = prompt("Enter player 1's name:");
        const mark1 = getValidMark("Enter player 1's mark ('X' or 'O'):");

        const name2 = prompt("Enter player 2's name:");
        const mark2 = switchMark(mark1);

        const player1 = createPlayer(name1, mark1);
        const player2 = createPlayer(name2, mark2);
        currentPlayer = player1;

        console.log(`Hello, I'm ${player1.name} and I'm playing ${player1.mark}`);
        console.log(`Hello, I'm ${player2.name} and I'm playing ${player2.mark}`);
    };

    const playRound = () => {
        while (!gameOver) {
            playTurn();
            const winningLine = checkWin(currentPlayer.mark);
            if (winningLine) {
                console.log(`${currentPlayer.name} wins!`);
                console.log(`Winning line: ${winningLine.join(", ")}`);
                gameOver = true;
                continue;
            }
            if (checkTie()) {
                console.log("It's a tie!");
                gameOver = true;
                continue;
            }
            currentPlayer = switchPlayer();
        }
    };

    return { start, playRound, getBoard: board.getBoard };
})();

gameController.start();
gameController.playRound();