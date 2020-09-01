import React from 'react';
import Board from '../Board/Board';
import './Game.scss'

interface GameState {
    xIsNext: boolean;
    history:
    {
        squares: string[]
    }[],
    stepNumber: number;

}

function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (const line of lines) {
        const [a, b, c] = line
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

export class Game extends React.Component<any, GameState> {

    constructor(props: any) {
        super(props);
        this.state = {
            xIsNext: true,
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0
        }
    }
    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const squares = history[history.length - 1].squares.slice();
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{ squares }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    jumpTo(stepNumber: number) {
        // const history =this.state.history.slice(0,step+1)
        // const squares=history[step]

        this.setState({
            stepNumber,
            xIsNext: stepNumber % 2 === 0
        })
    }

    render() {
        const history = this.state.history;
        const squares = history[this.state.stepNumber].squares;
        let status;
        const winner = calculateWinner(squares)
        const moves = history.map((_, step) => {
            const desc = step ? ('Go to move #' + step) : 'Start Game'
            return <li key={step}><button  onClick={() => this.jumpTo(step)}>{desc}</button></li>
        })
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game-container">
                <Board
                    onClick={(i) => this.handleClick(i)}
                    squares={squares} />
                <div className="game-info">
                    <p>{status}</p>
                    <ul className="moves-list">{moves}</ul>
                </div>
            </div>
        )
    }
}