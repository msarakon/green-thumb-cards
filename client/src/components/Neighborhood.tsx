import React from 'react';
import Garden from './Garden';
import Street from './Street';
import './Neighborhood.css';

const Neighborhood = () => {
    return (
        <div className="neighborhood">
            <div className="garden-container">
                <Garden playerId={'bunny1'} />
            </div>
            <div className="street vertical">
                <Street streetId={'top'} />
            </div>
            <div className="garden-container">
                <Garden playerId={'bunny2'} />
            </div>
            <div className="street horizontal">
                <Street streetId={'center'} />
            </div>
            <div className="garden-container">
                <Garden playerId={'bunny4'} />
            </div>
            <div className="street vertical">
                <Street streetId={'bottom'} />
            </div>
            <div className="garden-container">
                <Garden playerId={'bunny3'} />
            </div>
        </div>
    );
};

export default Neighborhood;