import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { drawCards } from '../reducers/deckReducer';
import { addCards, addItem, removeCard, removeItem } from '../reducers/playerReducer';
import { startDrawCard, startSelectAction } from '../reducers/turnReducer';
import { throwToStreet } from '../reducers/streetReducer';
import Hand from './Hand';
import Neighborhood from './Neighborhood';
import { playTurn as playAITurn } from '../utils/AI';
import './GameBoard.css';


const GameBoard = (props) => {
    const CARDS_AT_START = 5;
    const [ pointerX, setPointerX ] = useState(null);
    const [ pointerY, setPointerY ] = useState(null);
    const [ gameStarted, setGameStarted ] = useState(false);

    const mouseMoveHandler = (evt) => {
        setPointerX(evt.clientX - 20);
        setPointerY(evt.clientY - 20);
    };

    /**
     * The game begins. Draw the starting hand for each player.
     * Start turn for player 1.
     */
    const startGame = () => {
        setGameStarted(true);
        drawCardsFor('bunny1', CARDS_AT_START, props.deck, (deck) => {
            drawCardsFor('bunny2', CARDS_AT_START, deck, (deck) => {
                drawCardsFor('bunny3', CARDS_AT_START, deck, (deck) => {
                    drawCardsFor('bunny4', CARDS_AT_START, deck, () => {
                        startTurn('bunny1');
                    });
                });
            });
        });
    };

    /**
     * Draw n cards for the given player.
     * @param {String} playerId 
     * @param {Number} proposedCount
     * @param {Array} deck
     * @param {Function} next
     */
    const drawCardsFor = (playerId, proposedCount, deck, next) => {
        const count = proposedCount > props.deck.length ? props.deck.length : proposedCount;
        console.log(`${props.players[playerId].name} draws ${count} card(s)`);
        const drawn = deck.slice(0, count);
        props.drawCards(count, ({ deck }) => {
            props.addCards(playerId, drawn, ({ players }) => {
                doDisasters(playerId, players[playerId].hand, deck, (deck) => {
                    next(deck);
                });
            });
        });
    };

    /**
     * Start turn for the given player.
     * @param {String} playerId 
     */
    const startTurn = (playerId) => {
        console.log(`${props.players[playerId].name}'s turn starts!`);
        if (playerId === 'bunny1') props.startDrawCard();
        else playAITurn({ ...props, playerId, endTurn });
    };

    /**
     * Handle disasters if present in a player's hand.
     * @param {String} playerId
     * @param {Array} cards
     * @param {Array} deck
     * @param {Function} next
     */
    const doDisasters = (playerId, cards, deck, next) => {
        const disasters = cards.filter(card => card.category === 'disaster');
        disasters.forEach(disaster => {
            console.log(`*** Disaster event: "${disaster.title}"`);
            Object.entries(props.players).forEach(([id, player]) => {
                const plants = player.garden.filter(card => card.category === 'plant');
                const item = plants[Math.floor(Math.random()*plants.length)];
                if (item) {
                    props.removeItem(id, item.id);
                    console.log(`${player.name} lost "${item.title}"`);
                    props.throwToStreet(item);
                }
            });
            props.removeCard(playerId, disaster.id);
        });
        if (disasters.length > 0) {
            drawCardsFor(playerId, disasters.length, deck, (deck) => next(deck));
        } else {
            next(deck);
        }
    };

    const placeItem = (evt) => {
        const containerBounds = evt.target.getBoundingClientRect();
        const x = evt.clientX - containerBounds.x - 20;
        const y = evt.clientY - containerBounds.y - 20;
        props.addItem('bunny1', {
            ...props.turn.card,
            top: Math.floor(y / containerBounds.height * 100),
            left: Math.floor(x / containerBounds.width * 100)
        });
        props.turn.callback();
        endTurn('bunny1');
    };

    /**
     * Start turn for the next player.
     * @param {String} playerId 
     */
    const endTurn = (playerId) => {
        const playerIds = Object.keys(props.players);
        const playerIdx = playerIds.indexOf(playerId);
        const nextPlayerIdx = playerIdx === playerIds.length - 1 ? 0 : playerIdx + 1;
        startTurn(playerIds[nextPlayerIdx]);
    };

    if (props.turn.mode === 'start_game' && !gameStarted) startGame();

    const insertOn = props.turn.mode === 'insert';
    const canPlaceItem = insertOn && props.pointer === 'insertable';

    return (
        <div className="gameboard"
            onMouseMove={mouseMoveHandler}
            onMouseDown={canPlaceItem ? placeItem : undefined}>
            <div className="hand-container">
                <Hand drawCard={() => drawCardsFor('bunny1', 1, props.deck, () => {})} />
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
    players: PropTypes.object.isRequired,
    pointer: PropTypes.string,
    addItem: PropTypes.func.isRequired,
    drawCards: PropTypes.func.isRequired,
    addCards: PropTypes.func.isRequired,
    startDrawCard: PropTypes.func.isRequired,
    startSelectAction: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    throwToStreet: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        deck: state.deck,
        players: state.players,
        turn: state.turn,
        pointer: state.pointer
    };
};

const mapDispatchToProps = {
    addItem,
    drawCards,
    addCards,
    startDrawCard,
    startSelectAction,
    removeCard,
    removeItem,
    throwToStreet
};

export { GameBoard };

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);