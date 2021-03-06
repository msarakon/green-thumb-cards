import React from 'react';
import { connect } from 'react-redux';
import { setPointer } from '../reducers/pointerReducer';
import GardenItem from './GardenItem';
import { placeItem, steal } from '../middlewares/masterMiddleware';
import { AppState } from '../store';
import { GardenItem as GardenItemType } from '../types/card';
import './Garden.css';

const Garden = (props: GardenProps) => {
    return (
        <div id={ props.playerId + '-garden' }
            className='garden'
            onMouseEnter={props.myGarden ? () => props.setPointer('insertable') : undefined}
            onMouseLeave={() => props.setPointer(null) }
            onMouseDown={props.canPlaceItem ? (e) => props.placeItem(e) : undefined}>
            {
                props.garden.map((item: GardenItemType) =>
                    <GardenItem
                        key={item.id}
                        item={item}
                        action={props.attackOn ? (item: GardenItemType) => props.steal(item, props.playerId) : () => {}} />
                )
            }
        </div>
    );
};

interface GardenProps {
    playerId: string;
    garden: GardenItemType[];
    myGarden: boolean;
    setPointer: Function;
    canPlaceItem: boolean;
    placeItem: Function;
    attackOn: boolean;
    steal: Function
}

const mapStateToProps = (state: AppState, { playerId }) => {
    return {
        garden: state.players[playerId].garden,
        myGarden: playerId === 'bunny1',
        attackOn: playerId !== 'bunny1' && state.turn.mode === 'attack',
        turn: state.turn,
        canPlaceItem: state.turn.mode === 'insert' && state.pointer === 'insertable'
    };
};

const mapDispatchToProps = { setPointer, steal, placeItem };

export default connect(mapStateToProps, mapDispatchToProps)(Garden);