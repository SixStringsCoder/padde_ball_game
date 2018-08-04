
import React, { Component } from 'react';
import './Gameboard.css';

const width = 800;
const height = window.innerHeight;
const ratio = window.devicePixelRatio || 1;

class Gameboard extends Component {
  constructor(props) {
    super(props);
      this.state = {
          screen: {
              width: width,
              height: height,
              ratio: ratio
          }
      }
  }



  render() {
    return (
      <div id="Gameboard">
        <canvas ref="canvas"
             width={ this.state.screen.width * this.state.screen.ratio }
                height={ this.state.screen.height * this.state.screen.ratio } />
      </div>
    );
  }
}

export default Gameboard;
