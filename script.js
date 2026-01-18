const boardArray = [null, null, null, null, null, null, null, null, null];

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

const name1 = prompt("Enter player 1's name:");
const mark1 = getValidMark("Enter player 1's mark ('X' or 'O'):");

const name2 = prompt("Enter player 2's name:");
const mark2 = switchMark(mark1);

const player1 = createPlayer(name1, mark1);
const player2 = createPlayer(name2, mark2);

console.log(`Hello, I'm ${player1.name} and I'm playing ${player1.mark}`);
console.log(`Hello, I'm ${player2.name} and I'm playing ${player2.mark}`);

function playRound(player) {
    boardIndex = setIndex(player.name);
    while (!setMark(boardIndex, player.mark)) {
        boardIndex = setIndex(player.name);
    }
    logBoard();
}

playRound(player1);
playRound(player2);
playRound(player1);

//check player turn
//ask player for index
//check if avaliable
//check if win
//switch player
//repeat