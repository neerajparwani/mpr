let inputDirection = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 13;
let score = 0;
let lastPaintTime = 0;
let snakeBody = [
    {x: 13, y: 15}
];
let poison = {x: 12, y :3};
let food = {x: 6, y: 7};

var playerName = prompt("Welcome to Snake Game, please enter your name : ");
//alert("Press arrow keys to move the snake.\n");

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeBody.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 21 || snake[0].x <=0 || snake[0].y >= 21 || snake[0].y <=0){
        return true;
    }
    //if you poison

    if(snakeBody[0].y === poison.y && snakeBody[0].x === poison.x){
        return true;
       
    }
        
    return false;
}

if (playerName!= null) {
    localStorage.setItem("playerName", JSON.stringify(playerName));
   nameBox.innerHTML = "Name :" + playerName;
}

function gameEngine(){
    // Part 1: Updating the snake body & Food
    if(isCollide(snakeBody)){
        gameOverSound.play();
        musicSound.pause();
        inputDirection =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeBody = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
   if(snakeBody[0].y === food.y && snakeBody[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeBody.unshift({x: snakeBody[0].x + inputDirection.x , y: snakeBody[0].y + inputDirection.y });
        let a = 2;
        let b = 20;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    } 
    // Moving the snake
    for (let i = snakeBody.length - 2; i>=0; i--) { 
        snakeBody[i+1] = {...snakeBody[i]};
    }

   snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;

    // Part 2: Display the snake and Food
    // Display the snake
   board.innerHTML = "";
    snakeBody.forEach((e, index)=>{
       snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

    //display the poison

    poisonElement = document.createElement('div');
    poisonElement.style.gridRowStart = poison.y;
    poisonElement.style.gridColumnStart = poison.x;
    poisonElement.classList.add('poison')
    board.appendChild(poisonElement);


}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDirection = {x: 0, y: 0} 
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
        default:
            break;
    }
});

    /* */


    window.addEventListener("load", function(){
        setTimeout(
            function open(event){
                document.querySelector(".popup").style.display = "block";
            },
            500
        )
    });

    document.querySelector("#close").addEventListener("click", function(){
            document.querySelector(".popup").style.display = "none";
    

});