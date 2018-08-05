
import React, { Component } from 'react';
import './Gameboard.css';

const specs = {
  boardWidth: 500,
  boardHeight: 500,
  ballRadius: 10,
  paddleHeight: 20,
  paddleWidth: 80,
  rightPressed: false,
  leftPressed: false,
  ballColor: "rgba(100, 14, 221, 1)",
  x_pos: this.boardWidth / 2,
  y_pos: this.boardHeight - 30,
  draw_x: 2,
  draw_y: -2,
  playGame: true,
  brickRowCoun:5,
  brickColumnCoun:6,
  brickWidt:65,
  brickHeigh:20,
  brickPaddin:10,
  brickOffsetTo:30,
  brickOffsetLef:30,
  score: 0,
  lives: 3
}


class Gameboard extends Component {
  state = {
    x_pos: specs.boardWidth / 2,
    y_pos: specs.boardHeight - 30,
    lives: 3,
    score: 0,
  }


   componentDidMount() {
      this.drawGameBoard();
    }

    drawPaddle(ctx) {
        ctx.beginPath();
        ctx.rect((specs.boardWidth - specs.paddleWidth) / 2, specs.boardHeight - specs.paddleHeight, specs.paddleWidth, specs.paddleHeight);
        ctx.fillStyle = "#7BAD17";
        ctx.fill();
        ctx.closePath();
    }


    drawBall(ctx) {
        ctx.beginPath();
        ctx.arc(250, 470, specs.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100, 14, 221, 1)";
        ctx.fill();
        ctx.closePath();
    }

    drawGameBoard() {
        const ctx = this.refs.canvas.getContext('2d');
        this.drawBall(ctx);
        this.drawPaddle(ctx);
    }



    render() {
        return (
            <canvas ref="canvas" width={specs.boardWidth} height={specs.boardHeight}/>
        );
    }
}

export default Gameboard;
