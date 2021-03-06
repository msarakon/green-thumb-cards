import React, { useState } from 'react';
import { connect } from 'react-redux';
import { startGame } from '../middlewares/masterMiddleware';
import GameBoard from './GameBoard';
import Footer from './Footer';
import './App.css';

const App = (props: AppProps) => {
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
                    <GameBoard />
                </div>
            }
            <div className="footer-container">
                <Footer />
            </div>
        </div>
    );
};

interface AppProps {
    startGame: Function;
}

const mapDispatchToProps = {
    startGame
};

export default connect(null, mapDispatchToProps)(App);