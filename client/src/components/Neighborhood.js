import React from 'react';
import Garden from './Garden';
import './Neighborhood.css';

const Neighborhood = () => {
    return (
        <div className="neighborhood">
            <div className="garden-container">
                <Garden playerId={'bunny1'} />
            </div>
            <div className="street vertical"></div>
            <div className="garden-container">
                <Garden playerId={'bunny2'} />
            </div>
            <div className="street horizontal"></div>
            <div className="garden-container">
                <Garden playerId={'bunny3'} />
            </div>
            <div className="street vertical"></div>
            <div className="garden-container">
                <Garden playerId={'bunny4'} />
            </div>
        </div>
    );
};

export default Neighborhood;