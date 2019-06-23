import React from 'react';
import { connect } from 'react-redux';
import { Card as CardType } from '../types/card';
import { AppState } from '../store';
import { TurnState } from '../types/turn';
import './Card.css';

const imagePath = (name: string) => {
    try {
        return require('../assets/cards/' + name + '.png');
    } catch (ex) {
        return require('../assets/cards/placeholder.png');
    }
};

const Card = (props: CardProps) => {
    const selectableCategories = ['plant', 'environment', 'attack', 'special'];
    const selectable = props.canPlay && selectableCategories.includes(props.card.category);
    const active = props.turn.card && props.turn.card.id === props.card.id;

    return (
        <div className={
            'card ' +
            props.card.category +
            (selectable ? ' selectable' : '') +
            (active ? ' active' : '')
        }
        onClick={selectable ? () => props.play() : undefined}
        title={props.card.title}>
            <div className='card-bg' style={{ backgroundImage: `url(${imagePath(props.card.name)})` }}>
                { props.card.title }
            </div>
        </div>
    );
};

interface CardProps {
    card: CardType,
    canPlay: boolean,
    play: Function,
    turn: TurnState
}

const mapStateToProps = (state: AppState) => {
    return {
        turn: state.turn
    };
};

export default connect(mapStateToProps)(Card);