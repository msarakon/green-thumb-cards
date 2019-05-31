import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setInsertable } from '../reducers/pointerReducer';
import Garden from './Garden';
import './Neighborhood.css';

const Neighborhood = (props) => {
    return (
        <div className="neighborhood">
            <div className="garden-container"
                onMouseEnter={() => props.setInsertable(true) }
                onMouseLeave={() => props.setInsertable(false) }>
                <Garden player={props.players.bunny1} />
            </div>
            <div className="street vertical"></div>
            <div className="garden-container">
                <Garden player={props.players.bunny2} />
            </div>
            <div className="street horizontal"></div>
            <div className="garden-container">
                <Garden player={props.players.bunny3} />
            </div>
            <div className="street vertical"></div>
            <div className="garden-container">
                <Garden player={props.players.bunny4} />
            </div>
        </div>
    );
};

Neighborhood.propTypes = {
    players: PropTypes.object.isRequired,
    turn: PropTypes.object.isRequired,
    setInsertable: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        players: state.players,
        turn: state.turn
    };
};

const mapDispatchToProps = {
    setInsertable
};

export default connect(mapStateToProps, mapDispatchToProps)(Neighborhood);