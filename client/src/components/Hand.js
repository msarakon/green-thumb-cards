import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playCard, startSelectAction } from '../reducers/turnReducer';
import { removeCard } from '../reducers/playerReducer';
import Card from './Card';
import './Hand.css';

const Hand = (props) => {
    const playCard = (card) => {
        props.playCard(card, () => props.removeCard('bunny1', card.id));
    };

    const drawCard = () => {
        props.drawCard();
        props.startSelectAction();
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
            {
                props.hand.length < 6 &&
                <div className='card placeholder'></div>
            }
            <div
                className='deck'
                title={props.deckSize + ' cards remaining'}
                onClick={props.turn.mode === 'draw_card' ? drawCard : undefined}>
                <div className='card'><div className='card-bg'></div></div>
                <div className='card'><div className='card-bg'></div></div>
                <div className='card'><div className='card-bg'></div></div>
            </div>
        </div>
    );
};

Hand.propTypes = {
    deckSize: PropTypes.number.isRequired,
    turn: PropTypes.object.isRequired,
    hand: PropTypes.array.isRequired,
    playCard: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired,
    drawCard: PropTypes.func.isRequired,
    startSelectAction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        deckSize: state.deck.length,
        hand: state.players.bunny1.hand,
        turn: state.turn
    };
};

const mapDispatchToProps = {
    playCard,
    removeCard,
    startSelectAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Hand);