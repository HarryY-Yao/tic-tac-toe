const game = (function() {
    const gameBoard = createGameBoard();
    const gameButtons = Array.from(document.querySelectorAll(".game-btn"));
    const startButton = document.querySelector(".start");
    const restartButton = document.querySelector(".restart");
    const container = document.querySelector(".container");
    const xTurnDisplay = document.querySelector(".turn-x");
    const oTurnDisplay = document.querySelector(".turn-o");
    const body = document.querySelector("body");
    const playerOnePrompt = document.querySelector(".player1");
    const playerTwoPrompt = document.querySelector(".player2");
    const playerOneName = document.getElementById("player-one-name");
    const playerTwoName = document.getElementById("player-two-name");
    const firstContinue = document.querySelector(".first");
    const secondContinue = document.querySelector(".second");
    const winnerCard = document.querySelector(".winner-card");
    const winnerText = document.querySelector(".winner");
    const pop = new Audio('pop.mp3');

    let currentMark = 'X';
    let winner = ' ';

    let rowNum;
    let colNum;

    const playerOne = createPlayer("X", "X");
    const playerTwo = createPlayer("O", "O");

    firstContinue.addEventListener("click", (event) => {
        if (playerOneName.value.length > 0) {
            submitName(playerOne, playerOneName.value);
        }
        playerOnePrompt.classList.add("hidden");
        playerTwoPrompt.classList.remove("hidden");
        event.preventDefault();
    })


    secondContinue.addEventListener("click", (event) => {
        if (playerTwoName.value.length > 0) {
            submitName(playerTwo, playerTwoName.value);
        }
        playerTwoPrompt.classList.add("hidden");
        restart();
        event.preventDefault();
    })


    function submitName(player, playerName) {
        player.name = playerName;
    }

    function toggleTurn() {
        if (currentMark === "X") {
            currentMark = "O";
            xTurnDisplay.classList.add("hidden");
            oTurnDisplay.classList.remove("hidden");
            body.style.backgroundColor = "cornflowerblue";
        } else {
            currentMark = "X";
            xTurnDisplay.classList.remove("hidden");
            oTurnDisplay.classList.add("hidden");
            body.style.backgroundColor = "coral";
        }
    }
    restartButton.addEventListener("click", () => {
        restart();
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
        xTurnDisplay.classList.add("hidden");
        oTurnDisplay.classList.add("hidden");
        winnerCard.classList.remove("hidden");
        body.style.backgroundColor = "purple";

        if (winner == ' ') {
            winnerText.textContent = "Tie"
        } else if (winner == 'X') {
            winnerText.textContent = `${playerOne.getName()}`;
        } else {
            winnerText.textContent = `${playerTwo.getName()}`;
        }
    }


    function createPlayer(name, marker) {

        let _name = name;

        return { getName: () => _name, set name(newName) {
            _name = newName;
            }
        };
    }

    const start = () => {
        startButton.classList.add("hidden");
        playerOnePrompt.classList.remove("hidden");
    }

    const restart = () => {
        body.style.backgroundColor = "coral";
        currentMark = 'X';
        winner = ' ';
        resetBoard();
        displayBoard();

        oTurnDisplay.classList.add("hidden");
        xTurnDisplay.classList.remove("hidden");
        winnerCard.classList.add("hidden");
        container.classList.remove("hidden");
    }

})();
 

