import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import deckReducer from './reducers/deckReducer';

const reducer = combineReducers({
    deck: deckReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;