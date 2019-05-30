import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ card }) => {
    return (
        <div className="card">
            { card.id }
        </div>
    );
};

Card.propTypes = {
    card: PropTypes.object.isRequired
};


export default Card;