import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import deckReducer from './reducers/deckReducer';
import playerReducer from './reducers/playerReducer';
import actionReducer from './reducers/actionReducer';

const reducer = combineReducers({
    deck: deckReducer,
    players: playerReducer,
    action: actionReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;