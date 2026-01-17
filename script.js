const boardArray = [null, null, null, null, null, null, null, null, null];

function setMark(index, mark){
    return boardArray[index] = mark;
    //later, add function to refuse if cell isn't empty//
}

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

boardIndex = prompt("Enter a number between 0-8:");

setMark(boardIndex, player1.mark);
logBoard();

console.log(player1.mark);
console.log(player2.mark);

