import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Hand from './Hand';
import Neighborhood from './Neighborhood';
import './GameBoard.css';

const GameBoard = () => {
    return (
        <div className="gameboard">
            <div className="hand-container">
                <Hand />
            </div>
            <div className="neighborhood-container">
                <Neighborhood />
            </div>
        </div>
    );
};

GameBoard.propTypes = {
    deck: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        deck: state.deck
    };
};

export default connect(mapStateToProps)(GameBoard);