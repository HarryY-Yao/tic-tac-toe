const game = (function() {
    const gameBoard = createGameBoard();

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
        console.log(` ${gameBoard[0][0]} | ${gameBoard[0][1]} | ${gameBoard[0][2]} `);
        console.log(`---|---|---`);
        console.log(` ${gameBoard[1][0]} | ${gameBoard[1][1]} | ${gameBoard[1][2]} `);
        console.log(`---|---|---`);
        console.log(` ${gameBoard[2][0]} | ${gameBoard[2][1]} | ${gameBoard[2][2]} `);
    }

    function checkFreeSpaces() {
        let freeSpaces = 9;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j] != ' ') {
                    freespaces--;
                }
            }
        }

        return freeSpaces;
    }

    
    function playerOneMove(playerOne) {

    }


    function playerTwoMove(playerTwo) {

    }

    
    function checkWinner() {
        // checking the rows
        

        // checking the columns

        // checking the diagonals
    }


    function displayWinner(name) {
        console.log(`---- Congratulations ${name}! You Won! ----`);
    }


    function createPlayer(name, marker) {
        return { name, marker };
    }


    const start = () => {
        
        resetBoard();

        playerOne = createPlayer("p1", 'X');
        playerTwo = createPlayer("p2", "O");


        displayWinner
    }

    return {
        start
    }

})();