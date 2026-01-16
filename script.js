const boardArray = [null, null, null, null, null, null, null, null, null];

turnFill = prompt("Enter a number between 0-8:");

boardArray[turnFill] = 'X';

console.log(boardArray);