import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Hand = (props) => {
    return (
        <div>
            {
                props.hand.map(card => <div key={card.id}>{card.id}</div>)
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