const boardArray = [null, null, null, null, null, null, null, null, null];

const winLines = [
    [0, 1, 2], 
    [3, 4 ,5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
];

function getBoard() {
    return boardArray;
}

function logBoard() {
    console.log(boardArray);
}

function reset(){
    for (let i = 0; i < boardArray.length; i++) {
        boardArray[i] = null;
    }
}

function createPlayer(name, mark) {
    return {
        name: name,
        mark: mark
    }
}

function setMark(index, mark) {
    if (!Number.isInteger(index)) return false;

    if (index < 0 || index >= boardArray.length) return false;

    if (boardArray[index] !== null) return false;

    boardArray[index] = mark;
    return true;
}

function setIndex(playerName) {
    let input = prompt(`${playerName}, enter a number between 0-8:`);
    while (input === null || input.trim() === "" || Number.isNaN(Number(input))) {
        input = prompt(`Invalid input. ${playerName}, enter a number between 0-8:`);
    }
    return Number(input);
}

function getValidMark(promptText) {
    let mark = prompt(promptText);

    while (mark === null || !isValidMark(mark)) {
        mark = prompt("Invalid mark. Please enter 'X' or 'O':");
    }
    return mark.trim().toUpperCase();
}

function isValidMark(mark) {
    const cleaned = mark.trim().toUpperCase();
    return cleaned === "X" || cleaned === "O";
}

function switchMark(mark) {
    return mark === "X" ? "O" : "X";
}

function switchPlayer(player) {
    return player === player1 ? player2 : player1;
}

const name1 = prompt("Enter player 1's name:");
const mark1 = getValidMark("Enter player 1's mark ('X' or 'O'):");

const name2 = prompt("Enter player 2's name:");
const mark2 = switchMark(mark1);

const player1 = createPlayer(name1, mark1);
const player2 = createPlayer(name2, mark2);

let currentPlayer = player1;

console.log(`Hello, I'm ${player1.name} and I'm playing ${player1.mark}`);
console.log(`Hello, I'm ${player2.name} and I'm playing ${player2.mark}`);

function playTurn(player) {
    let boardIndex = setIndex(player.name);
    while (!setMark(boardIndex, player.mark)) {
        boardIndex = setIndex(player.name);
    }
    logBoard();
}

function checkWin(mark) {
    for (let i = 0; i < winLines.length; i++) {
        const [a, b, c] = winLines[i];
        if (
            boardArray[a] === mark && 
            boardArray[b] === mark && 
            boardArray[c] === mark) {
                return winLines[i];
            }
    }
    return null;
}

function checkTie() {
    for (let i = 0; i < boardArray.length; i++) {
        if (boardArray[i] === null) return false;
    }
    return true;
}

function playRound() {
    let gameOver = false;

    while (!gameOver) {
        playTurn(currentPlayer);

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

        currentPlayer = switchPlayer(currentPlayer);
    }
}

playRound();