const player = 'X';
const computer = 'O';
const gameResult = document.getElementById('game-result');
const gameArea = document.querySelector('.game-area');
const resetBtn = document.querySelector('button');

let boardFull = false;
let board = ['', '', '', '', '', '', '', '', ''];


const initiateBoard = () => {
    gameArea.innerHTML = ""
    board.forEach((eve, ind) => {
        gameArea.innerHTML += `<div id="block-${ind}" class="block" onclick="playerMove(${ind})">${board[ind]}</div>`
    });
}

const playerMove = event => {
    if (!boardFull && board[event] == "") {
        board[event] = player;
        loopGame();
        computerMove();
    }
};

const computerMove = () => {
    if (!boardFull) {
        do {
            selected = Math.floor(Math.random() * 9);
        } while (board[selected] != "");
        
        board[selected] = computer;
        loopGame();
    }
};

const checkBoardIsComplete = () => {
    let isFull = true;
    board.forEach(e => {
        if (e != player && e != computer) {
            isFull = false;
        }
    });

    boardFull = isFull;
}

const loopGame = () => {
    initiateBoard();
    checkBoardIsComplete();
    checkGameResult();
}

const checkGameResult = () => {
    let res = checkGameMatch();
    if (res == player) {
        gameResult.innerText = "By the crosses be purged!";
        gameResult.classList.add('playerVic');
        boardFull = true;
    } else if (res == computer) {
        gameResult.innerText = "Thou shall 'nought' 'cross'!";
        gameResult.classList.add('computerVic');
        boardFull = true;
    } else if (boardFull) {
        gameResult.innerText = "Non shall prevail!";
        gameResult.classList.add('tie');
    }
}

const checkLine = (a, b, c) => board[a] == board[b] && board[b] == board[c] && (board[a] == player || board[a] == computer);

const checkGameMatch = () => {
    for (i = 0; i < board.length; i += 3) {
        if (checkLine(i, i + 1, i + 2)) {
            return board[i];
        }
    }

    for (i = 0; i < 3; i++) {
        if (checkLine(i, i + 3, i + 6)) {
            return board[i];
        }
    }

    if (checkLine(0, 4, 8)) {
        return board[0];
    }

    if (checkLine(2, 4, 6)) {
        return board[2];
    }
    return "";
}

const resetGameBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    boardFull = false;
    gameResult.classList.remove('playerVic');
    gameResult.classList.remove('computerVic');
    gameResult.classList.remove('tie');
    gameResult.innerText = ""; 
    initiateBoard();  
}

resetBtn.addEventListener('click', resetGameBoard);

initiateBoard();