import React from 'react';
import { connect } from 'react-redux';
import { playCard } from '../middlewares/masterMiddleware';
import { pickFromStreet } from '../reducers/streetReducer';
import GardenItem from './GardenItem';
import { AppState } from '../store';
import { GardenItem as GardenItemType } from '../types/card';

const Street = (props: StreetProps) => {
    const pick = (item: GardenItemType) => {
        props.playCard('bunny1', item);
        props.pickFromStreet(item.id);
    };

    return (
        <div>
            {
                props.items.map((item: GardenItemType) =>
                    <GardenItem
                        key={item.id}
                        item={item}
                        action={props.selectOn ? (item: GardenItemType) => pick(item) : undefined} />
                )
            }
        </div>
    );
};

interface StreetProps {
    playCard: Function;
    items: GardenItemType[];
    pickFromStreet: Function;
    selectOn: boolean;
}

const mapStateToProps = (state: AppState, { streetId }) => {
    return {
        selectOn: state.turn.mode === 'select_action',
        items: state.street[streetId]
    };
};

const mapDispatchToProps = {
    playCard,
    pickFromStreet
};

export default connect(mapStateToProps, mapDispatchToProps)(Street);