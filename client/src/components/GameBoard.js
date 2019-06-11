import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Hand from './Hand';
import Neighborhood from './Neighborhood';
import './GameBoard.css';

const GameBoard = (props) => {
    const [ pointerX, setPointerX ] = useState(null);
    const [ pointerY, setPointerY ] = useState(null);
    const [ gameStarted, setGameStarted ] = useState(false);

    const mouseMoveHandler = (evt) => {
        setPointerX(evt.clientX - 20);
        setPointerY(evt.clientY - 20);
    };

    if (props.turn.mode === 'start_game' && !gameStarted) {
        setGameStarted(true);
        props.gameMaster.startGame();
    }

    const insertOn = props.turn.mode === 'insert';
    const canPlaceItem = insertOn && props.pointer === 'insertable';

    return (
        <div className="gameboard"
            onMouseMove={mouseMoveHandler}
            onMouseDown={canPlaceItem ? (e) => props.gameMaster.placeItem(e) : undefined}>
            <div className="hand-container">
                <Hand drawCard={() => props.gameMaster.drawCardsFor('bunny1', 1, props.deck, () => {})} />
            </div>
            <div className="neighborhood-container">
                <Neighborhood />
            </div>
            {
                insertOn &&
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
    gameMaster: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        deck: state.deck,
        turn: state.turn,
        pointer: state.pointer
    };
};

export { GameBoard };

export default connect(mapStateToProps)(GameBoard);