const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let's create a function to initialize the game
function initGame() 
{
    currentPlayer="X";
    gameGrid= ["","","","","","","","",""];

    // need to empty the boxes on UI as well
    boxes.forEach((box,index)=> {
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        // initialize box with css properties again 
        box.classList = `box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn()
{
    if(currentPlayer=== "X")
    {
        currentPlayer= "O";
    }
    else
    {
        currentPlayer="X";
    }

    // update in UI
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}


function checkGameOver()
{
    let answer= "";
    winningPositions.forEach((position) => {

        // all 3 boxes should be non-empty and should be exactly the same in value
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]] ) && (gameGrid[position[1]]===gameGrid[position[2]]))
        {
            // check whether the winner is X or O
            if(gameGrid[position[0]]==="X")
            {
                answer="X";
            }
            else
            {
                answer="O";
            }

            // disable pointer events because winner has been found
            boxes.forEach((box) => {
                box.style.pointerEvents="none";
            })

            // now we know X or O is the winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have a winner
    if(answer !=="")
    {
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // when there is a Tie 
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !=="")
        {
            fillCount++;
        }
    });


    // if board is full, fillCount value will  be 9 i.e, game tied
    if(fillCount===9)
    {
        gameInfo.innerText= "Game Tied!";
        newGameBtn.classList.add("active");
    }
}


function handleClick(index)
{
    if(gameGrid[index]==="")
    {
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapTurn();

        // check if we have a winner
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
        handleClick(index);
    })
})

newGameBtn.addEventListener("click",initGame);