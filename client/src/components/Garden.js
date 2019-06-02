import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPointer } from '../reducers/pointerReducer';
import './Garden.css';

const Garden = (props) => {
    return (
        <div className="garden"
            onMouseEnter={() => props.setPointer(props.playerId === 'bunny1' ? 'insertable' : 'attack') }
            onMouseLeave={() => props.setPointer(null) }>
            {
                props.player.garden.map(item =>
                    <div key={item.id} className="garden-item" style={{
                        zIndex: item.zIndex,
                        top: item.top + '%',
                        left: item.left + '%'
                    }}>
                        {item.id}
                    </div>
                )
            }
        </div>
    );
};

Garden.propTypes = {
    playerId: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired,
    setPointer: PropTypes.func.isRequired
};

const mapStateToProps = (state, { playerId }) => {
    return {
        player: state.players[playerId]
    };
};

const mapDispatchToProps = {
    setPointer
};

export default connect(mapStateToProps, mapDispatchToProps)(Garden);