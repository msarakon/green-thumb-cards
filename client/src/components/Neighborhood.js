import React from 'react';
import Garden from './Garden';
import PropTypes from 'prop-types';
import Street from './Street';
import './Neighborhood.css';

const Neighborhood = ({ steal }) => {
    return (
        <div className="neighborhood">
            <div className="garden-container">
                <Garden playerId={'bunny1'} />
            </div>
            <div className="street vertical">
                <Street streetId={'top'} />
            </div>
            <div className="garden-container">
                <Garden playerId={'bunny2'} steal={(item) => steal(item, 'bunny2')} />
            </div>
            <div className="street horizontal">
                <Street streetId={'center'} />
            </div>
            <div className="garden-container">
                <Garden playerId={'bunny3'} steal={(item) => steal(item, 'bunny3')} />
            </div>
            <div className="street vertical">
                <Street streetId={'bottom'} />
            </div>
            <div className="garden-container">
                <Garden playerId={'bunny4'} steal={(item) => steal(item, 'bunny4')} />
            </div>
        </div>
    );
};

Neighborhood.propTypes = {
    steal: PropTypes.func.isRequired
};


export default Neighborhood;