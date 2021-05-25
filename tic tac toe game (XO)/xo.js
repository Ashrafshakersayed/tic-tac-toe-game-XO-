
// select game stautes to display message
const statusDisplay = document.querySelector('.gameStatus');
// initilize variables
var gameActive = true;
var currentPlayer = "X";
var AI , human;
var gameState = ["", "", "", "", "", "", "", "", ""];
//all wining condintond -> 8 conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var playerColor = "blue";
//game level selector
var levelSelect = document.getElementById("level");
var selector = document.getElementById('playerChar');
var level = levelSelect.value;
//update statues message
function currentPlayerTurn() {

  statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
  
}

//initlize stautes message

 currentPlayerTurn();
 
 //add event (click) lisnter to the bord and button

document.getElementById('container').addEventListener('click', playCell);
document.getElementById('apply').addEventListener('click', applyChanges);

// handle click cell event
function playCell(event) {
    // get the clicked cell
    var clickedCell = event.target
     
    //get the id of the cell
    var clickedCellIndex =  clickedCell.getAttribute('id');
    //if the cell alredy clicked before or the game is stop
    //then ignore the click 
     if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
    //else 
    //play the cell    
     handleCellPlayed(clickedCell, clickedCellIndex);
        
    // level select
    if (gameActive && level == 1)
    {
        playEasy();
    } 
    else if (gameActive && level == 2)
    {
        playHard();
    } 
    }
 function handleCellPlayed(clickedCell, clickedCellIndex) {
       
            //fill game state with currnt player char
            gameState[clickedCellIndex] = currentPlayer;
            //change the color
            clickedCell.style.color = playerColor;
            //add current player sympol on the bord
            clickedCell.textContent = currentPlayer;
             //chek win or draw state

             let gameRes = checkResult(gameState);
             if (gameRes != null) {
               
                if (gameRes == 'tie') {
                    statusDisplay.innerHTML = "the game end in tie";
                    gameActive=false;                    
                return;
                } else if(gameRes == currentPlayer){
                    statusDisplay.innerHTML = `the winner is ${currentPlayer} !`;
                    gameActive=false;
                    drawLine();
                return;
                }
               
              }
              //change to next player
               cgangePlayer();
            
        }

     
    //chek win or draw state
     function checkResult(state) {

            for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = state[winCondition[0]];
            let b = state[winCondition[1]];
            let c = state[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                return a;
            }
            }

            let roundDraw = !gameState.includes("");
            if (roundDraw) {
                return "tie";
            }

            return null;
           
     }

        function cgangePlayer() {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            playerColor =playerColor === "blue" ? "red" : "blue";
            currentPlayerTurn();     
        }
       

        //apply change and play new game
        function applyChanges() 
        {
            gameActive = true;
            playerColor = "blue";
            gameState = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = selector[selector.selectedIndex].value;
            currentPlayerTurn();
            deleteLine();
            document.querySelectorAll('.cell')
                       .forEach(cell => cell.innerHTML = "");
            currentPlayerTurn();
            level = levelSelect.value;
            human=currentPlayer;
            AI = currentPlayer == "X" ? "O" : "X";
        }
        //get empity cell in the bord
        function availableMoves()
        {
            var availapleMove=[];
            var counter = 0;
            for (var i = 0; i < 9; i++)
                if (gameState[i] == "")
                  { 
                       availapleMove[counter] = i;
                    counter++;
                }
            return availapleMove;
        }


// play with easy level
function playEasy()
{

    let available= availableMoves();
    var move = available[Math.floor(Math.random()*available.length)];
    var cellAi = document.getElementById(move);
    handleCellPlayed(cellAi, move);

}

//undefeatable level
function playHard()
{
    //minimax AI algrothem
    let bestMove = -1000;
    let move;
    for (var i = 0; i < 9; i++)
    {
    if (gameState[i] == "")
      { 
        gameState[i]=AI;
        let score = miniMax(gameState ,0 ,false);
        gameState[i]="";
        if (bestMove < score)
        {
            bestMove = score;
            move =i;
        }
    }
        
    }
    if (move==null)
    return;
    var cellAi = document.getElementById(move);
    handleCellPlayed(cellAi, move);
}

function miniMax( state , depth , isMax)
{
    let result =checkResult(state);
    
    if (result != null)
    {

        if (result == AI)
            return 100-depth;
        else if (result == "tie")
            return  0;
        
        else
            return -100 + depth;
    }

    if (isMax) {
        let bestScore = -1000;
        for (var i = 0; i < 9; i++)
        {
            if (state[i] == "")
             { 
              state[i] = AI;
              let score = miniMax(state, depth + 1, false);
              state[i] = "";
              bestScore = Math.max(score, bestScore);
            }
         }
        
        return bestScore;
      } else {
        let bestScore = 1000;
        for (var i = 0; i < 9; i++)
        {
            if (state[i] == "")
            {
                state[i] = human;
                let score = miniMax(state, depth + 1, true);
                state[i] = "";
                bestScore = Math.min(score, bestScore);
            }
         }
        
        return bestScore;
      }
}