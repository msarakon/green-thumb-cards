import React from 'react';
import PropTypes from 'prop-types';

const GardenItem = ({ item, action }) => {
    return (
        <div
            key={item.id}
            className="garden-item"
            style={{
                zIndex: item.zIndex,
                top: item.top + '%',
                left: item.left + '%'
            }}
            onClick={action ? () => action(item) : undefined}>
            {item.id}
        </div>
    );
};

GardenItem.propTypes = {
    item: PropTypes.object.isRequired,
    action: PropTypes.func
};

export default GardenItem;