import React from 'react'
import even_permutation from './even_permutation';
import './App.css';


class Square extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let img_location = `wolfsoul_cropped_${Math.floor(this.props.index / 5)}_${this.props.index % 5}.jpg`;
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
        {this.renderSquare(this.props.indexs[3])}
        {this.renderSquare(this.props.indexs[4])}
      </div>
    )
    
  }
}

class Board extends React.Component {
  renderRow(i) {
    return <Row indexs={i} onClick={this.props.onClick}/>;
  }

  render() {
    const status = "Make Your Own Birthday Gift!";
    return (
      <div>
        <div className="status">{status}</div>
          {this.renderRow(this.props.permutation.slice( 0,  5))}
          {this.renderRow(this.props.permutation.slice( 5, 10))}
          {this.renderRow(this.props.permutation.slice(10, 15))}
          {this.renderRow(this.props.permutation.slice(15, 20))}
          {this.renderRow(this.props.permutation.slice(20, 25))}
          {this.renderRow(this.props.permutation.slice(25, 30))}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    let permutation = even_permutation(6 * 5);
    this.state = {
      permutation: permutation
    };
  }

  isValid(i, j) {
    const ih = Math.floor(i / 5);
    const jh = Math.floor(j / 5);
    const iw = i % 5;
    const jw = j % 5;
    return Math.abs(ih - jh) + Math.abs(iw - jw) == 1;
  }

  handleClick(i) {
    let permutation = this.state.permutation.slice();
    const toSwap = permutation.indexOf(i);
    const unoccupied = permutation.indexOf(4 * 5 + 2);
    if (this.isValid(toSwap, unoccupied)) {

      console.log(permutation);
      permutation[toSwap] = 4 * 5 + 2;
      permutation[unoccupied] = i;
      this.setState({
        permutation: permutation
      });
      console.log(this.state);
    }
  }

  render() {
    return (
      <div className="game">
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
