import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playCard } from '../reducers/turnReducer';
import { pickFromStreet } from '../reducers/streetReducer';

const Street = (props) => {
    const selectOn = props.turn.mode === 'select_action';

    const pick = (item) => props.playCard(item, () => props.pickFromStreet(item.id));

    return (
        <div>
            {
                props.items.map(item =>
                    <div key={item.id} className="garden-item" style={{
                        zIndex: item.zIndex,
                        top: item.top + '%',
                        left: item.left + '%'
                    }}
                    onClick={selectOn ? () => pick(item) : undefined}>
                        {item.id}
                    </div>
                )
            }
        </div>
    );
};

Street.propTypes = {
    streetId: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    turn: PropTypes.object.isRequired,
    playCard: PropTypes.func.isRequired,
    pickFromStreet: PropTypes.func.isRequired
};

const mapStateToProps = (state, { streetId }) => {
    return {
        turn: state.turn,
        items: state.street[streetId]
    };
};

const mapDispatchToProps = {
    playCard,
    pickFromStreet
};

export default connect(mapStateToProps, mapDispatchToProps)(Street);