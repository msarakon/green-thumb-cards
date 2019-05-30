import React from 'react';
import PropTypes from 'prop-types';
import './Garden.css';

const Garden = ({ player }) => {
    return (
        <div className="garden">
            {
                player.garden.map(tile =>
                    <div key={tile.id} className="garden-tile" style={{ zIndex: tile.id }}>
                        {tile.content}
                    </div>
                )
            }
        </div>
    );
};

Garden.propTypes = {
    player: PropTypes.object.isRequired
};

export default Garden;