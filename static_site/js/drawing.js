/**
 * Created by mbp on 7/21/18.
 */
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const ballRadius = 10;
const paddleHeight = 20;
const paddleWidth = 80;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let ballColor = "rgba(100, 14, 221, 1)";
let x_pos = canvas.width / 2;
let y_pos = canvas.height - 30;
let draw_x = 2;
let draw_y = -2;
var playGame;
let brickRowCount=5;
let brickColumnCount=6;
let brickWidth=65;
let brickHeight=20;
let brickPadding=10;
let brickOffsetTop=30;
let brickOffsetLeft=30;
let score = 0;
let lives = 3;

const bricks = [];
for(let c = 0; c < brickColumnCount; c += 1) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r += 1) {
        bricks[c][r] = { x_pos: 0, y_pos: 0, visible: true };
    }
    // console.log(bricks);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


const paddleAudio = new Audio("audio/paddleHit.mp3");
const brickAudio = new Audio("audio/brickHit.mp3");
const floorAudio = new Audio("audio/FloorHit.mp3")

const hitPaddleSound = () => paddleAudio.play();
const hitBrickSound = () => brickAudio.play();
const hitFloorAudio = () => floorAudio.play();

function startGame() {
    "use strict";
    document.location.reload();
}

function keyDownHandler(event) {
    "use strict";
    if (event.keyCode === 39) {
        rightPressed = true;
    } else if (event.keyCode === 37) {
       leftPressed = true;
    }
}

function drawInfoPanel() {
    "use strict";
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, 8, 20);
    ctx.fillText(`Lives: ${lives}`, canvas.width - 75, 20);
}

function drawWinningMsg() {
    "use strict";
    ctx.font = "70px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("YOU WON!", canvas.width / 7, canvas.height / 2);
    clearInterval(winner);
    setTimeout(startGame, 3000);
}

function lostGame() {
    "use strict";
    ctx.font = "70px Arial";
    ctx.fillStyle = "purple";
    ctx.fillText("Game Over!", canvas.width /7, canvas.height /2);
    clearInterval(playGame);
    setTimeout(startGame, 3000);
}

function scoreKeeper(result) {
    "use strict";
    if (result) {
        score += 10;
    } else {
        score -= 10;
        // document.location.reload();
    }
}

function resetBallPaddle() {
    "use strict";
    x_pos = canvas.width/2;
    y_pos = canvas.height-30;
    draw_x = 2;
    draw_y = -2;
    paddleX = (canvas.width-paddleWidth)/2;
}

function keyUpHandler(event) {
    "use strict";
    if (event.keyCode === 39) {
        rightPressed = false;
    } else if (event.keyCode === 37) {
       leftPressed = false;
    }
}

function collisionDetection() {
    "use strict";
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.visible) {
                if (x_pos > b.x_pos && x_pos < b.x_pos + brickWidth && y_pos > b.y_pos && y_pos < b.y_pos + brickHeight) {
                    draw_y = -draw_y;
                    hitBrickSound();
                    changeColors();
                    b.visible = false;
                    scoreKeeper(true);
                    if (score === 300) {
                      let winner = setInterval(drawWinningMsg, 10);
                    }
                }
            }
        }
    }
}

function changeColors() {
    "use strict";
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    ballColor = `rgba(${red}, ${green}, ${blue}, 1)`;
}

function drawPaddle() {
    "use strict";
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#7BAD17";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    "use strict";
    ctx.beginPath();
    ctx.arc(x_pos, y_pos, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    "use strict";
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if (bricks[c][r].visible) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x_pos = brickX;
                bricks[c][r].y_pos = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#F7401C";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawGameBoard() {
    "use strict";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawInfoPanel();
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    // side walls bounce
    if (x_pos + draw_x > (canvas.width - ballRadius) || x_pos + draw_x < ballRadius) {
        draw_x = -draw_x;
        changeColors();
    }
    // Ceiling bounce
    if (y_pos + draw_y < ballRadius) {
        draw_y = -draw_y;
        changeColors();
    // Hit the paddle
    } else if (y_pos + draw_y > (canvas.height - paddleHeight)) {
        if ((x_pos+ballRadius) > paddleX && (x_pos-ballRadius) < paddleX + paddleWidth) {
          hitPaddleSound();
          draw_y = -draw_y;
          //setInterval(drawGameBoard, 100); // Moves ball faster with each paddle hit
        } else { // Hits the floor
            lives -= 1;
            hitFloorAudio();
              if (!lives) {
                lostGame();
              } else {
                resetBallPaddle();
              }
          }
      }


    // Move Paddles and keeps them on screen
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
    }

    x_pos += draw_x;
    y_pos += draw_y;
    requestAnimationFrame(playGame);
}

playGame = setInterval(drawGameBoard, 15);
