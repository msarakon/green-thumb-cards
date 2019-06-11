import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Hand from './Hand';
import Neighborhood from './Neighborhood';
import './GameBoard.css';

const GameBoard = (props) => {
    const [ pointerCoords, setPointerCoords ] = useState([null, null]);

    const mouseMoveHandler = (evt) => setPointerCoords([evt.clientX - 20, evt.clientY - 20]);

    if (props.turn.mode === 'start_game') props.gameMaster.startGame();

    return (
        <div className="gameboard"
            onMouseMove={mouseMoveHandler}
            onMouseDown={props.canPlaceItem ? (e) => props.gameMaster.placeItem(e) : undefined}>
            <div className="hand-container">
                <Hand drawCard={() => props.gameMaster.drawCardsFor('bunny1', 1, props.deck, () => {})} />
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
    insertOn: PropTypes.bool.isRequired,
    canPlaceItem: PropTypes.bool.isRequired,
    gameMaster: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        deck: state.deck,
        turn: state.turn,
        pointer: state.pointer,
        insertOn: state.turn.mode === 'insert',
        canPlaceItem: state.turn.mode === 'insert' && state.pointer === 'insertable'
    };
};

export { GameBoard };

export default connect(mapStateToProps)(GameBoard);