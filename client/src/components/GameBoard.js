import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../reducers/playerReducer';
import { endTurn } from '../reducers/turnReducer';
import Hand from './Hand';
import Neighborhood from './Neighborhood';
import './GameBoard.css';

const GameBoard = (props) => {
    const [ pointerX, setPointerX ] = useState(null);
    const [ pointerY, setPointerY ] = useState(null);

    const mouseMoveHandler = (evt) => {
        setPointerX(evt.clientX - 20);
        setPointerY(evt.clientY - 20);
    };

    const placeItem = () => {
        props.addItem('bunny1', props.turn.card);
        props.endTurn();
    };

    return (
        <div className="gameboard"
            onMouseMove={mouseMoveHandler}
            onMouseDown={props.pointer === 'insertable' ? placeItem : undefined}>
            <div className="hand-container">
                <Hand />
            </div>
            <div className="neighborhood-container">
                <Neighborhood />
            </div>
            {
                props.turn.mode === 'insert' &&
                <div className={'item-placer ' + props.pointer} style={{
                    left: pointerX,
                    top: pointerY
                }}></div>
            }
        </div>
    );
};

GameBoard.propTypes = {
    deck: PropTypes.array.isRequired,
    turn: PropTypes.object.isRequired,
    pointer: PropTypes.string,
    addItem: PropTypes.func.isRequired,
    endTurn: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        deck: state.deck,
        turn: state.turn,
        pointer: state.pointer
    };
};

const mapDispatchToProps = {
    addItem,
    endTurn
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);