import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Hand from './Hand';
import Neighborhood from './Neighborhood';
import './GameBoard.css';

const GameBoard = (props) => {
    const [ pointerCoords, setPointerCoords ] = useState([null, null]);
    const mouseMoveHandler = (evt) => setPointerCoords([evt.clientX - 20, evt.clientY - 20]);

    return (
        <div className="gameboard" onMouseMove={mouseMoveHandler}>
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

GameBoard.propTypes = {
    deck: PropTypes.array.isRequired,
    turn: PropTypes.object.isRequired,
    pointer: PropTypes.string,
    insertOn: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        deck: state.deck,
        turn: state.turn,
        pointer: state.pointer,
        insertOn: state.turn.mode === 'insert'
    };
};

export default connect(mapStateToProps)(GameBoard);