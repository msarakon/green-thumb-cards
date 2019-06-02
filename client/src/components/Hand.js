import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playCard } from '../reducers/turnReducer';
import { removeCard } from '../reducers/playerReducer';
import Card from './Card';
import './Hand.css';

const Hand = (props) => {
    const playCard = (card) => {
        props.playCard(card, () => props.removeCard('bunny1', card.id));
    };

    return (
        <div className='hand'>
            {
                props.hand.map(card =>
                    <Card key={card.id}
                        card={card}
                        play={() => playCard(card)}/>
                )
            }
            { props.deckSize }
        </div>
    );
};

Hand.propTypes = {
    deckSize: PropTypes.number.isRequired,
    hand: PropTypes.array.isRequired,
    playCard: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        deckSize: state.deck.length,
        hand: state.players.bunny1.hand
    };
};

const mapDispatchToProps = { playCard, removeCard };

export default connect(mapStateToProps, mapDispatchToProps)(Hand);