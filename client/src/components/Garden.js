import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPointer } from '../reducers/pointerReducer';
import { playCard } from '../reducers/turnReducer';
import { removeItem, addItem, removeCard } from '../reducers/playerReducer';
import './Garden.css';

const Garden = (props) => {
    const myGarden = props.playerId === 'bunny1';
    const attackOn = !myGarden && props.turn.mode === 'attack';

    const steal = (item) => {
        console.log(`You attempt to steal "${item.title}" from ${props.player.name}`);
        props.removeItem(props.playerId, item.id);
        const attackCardId = props.turn.card.id;
        props.playCard(item, () => props.removeCard('bunny1', attackCardId));
    };

    return (
        <div className="garden"
            onMouseEnter={myGarden ? () => props.setPointer('insertable') : undefined}
            onMouseLeave={() => props.setPointer(null) }>
            {
                props.player.garden.map(item =>
                    <div key={item.id} className="garden-item" style={{
                        zIndex: item.zIndex,
                        top: item.top + '%',
                        left: item.left + '%'
                    }}
                    onClick={attackOn ? () => steal(item) : undefined}>
                        {item.id}
                    </div>
                )
            }
        </div>
    );
};

Garden.propTypes = {
    playerId: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired,
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