import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import deckReducer from './reducers/deckReducer';
import playerReducer from './reducers/playerReducer';
import turnReducer from './reducers/turnReducer';
import pointerReducer from './reducers/pointerReducer';
import streetReducer from './reducers/streetReducer';

const reducer = combineReducers({
    deck: deckReducer,
    players: playerReducer,
    turn: turnReducer,
    pointer: pointerReducer,
    street: streetReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;