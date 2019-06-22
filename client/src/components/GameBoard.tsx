import React, { useState } from 'react';
import { connect } from 'react-redux';
import Hand from './Hand';
import Neighborhood from './Neighborhood';
import { AppState } from '../store';
import './GameBoard.css';

const GameBoard = (props: GameBoardProps) => {
    const [ pointerCoords, setPointerCoords ] = useState([null, null]);
    const mouseMoveHandler = (e: React.MouseEvent<HTMLElement>) => setPointerCoords([e.clientX - 20, e.clientY - 20]);

    return (
        <div className="gameboard" onMouseMove={(e) => mouseMoveHandler(e)}>
            <div className="hand-container">
                <Hand />
            </div>
            <div className="neighborhood-container">
                <Neighborhood />
            </div>
            {
                props.insertOn &&
                <div className={'item-placer ' + props.pointer} style={{
                    left: pointerCoords[0],
                    top: pointerCoords[1]
                }}></div>
            }
        </div>
    );
};

interface GameBoardProps {
    insertOn: boolean;
    pointer: string;
}

const mapStateToProps = (state: AppState) => {
    return {
        deck: state.deck,
        turn: state.turn,
        pointer: state.pointer,
        insertOn: state.turn.mode === 'insert'
    };
};

export default connect(mapStateToProps)(GameBoard);