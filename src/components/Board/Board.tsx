import React, { Component } from 'react';
import { Square } from '../Square/Square'
import './Board.scss'

interface SquareProps {
    squares:string[];
    onClick:(i:number)=>void;
    // xIsNext:boolean;
}

export default class Board extends Component<SquareProps> {
    constructor(props: SquareProps){
        super(props)
    }

    render() {
        const rows = []
        for (let index = 0; index < 9; index++) {
            rows.push(<Square onClick={()=>this.props.onClick(index)} key={index} value={this.props.squares[index]} />)
        }
        return (
            <div className="board">{rows}</div>
        )
    }
    // render(){

    // }
}