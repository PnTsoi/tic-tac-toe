const body = document.getElementById('main-display');
const playBtn = document.getElementById('play');
const gameBoardDom = document.getElementById('game-board');
const boxArray = document.querySelectorAll('.box');
const playerScore = document.getElementById('player-score').querySelector('.score');
const aiScore = document.getElementById('ai-score').querySelector('.score');

// an array of markers
const markerArray = ["X","O"];
// this is the default gameboard. 2d array
const modelGameBoard = [
    ["","",""],
    ["","",""],
    ["","",""]
];

// this is the factory function for the game itself;
const mainGame = () => {
    let gameBoard = JSON.parse(JSON.stringify(modelGameBoard));
    let playerMarker = "";
    let AIMarker = "";
    let playerS = 0;
    let aiS = 0;
    let listeners = []
    //function to reset game board
    const setBoard = () => { 
        updateBoard();
        for(let i = 0; i < boxArray.length; i++) {
            listeners.push(() => {return checkBox(i);});
            boxArray[i].addEventListener("click", listeners[i]);
        };
        playerMarker = markerArray[Math.floor(Math.random()*markerArray.length)];
        if(playerMarker == "X") {
            alert("You have been assigned X as your marker, you can go first!");
            AIMarker = "O";
        }
        else {
            alert("You have been assigned O as your marker, you will go second");
            AIMarker = "X";
            computerMove();
            updateBoard();
        }
    };
    const resetGame = () => {
        gameBoard = JSON.parse(JSON.stringify(modelGameBoard));
        setBoard();
    };
    //function to update the board every time there is something new
    const updateBoard = () => {
        boxArray[0].textContent = gameBoard[0][0];
        boxArray[1].textContent = gameBoard[0][1];
        boxArray[2].textContent = gameBoard[0][2];
        boxArray[3].textContent = gameBoard[1][0];
        boxArray[4].textContent = gameBoard[1][1];
        boxArray[5].textContent = gameBoard[1][2];
        boxArray[6].textContent = gameBoard[2][0];
        boxArray[7].textContent = gameBoard[2][1];
        boxArray[8].textContent = gameBoard[2][2];
        playerScore.textContent = playerS.toString();
        aiScore.textContent = aiS.toString();
    };

    const checkBox = (coord) => {
        if(boxArray[coord].textContent == "") {
            boxArray[coord].textContent = playerMarker;
            let twoDCoord = getCoord(coord);
            gameBoard[twoDCoord[0]][twoDCoord[1]] = playerMarker;
            updateBoard();
            if(checkWin()) {
                alert("You won!");
                disableEvents();
                playerS += 1;
            }
            else
                computerMove();
        }
    };

    const computerMove = () => {
        let truther = false;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(gameBoard[i][j] == "") {
                    truther = true;
                    break;
                }
            }
        }
        if(!truther) {
            alert("Draw!");
            disableEvents();
        }
        else {
            let AIcoordX = Math.floor(Math.random()*3);
            let AIcoordY = Math.floor(Math.random()*3);
            while(gameBoard[AIcoordX][AIcoordY] != "") {
                AIcoordX = Math.floor(Math.random()*3);
                AIcoordY = Math.floor(Math.random()*3);
            }
            gameBoard[AIcoordX][AIcoordY] = AIMarker;
            updateBoard();
            if(checkWin()) {
                alert("AI has won");
                disableEvents();
                aiS += 1;
            }
        }
    };

    const getCoord = (coord) => {
        if( coord == 0 ) return [0,0];
        if( coord == 1 ) return [0,1];
        if( coord == 2 ) return [0,2];
        if( coord == 3 ) return [1,0];
        if( coord == 4 ) return [1,1];
        if( coord == 5 ) return [1,2];
        if( coord == 6 ) return [2,0];
        if( coord == 7 ) return [2,1];
        if( coord == 8 ) return [2,2];
    };

    const checkWin = () => {
        //check rows:
        console.log(gameBoard);

        for(let i = 0; i < 3; i++) {
            if(gameBoard[i])
            if(gameBoard[i][0] != "" && gameBoard[i][0] == gameBoard[i][1] && gameBoard[i][1] == gameBoard[i][2]) {
                return true;
            }
        }
        //check cols:
        for(let i = 0; i < 3; i++) {
            if(gameBoard[0][i] != "" && gameBoard[0][i] == gameBoard[1][i] && gameBoard[1][i] == gameBoard[2][i]) {
                return true;
            }
        }
        //check diags
        if(gameBoard[1][1] != "" && gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2]) return true;
        if(gameBoard[1][1] != "" && gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0]) return true;

        let truther = false;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(gameBoard[i][j] == "") {
                    truther = true;
                    break;
                }
            }
        }
        if(!truther) {
            alert("Draw!");
            disableEvents();
        }
        return false;
    };
    const disableEvents = () => { 
        for(let i = 0; i < boxArray.length; i++) {
            boxArray[i].removeEventListener("click", listeners[i]);
        };
        listeners = [];
    };
    return {resetGame, updateBoard};
};


let currentGame = mainGame();
playBtn.addEventListener("click", () => {
    currentGame.resetGame();
    playBtn.textContent = "Reset Game!";
});


