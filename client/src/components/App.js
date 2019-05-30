import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { shuffleDeck } from '../reducers/deckReducer';
import GameBoard from './GameBoard';
import Footer from './Footer';
import './App.css';

const App = (props) => {
    const shuffleDeck = props.shuffleDeck;

    useEffect(() => { shuffleDeck(); }, [shuffleDeck]);

    return (
        <div className="app">
            <div className="gameboard-container">
                <GameBoard />
            </div>
            <div className="footer-container">
                <Footer />
            </div>
        </div>
    );
};

App.propTypes = {
    shuffleDeck: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        deck: state.deck
    };
};
  
const mapDispatchToProps = {
    shuffleDeck
};

export default connect(mapStateToProps, mapDispatchToProps)(App);