import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { shuffleDeck } from '../reducers/deckReducer';

const App = (props) => {
    const shuffleDeck = props.shuffleDeck;

    useEffect(() => { shuffleDeck(); }, [shuffleDeck]);

    return (<div>Hello world!</div>);
};

App.propTypes = {
    deck: PropTypes.array.isRequired,
    shuffleDeck: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        deck: state.deck
    };
};
  
const mapDispatchToProps = {
    shuffleDeck
};

export default connect(mapStateToProps, mapDispatchToProps)(App);