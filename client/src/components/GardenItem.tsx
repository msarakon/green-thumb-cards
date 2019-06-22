import React from 'react';
import { GardenItem as GardenItemType } from '../types/card';

const GardenItem = (props: GardenItemProps) => {
    return (
        <div
            key={props.item.id}
            className="garden-item"
            style={{
                zIndex: props.item.zIndex,
                top: props.item.top + '%',
                left: props.item.left + '%'
            }}
            onClick={props.action ? () => props.action(props.item) : undefined}>
            {props.item.id}
        </div>
    );
};

interface GardenItemProps {
    item: GardenItemType;
    action: Function;
}

export default GardenItem;