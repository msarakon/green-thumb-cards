import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startGame } from '../reducers/turnReducer';
import GameBoard from './GameBoard';
import Footer from './Footer';
import './App.css';
import GameMaster from '../logic/GameMaster';

const App = (props) => {
    const [gameOn, setGameOn] = useState(false);

    const start = () => {
        setGameOn(true);
        props.startGame();
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
                    <GameBoard gameMaster={new GameMaster()}/>
                </div>
            }
            <div className="footer-container">
                <Footer />
            </div>
        </div>
    );
};

App.propTypes = {
    startGame: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    startGame
};

export default connect(null, mapDispatchToProps)(App);