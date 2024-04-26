export const checkWin = (gameBoard, currentMove, currentPlayer) => {
    let board = [...gameBoard];
    board[currentMove] = currentPlayer;

    const winningCombos = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c, d] = winningCombos[i];
        if (board[a] &&
            board[a] === board[b] &&
            board[a] === board[c] &&
            board[a] === board[d]) {
            return true;
        }
    }
    return false;
}

export const checkDraw = (gameBoard, currentMove, currentPlayer) => {
    let board = [...gameBoard];
    board[currentMove] = currentPlayer;

    let count = board.reduce((acc, board) => acc + (board===0), 0);
    return count === 0;
}

const getRandomComputerMove = (gameBoard) => {
    let vaildMove =[];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === 0) {
            vaildMove.push(i);
        }
    }
    const random = Math.floor(Math.random() * vaildMove.length);
    return vaildMove[random];
}

const getComputerMove = (gameBoard, currentMove, currentPlayer) => {
    let board = [...gameBoard];
    board[currentMove] = currentPlayer;

    let count = board.reduce((acc, board) => acc + (board===0), 0);
    if (count === 0) {
        return -1;
    }

    for (let i = 0; i < board.length; i++) {
        if (board[i] === 0) {
            board[i] = 2;   
            if (checkWin(board, i, 2)) {
                board[i] = 0;
                return i;
            }
            board[i] = 0;
        }
    }
    for (let i = 0; i < board.length; i++) {
        if (board[i] === 0) {
            board[i] = 1;
            if (checkWin(board, i, 1)) {
                board[i] = 0;
                return i;
            }
            board[i] = 0;
        }
    }

    let vaildMove =[];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === 0) {
            vaildMove.push(i);
        }
    }
    const random = Math.floor(Math.random() * vaildMove.length);
    return vaildMove[random];
}

export const getComputer = (gameBoard) => {
    let moveChecks = [
        //vertical
        {
            indexes:[0, 4, 8, 12], //2nd loop [1, 5, 9, 13] etc.. (for 4 columns)
            max:4, // number of times we need to loop in this case 4 for the 4 columns
            step:1 // how much we need to increment the index
        },
        //horizontal
        {
            indexes:[0, 1, 2, 3], //2nd loop [4, 5, 6, 7] etc.. (for 4 rows)
            max:16, // number of times we need to loop in this case 16 for the 4 rows
            step:4 
        },
        //diagonal
        {
            indexes:[0, 5, 10, 15], 
            max:16,
            step:16 // because there's only one diagonal, we only need to loop once
        },
        //anti-diagonal
        {
            indexes:[3, 6, 9, 12],
            max:16,
            step:16
        }
    ];
    let move = getPosition(gameBoard, moveChecks);
    if(move > -1) return move;
    return getRandomComputerMove(gameBoard);
}

const getPosition = (gameBoard, moveChecks) => {
    for(let i = 0; i < moveChecks.length; i++) {
        for(let j = 0; j < moveChecks[i].max; j+=moveChecks[i].step) {
            let series = gameBoard[j+ moveChecks[i].indexes[0]].toString()+
            gameBoard[j+ moveChecks[i].indexes[1]].toString()+
            gameBoard[j+ moveChecks[i].indexes[2]].toString()+
            gameBoard[j+ moveChecks[i].indexes[3]].toString();
            switch (series) {
                case "1110":
                case "2220":
                    return j+ moveChecks[i].indexes[3];
                case "1101":
                case "2202":
                    return j+ moveChecks[i].indexes[2];
                case "1011":
                case "2022":
                    return j+ moveChecks[i].indexes[1];
                case "0111":
                case "0221":
                    return j+ moveChecks[i].indexes[0];
                default:
                    break;
            }
        }
    }
    return -1;
}