const game = (function() {
    const gameBoard = createGameBoard();
    const gameButtons = Array.from(document.querySelectorAll(".game-btn"));
    const startButton = document.querySelector(".start");
    const restartButton = document.querySelector(".restart");
    const container = document.querySelector(".container");
    const body = document.querySelector("body");
    const winnerCard = document.querySelector(".winner-card");
    const winnerText = document.querySelector(".winner");
    const pop = new Audio('pop.mp3');

    let currentMark = 'X';
    let winner = ' ';

    let rowNum;
    let colNum;

    const playerOne = createPlayer("p1", "X")
    const playerTwo = createPlayer("p2", "O")

    function toggleTurn() {
        if (currentMark === "X") {
            currentMark = "O";
            body.style.backgroundColor = "cornflowerblue";
        } else {
            currentMark = "X";
            body.style.backgroundColor = "coral";
        }
    }
    restartButton.addEventListener("click", () => {
        start();
    });

    startButton.addEventListener("click", () => {
        start();
    })

    gameButtons.forEach((button) => {
        
        button.addEventListener("click", () => {
            [ rowNum, colNum ] = button.id.split("");
            rowNum = Number(rowNum);
            colNum = Number(colNum);

            if (gameBoard[rowNum][colNum] == ' ' && checkFreeSpaces() != 0 && winner == ' ') {
                gameBoard[rowNum][colNum] = currentMark;
               // pop.play();
                displayBoard();
                toggleTurn();
                winner = checkWinner();
            }

            if (checkFreeSpaces() == 0 || winner != ' ') {
                displayWinner();
            }
        });
    });

    function createGameBoard() {
        return [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ]
    }

    function resetBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameBoard[i][j] = ' '
            }
        }
    }

    function displayBoard() {
         let gameBoardCells = [];
         for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameBoardCells.push(gameBoard[i][j]);
            }
         }

         for (let i = 0; i < 9; i++) {
            gameButtons[i].innerText = gameBoardCells[i];
         }
    }

    function checkFreeSpaces() {
        let freeSpaces = 9;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j] != ' ') {
                    freeSpaces--;
                }
            }
        }

        return freeSpaces;
    }
    
    /* function playerOneMove(playerOne) {
        do { 
        rowNum = null
        colNum = null

        waitTurn();

        if (gameBoard[rowNum][colNum] != ' ') {
            console.log("Invalid Input");
        } else {
            gameBoard[rowNum][colNum] = playerOne.marker
        }
        
        } while (gameBoard[rowNum][colNum] == ' ');
    }
 */

   /*  function playerTwoMove(playerTwo) {
        do { 
            rowNum = null
            colNum = null
    
            waitTurn();
    
            if (gameBoard[rowNum][colNum] != ' ') {
                console.log("Invalid Input");
            } else {
                gameBoard[rowNum][colNum] = playerTwo.marker
            }
            
            } while (gameBoard[rowNum][colNum] == ' ');
    } */

    
    function checkWinner() {
        // checking the rows
        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][0] == gameBoard[i][1] && gameBoard[i][0] == gameBoard[i][2]) {
                return gameBoard[i][0];
            }
        }

        // checking the columns
        for (let i = 0; i < 3; i++) {
            if (gameBoard[0][i] == gameBoard[1][i] && gameBoard[0][i] == gameBoard[2][i]) {
                return gameBoard[0][i];
            }
        }

        // checking the diagonals
        if (gameBoard[0][0] == gameBoard[1][1] && gameBoard[0][0] == gameBoard[2][2]) {
            return gameBoard[0][0];
        }

        if (gameBoard[0][2] == gameBoard[1][1] && gameBoard[0][2] == gameBoard[2][0]) {
            return gameBoard[0][2];
        }

        return ' ';
    }


    function displayWinner() {
        winnerCard.classList.remove("hidden");

        if (winner == ' ') {
            winnerText.textContent = "Tie"
        } else if (winner == 'X') {
            winnerText.textContent = `${playerOne.name}`;
        } else {
            winnerText.textContent = `${playerTwo.name}`;
        }
    }


    function createPlayer(name, marker) {
        return { name, marker };
    }


    const start = () => {
        body.style.backgroundColor = "coral";
        currentMark = 'X';
        winner = ' ';
        resetBoard();
        displayBoard();

        winnerCard.classList.add("hidden");
        startButton.classList.add("hidden");
        container.classList.remove("hidden");

        /* while (winner == ' ' && checkFreeSpaces() != 0) {
            displayBoard();
            
            playerOneMove(playerOne);
            winner = checkWinner();
            if (winner != ' ' || checkFreeSpaces() == 0) {
                break;
            }
            
            displayBoard();

            playerTwoMove(playerTwo);
            winner = checkWinner();
            if (winner != ' ' || checkFreeSpaces() == 0) {
                break;
            }
        }

        displayBoard();

        if (winner == playerOne.marker) {
            displayWinner(playerOne.name);
        } else if (winner == playerTwo.marker) {
            displayWinner(playerTwo.name);
        } else {
            console.log("--- it's a tie! ---");
        } */
    }

    return {
        start
    }


})();
 

