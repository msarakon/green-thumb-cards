import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ card }) => {
    return (
        <div>{ card.id }</div>
    );
};

Card.propTypes = {
    card: PropTypes.object.isRequired
};


export default Card;