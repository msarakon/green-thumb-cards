import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pickCards } from '../reducers/deckReducer';
import { addCards } from '../reducers/playerReducer';
import { startSelectCard } from '../reducers/turnReducer';
import GameBoard from './GameBoard';
import Footer from './Footer';
import './App.css';

const App = (props) => {
    const [gameOn, setGameOn] = useState(false);
    const CARDS_AT_START = 5;

    const pickCards = (playerId, proposedCount) => {
        const count = proposedCount > props.deck.length ? props.deck.length : proposedCount;
        const picked = props.deck.slice(0, count);
        props.pickCards(count);
        props.addCards(playerId, picked);
    };

    const startTurn = (playerId) => {
        const player = props.players[playerId];
        console.log(`${player.name}'s turn starts!`);
        // todo: handle disaster cards before anything else
        props.startSelectCard();
    };

    const start = () => {
        setGameOn(true);
        pickCards('bunny1', CARDS_AT_START);
        pickCards('bunny2', CARDS_AT_START);
        pickCards('bunny3', CARDS_AT_START);
        pickCards('bunny4', CARDS_AT_START);
        startTurn('bunny1');
    };

    return (
        <div className="app">
            {
                !gameOn &&
                <div className="start-screen">
                    <div>Do you want to start a new game?</div>
                    <button className="start-button" onClick={start}>start</button>
                </div>
            }
            {
                gameOn &&
                <div className="gameboard-container">
                    <GameBoard />
                </div>
            }
            <div className="footer-container">
                <Footer />
            </div>
        </div>
    );
};

App.propTypes = {
    deck: PropTypes.array.isRequired,
    players: PropTypes.object.isRequired,
    pickCards: PropTypes.func.isRequired,
    addCards: PropTypes.func.isRequired,
    startSelectCard: PropTypes.func.isRequired,
    turn: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        deck: state.deck,
        players: state.players,
        turn: state.turn
    };
};
  
const mapDispatchToProps = {
    pickCards,
    addCards,
    startSelectCard
};

export default connect(mapStateToProps, mapDispatchToProps)(App);