import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playCard } from '../reducers/turnReducer';
import { pickFromStreet } from '../reducers/streetReducer';
import GardenItem from './GardenItem';

const Street = (props) => {
    const pick = (item) => props.playCard(item, () => props.pickFromStreet(item.id));

    return (
        <div>
            {
                props.items.map(item =>
                    <GardenItem
                        key={item.id}
                        item={item}
                        action={props.selectOn ? (item) => pick(item) : undefined} />
                )
            }
        </div>
    );
};

Street.propTypes = {
    streetId: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    selectOn: PropTypes.bool.isRequired,
    playCard: PropTypes.func.isRequired,
    pickFromStreet: PropTypes.func.isRequired
};

const mapStateToProps = (state, { streetId }) => {
    return {
        selectOn: state.turn.mode === 'select_action',
        items: state.street[streetId]
    };
};

const mapDispatchToProps = {
    playCard,
    pickFromStreet
};

export default connect(mapStateToProps, mapDispatchToProps)(Street);