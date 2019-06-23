import React from 'react';
import { GardenItem as GardenItemType } from '../types/card';
import { imagePath } from '../utils/index';

const GardenItem = (props: GardenItemProps) => {
    return (
        <img
            key={props.item.id}
            className="garden-item"
            src={imagePath(props.item.name)}
            style={{
                zIndex: props.item.zIndex,
                bottom: props.item.bottom + '%',
                left: props.item.left + '%'
            }}
            onClick={props.action ? () => props.action(props.item) : undefined}
        />
    );
};

interface GardenItemProps {
    item: GardenItemType;
    action: Function;
}

export default GardenItem;