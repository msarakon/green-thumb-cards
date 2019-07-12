import React from 'react';
import { connect } from 'react-redux';
import { removeCard } from '../reducers/playerReducer';
import { drawCards, playCard } from '../middlewares/masterMiddleware';
import Card from './Card';
import Deck from './Deck';
import { Card as CardType } from '../types/card';
import { AppState } from '../store';
import './Hand.css';

const Hand = (props: HandProps) => {
    const playCard = (card: CardType) => {
        console.log(`You play "${card.title}"`);
        props.playCard('bunny1', card);
    };

    const drawCard = () => props.drawCards('bunny1', 1);

    return (
        <div className='hand'>
            {props.hand.map(card =>
                <Card key={card.id} card={card} canPlay={!props.canDraw} play={() => playCard(card)}/>
            )}
            {props.hand.length < 6 &&
                <div className='card placeholder'>
                    {props.canDraw && <div>Draw a card</div>}
                </div>
            }
            <Deck size={props.deck.length} drawCard={drawCard} canDraw={props.canDraw} />
        </div>
    );
};

interface HandProps {
    playCard: Function;
    drawCards: Function;
    hand: CardType[];
    canDraw: Function;
    deck: CardType[]
}

const mapStateToProps = (state: AppState) => {
    return {
        deck: state.deck,
        hand: state.players.bunny1.hand,
        turn: state.turn,
        canDraw: state.players.bunny1.hand.length < 6
            && state.deck.length > 0
            && state.turn.mode === 'select_action'
    };
};

const mapDispatchToProps = {
    playCard,
    removeCard,
    drawCards
};

export default connect(mapStateToProps, mapDispatchToProps)(Hand);