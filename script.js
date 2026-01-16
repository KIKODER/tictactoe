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

const player = {
    name: "",
    mark: ""
};

player.name = prompt("Enter your name:");
player.mark = prompt("Enter your mark 'X' or 'O':");

boardIndex = prompt("Enter a number between 0-8:");

setMark(boardIndex, player.mark);
getBoard();

