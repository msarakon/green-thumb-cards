import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPointer } from '../reducers/pointerReducer';
import { playCard } from '../reducers/turnReducer';
import { removeItem, addItem, removeCard } from '../reducers/playerReducer';
import GardenItem from './GardenItem';
import './Garden.css';

const Garden = (props) => {
    const steal = (item) => {
        console.log(`You attempt to steal "${item.title}" from ${props.player.name}`);
        props.removeItem(props.playerId, item.id);
        const attackCardId = props.turn.card.id;
        props.playCard(item, () => props.removeCard('bunny1', attackCardId));
    };

    return (
        <div className='garden'
            onMouseEnter={props.myGarden ? () => props.setPointer('insertable') : undefined}
            onMouseLeave={() => props.setPointer(null) }>
            {
                props.player.garden.map(item =>
                    <GardenItem
                        key={item.id}
                        item={item}
                        action={props.attackOn ? (item) => steal(item) : undefined} />
                )
            }
        </div>
    );
};

Garden.propTypes = {
    playerId: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired,
    myGarden: PropTypes.bool.isRequired,
    attackOn: PropTypes.bool.isRequired,
    turn: PropTypes.object.isRequired,
    setPointer: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    playCard: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired
};

const mapStateToProps = (state, { playerId }) => {
    return {
        player: state.players[playerId],
        myGarden: playerId === 'bunny1',
        attackOn: playerId !== 'bunny1' && state.turn.mode === 'attack',
        turn: state.turn
    };
};

const mapDispatchToProps = {
    setPointer,
    addItem,
    removeItem,
    playCard,
    removeCard
};

export default connect(mapStateToProps, mapDispatchToProps)(Garden);