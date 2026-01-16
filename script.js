const boardArray = [null, null, null, null, null, null, null, null, null];

function setMark(index, mark){
    return boardArray[index] = mark;
}

function getBoard() {
    console.log(boardArray);
}

function reset(){
    for (let i = 0; i < boardArray.length; i++) {
        boardArray[i] = null;
    }
}

boardIndex = prompt("Enter a number between 0-8:");
playerMark = prompt("Enter your mark 'X' or 'O':");

setMark(boardIndex, playerMark);
getBoard();

reset();
getBoard();