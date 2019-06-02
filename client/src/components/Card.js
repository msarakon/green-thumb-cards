import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Card.css';

const Card = (props) => {
    const selectableCategories = ['plant', 'environment', 'attack'];
    const selectable = props.turn.mode === 'select_card' &&
        selectableCategories.includes(props.card.category);

    return (
        <div className={'card ' + props.card.category + (selectable ? ' selectable' : '')}
            onClick={props.turn.mode === 'select_card' ? props.play : undefined}
            title={props.card.title}>
            <div className='card-bg'>
                { props.card.title }
            </div>
        </div>
    );
};

Card.propTypes = {
    card: PropTypes.object.isRequired,
    play: PropTypes.func.isRequired,
    turn: PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
    return {
        turn: state.turn
    };
};

export default connect(mapStateToProps)(Card);