import React from 'react'
import even_permutation from './even_permutation';
import './App.css';


class Square extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let img_location = `wolfsoul_cropped_${Math.floor(this.props.index / 3)}_${this.props.index % 3}.jpg`;
    return (
      <img className="puzzle_img" src={img_location} onClick={() => this.props.onClick(this.props.index)}/>
    );
  }
}

class Row extends React.Component {
  renderSquare(i) {
    return (
      <Square index={i}
              onClick={this.props.onClick}/>
    );
  }
  render() {
    return (
      <div className="board-row">
        {this.renderSquare(this.props.indexs[0])}
        {this.renderSquare(this.props.indexs[1])}
        {this.renderSquare(this.props.indexs[2])}
      </div>
    )
    
  }
}

class Board extends React.Component {
  renderRow(i) {
    return <Row indexs={i} onClick={this.props.onClick}/>;
  }

  render() {
    
    return (
      <div>
        {this.renderRow(this.props.permutation.slice( 0,  3))}
        {this.renderRow(this.props.permutation.slice( 3,  6))}
        {this.renderRow(this.props.permutation.slice( 6,  9))}
        {this.renderRow(this.props.permutation.slice( 9, 12))}
        {this.renderRow(this.props.permutation.slice(12, 15))}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permutation: even_permutation(5 * 3, 3 * 3 + 1)
    };
  }

  isValid(i, j) {
    const ih = Math.floor(i / 3);
    const jh = Math.floor(j / 3);
    const iw = i % 3;
    const jw = j % 3;
    return Math.abs(ih - jh) + Math.abs(iw - jw) == 1;
  }

  handleClick(i) {
    let permutation = this.state.permutation.slice();
    const toSwap = permutation.indexOf(i);
    const unoccupied = permutation.indexOf(3 * 3 + 1);
    if (this.isValid(toSwap, unoccupied)) {
      permutation[toSwap] = 3 * 3 + 1;
      permutation[unoccupied] = i;
      this.setState({
        permutation: permutation
      });
    }
    let arraysEqual = (a, b) => {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length !== b.length) return false;
      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    };
    if (arraysEqual(permutation, [...Array(5 * 3).keys()])) {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ','rickroll').focus();
    }
  }

  render() {
    return (
      <div className="game">
        <div className='game-restart'>
          <button onClick={()=>this.setState({permutation: even_permutation(5 * 3, 3 * 3 + 1)})}>
            Restart
          </button>
        </div>
        <div className="status">Make Your Own Birthday Gift!</div>
        <div className="game-board">
          <Board permutation={this.state.permutation} onClick={i => this.handleClick(i)}/>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game />
      </header>
    </div>
  );
}

export default App;
