import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ card, play }) => {
    return (
        <div className={'card ' + card.category} onClick={play} title={card.title}>
            <div className='card-bg'>
                { card.title }
            </div>
        </div>
    );
};

Card.propTypes = {
    card: PropTypes.object.isRequired,
    play: PropTypes.func.isRequired
};


export default Card;