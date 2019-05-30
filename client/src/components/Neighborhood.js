import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Garden from './Garden';
import './Neighborhood.css';

const Neighborhood = (props) => {
    return (
        <div className="neighborhood">
            <div className="garden-container">
                <Garden player={props.players.bunny1} />
            </div>
            <div className="garden-container">
                <Garden player={props.players.bunny2} />
            </div>
            <div className="garden-container">
                <Garden player={props.players.bunny3} />
            </div>
            <div className="garden-container">
                <Garden player={props.players.bunny4} />
            </div>
        </div>
    );
};

Neighborhood.propTypes = {
    players: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        players: state.players
    };
};

export default connect(mapStateToProps)(Neighborhood);