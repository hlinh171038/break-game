let grid = document.querySelector('#grid');
let scoreDisplay = document.querySelector('#score');
//variable
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const userStart = [230, 10];
const currentUserPosition = userStart;
const ballStart = [200, 40]
let ballCurrentPosition = ballStart;
let timeId;
let ballDiameter = 25;
let xDirection = 2;
let yDirection = 2;

//class for block
class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
        this.topLeft = [xAxis, yAxis + blockHeight]
    }
}
let blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];
console.log(blocks);
//create block
function createBlock(){
    for(let i=0;i<blocks.length;i++){
        let block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0]+ 'px';
        block.style.bottom = blocks[i].bottomLeft[1]+ 'px';
        grid.appendChild(block);   
    }
}
createBlock()

// create user block
let user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
userPosition();
//
function userPosition(){
    user.style.left = currentUserPosition[0] + 'px';
    user.style.bottom = currentUserPosition[1] + 'px';
}

// move the user block
 function moveUserBlock(e){
    switch(e.key){
        case 'ArrowLeft' :
            if(currentUserPosition[0]>0){
                currentUserPosition[0] -=10;
                userPosition();
                break;
            }
        case 'ArrowRight' :
            if(currentUserPosition[0]<(boardWidth-blockWidth)){
                currentUserPosition[0] +=10;
                userPosition();
                break;
            }
    }
   
 }
 
 document.addEventListener('keydown',moveUserBlock) 
 //ball position

 function ballPosition(){
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
 }
//create the ball
let ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
ballPosition();
//move ball position
function moveBall(){
    ballCurrentPosition[0] +=xDirection;
    ballCurrentPosition[1] +=yDirection;
    ballPosition();
    checkCollision();
}

timeId = setInterval(moveBall,30);

// check collision
function checkCollision(){
    if(
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) 
        || ballCurrentPosition[0]<=0 ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter)
    ){
        changeDirection();
        console.log('gdgfd');
    }
    if(ballCurrentPosition[1]<=0){
        clearInterval(timeId);
        scoreDisplay.innerHTML = '<h2 id="g-over">Game over</h2>';
        document.removeEventListener('keydown',moveUserBlock)
    }
}

//change direction
function changeDirection(){
    if(xDirection == 2 && yDirection ==2){
        yDirection = -2;
        return;
    }
    if(xDirection == 2 && yDirection ==-2){
        xDirection = -2;
        return;
    }
    if(xDirection == -2 && yDirection == -2){
        yDirection = 2;
        return;
    }
    if(xDirection == -2 && yDirection == 2){
        xDirection = 2;
        return;
    }
}




