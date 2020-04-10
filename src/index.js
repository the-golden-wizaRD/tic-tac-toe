import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      darkFlag : true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'x' : 'o';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  playClick() {
    const squares = this.state.squares.slice();
    document.getElementById('playAgainButton').style.display = 'none';
    squares.fill(null);
    this.setState({
      squares: squares,
      xIsNext: true,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  modeDarkLight() {
    if(this.state.darkFlag === false){
      this.setState({
        darkFlag : true,
      });
      document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.850)';
      document.getElementsByClassName('the-board')[0].style.backgroundColor = '';
      document.getElementsByClassName('the-board')[0].style.boxShadow = '0vw 0.55vw 1vw 0.15vw rgb(0, 0, 0)';
      document.getElementsByClassName('status')[0].style.backgroundColor = 'aquamarine';
      document.getElementsByClassName('status')[0].style.boxShadow = '0vw 0.55vw 1vw 0.15vw rgb(0, 0, 0)';
      document.getElementsByClassName('board-row')[0].style.backgroundColor = 'aquamarine';
      document.getElementsByClassName('board-row')[1].style.backgroundColor = 'aquamarine';
      document.getElementsByClassName('board-row')[2].style.backgroundColor = 'aquamarine';
      document.getElementById('darkLightMode').style.backgroundImage = 'linear-gradient(to right, white, black)';
      document.getElementsByClassName('playAgain')[0].style.backgroundColor = 'aquamarine';
      document.getElementsByClassName('playAgain')[0].style.boxShadow = '0vw 0.55vw 1vw 0.15vw rgb(0, 0, 0)';
    }
    if(this.state.darkFlag === true){
      this.setState({
        darkFlag : false,
      });
      document.body.style.backgroundColor = 'antiquewhite';
      document.getElementsByClassName('the-board')[0].style.backgroundColor = 'grey';
      document.getElementsByClassName('the-board')[0].style.boxShadow = '0vw 0.55vw 1vw 0.15vw rgb(173, 173, 173)';
      document.getElementsByClassName('status')[0].style.backgroundColor = 'rgba(222, 184, 135, 0.856)';
      document.getElementsByClassName('status')[0].style.boxShadow = '0vw 0.55vw 1vw 0.15vw rgb(173, 173, 173)';
      document.getElementsByClassName('board-row')[0].style.backgroundColor = 'wheat';
      document.getElementsByClassName('board-row')[1].style.backgroundColor = 'wheat';
      document.getElementsByClassName('board-row')[2].style.backgroundColor = 'wheat';
      document.getElementById('darkLightMode').style.backgroundImage = 'linear-gradient(to right, black, white)';
      document.getElementsByClassName('playAgain')[0].style.backgroundColor = 'rgba(222, 184, 135, 0.856)';
      document.getElementsByClassName('playAgain')[0].style.boxShadow = '0vw 0.55vw 1vw 0.15vw rgb(173, 173, 173)';
    } 
  }

  render() {
    const squares = this.state.squares.slice();
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
      document.getElementById('playAgainButton').style.display = 'flex';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    if(squares[0] && squares[1] && squares[2] && squares[3] && squares[4] && squares[5] && squares[6] && squares[7] && squares[8] && !winner){
      document.getElementById('playAgainButton').style.display = 'flex';
      status = 'No Winner';
    }

    return (
      <div>
        <div className="status">
          {status}
          <span className="tooltiptext">
            <button id="darkLightMode"
              onClick = {() => this.modeDarkLight()}>
                Dark | Light
            </button>
          </span>
        </div>
        <div className="the-board">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div id="board-row" className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        <button
          className="playAgain" id="playAgainButton"
          onClick={() => this.playClick()}
        >
          play again
        </button>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
