import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playCard,  } from '../reducers/turnReducer';
import { removeCard } from '../reducers/playerReducer';
import Card from './Card';
import Deck from './Deck';
import './Hand.css';

const Hand = (props) => {
    const playCard = (card) => {
        console.log(`You play "${card.title}"`);
        props.gameMaster.playCard('bunny1', card);
    };

    const drawCard = () => props.gameMaster.drawCardsFor('bunny1', 1, props.deck, () => {});

    return (
        <div className='hand'>
            {props.hand.map(card =>
                <Card key={card.id} card={card} canPlay={!props.canDraw} play={() => playCard(card)}/>
            )}
            {props.hand.length < 6 &&
                <div className='card placeholder'>
                    {props.deck.length > 0 && <div>Draw a card</div>}
                </div>
            }
            <Deck size={props.deck.length} drawCard={drawCard} canDraw={props.canDraw} />
        </div>
    );
};

Hand.propTypes = {
    gameMaster: PropTypes.object.isRequired,
    deck: PropTypes.array.isRequired,
    turn: PropTypes.object.isRequired,
    hand: PropTypes.array.isRequired,
    playCard: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired,
    canDraw: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        deck: state.deck,
        hand: state.players.bunny1.hand,
        turn: state.turn,
        canDraw: state.players.bunny1.hand.length < 6 && state.deck.length > 0
    };
};

const mapDispatchToProps = {
    playCard,
    removeCard,
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Hand);