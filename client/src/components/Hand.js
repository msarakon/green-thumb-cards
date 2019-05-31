import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playCard } from '../reducers/turnReducer';
import Card from './Card';
import './Hand.css';

const Hand = (props) => {
    return (
        <div className={'hand' + (props.turn.mode === 'select_card' ? ' active' : '')}>
            {
                props.hand.map(card =>
                    <Card key={card.id} card={card} play={() => props.playCard(card)}/>
                )
            }
        </div>
    );
};

Hand.propTypes = {
    deckCount: PropTypes.number.isRequired,
    hand: PropTypes.array.isRequired,
    playCard: PropTypes.func.isRequired,
    turn: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        deckCount: state.deck.length,
        hand: state.players.bunny1.hand,
        turn: state.turn
    };
};

const mapDispatchToProps = { playCard };

export default connect(mapStateToProps, mapDispatchToProps)(Hand);