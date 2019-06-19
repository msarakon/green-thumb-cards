import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPointer } from '../reducers/pointerReducer';
import GardenItem from './GardenItem';
import { placeItem, steal } from '../middlewares/masterMiddleware';
import './Garden.css';

const Garden = (props) => {
    return (
        <div id={ props.playerId + '-garden' }
            className='garden'
            onMouseEnter={props.myGarden ? () => props.setPointer('insertable') : undefined}
            onMouseLeave={() => props.setPointer(null) }
            onMouseDown={props.canPlaceItem ? (e) => props.placeItem(e) : undefined}>
            {
                props.player.garden.map(item =>
                    <GardenItem
                        key={item.id}
                        item={item}
                        action={props.attackOn ? (item) => props.steal(item, props.playerId) : () => {}} />
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
    setPointer: PropTypes.func.isRequired,
    steal: PropTypes.func.isRequired,
    canPlaceItem: PropTypes.bool.isRequired,
    placeItem: PropTypes.func.isRequired
};

const mapStateToProps = (state, { playerId }) => {
    return {
        player: state.players[playerId],
        myGarden: playerId === 'bunny1',
        attackOn: playerId !== 'bunny1' && state.turn.mode === 'attack',
        turn: state.turn,
        canPlaceItem: state.turn.mode === 'insert' && state.pointer === 'insertable'
    };
};

const mapDispatchToProps = { setPointer, steal, placeItem };

export default connect(mapStateToProps, mapDispatchToProps)(Garden);