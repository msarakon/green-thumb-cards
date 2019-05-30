import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Hand = () => {
    return (
        <div></div>
    );
};

Hand.propTypes = {
    deck: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        deck: state.deck
    };
};

export default connect(mapStateToProps)(Hand);