import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';

const Deck = (props: DeckProps) => {
    if (props.size > 0) {
        return (
            <div
                className='deck'
                title={props.size + ' cards remaining'}
                onClick={props.canDraw ? () => props.drawCard() : undefined}>
                <div className='card'><div className='card-bg'></div></div>
                <div className='card'><div className='card-bg'></div></div>
                <div className='card'><div className='card-bg'></div></div>
            </div>
        );
    } else {
        return (<div className='deck empty'><div>No cards left!</div></div>);
    }
};

interface DeckProps {
    size: number;
    canDraw: boolean;
    drawCard: Function;
}

const mapStateToProps = (state: AppState) => {
    return {
        size: state.deck.length
    };
};

export default connect(mapStateToProps)(Deck);