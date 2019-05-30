import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from './Card';
import './Hand.css';

const Hand = (props) => {
    return (
        <div className="hand">
            {
                props.hand.map(card => <Card key={card.id} card={card} />)
            }
        </div>
    );
};

Hand.propTypes = {
    deckCount: PropTypes.number.isRequired,
    hand: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        deckCount: state.deck.length,
        hand: state.players.bunny1.hand
    };
};

export default connect(mapStateToProps)(Hand);