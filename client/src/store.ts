import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { masterMiddleware } from './middlewares/masterMiddleware';
import deckReducer from './reducers/deckReducer';
import playerReducer from './reducers/playerReducer';
import turnReducer from './reducers/turnReducer';
import pointerReducer from './reducers/pointerReducer';
import streetReducer from './reducers/streetReducer';
import { Card } from './types/card';
import { PlayerState } from './types/player';
import { TurnState } from './types/turn';
import { StreetState } from './types/street';

const reducer = combineReducers({
    deck: deckReducer,
    players: playerReducer,
    turn: turnReducer,
    pointer: pointerReducer,
    street: streetReducer
});

const store = createStore(reducer, applyMiddleware(thunk, masterMiddleware));

export interface AppState {
    deck: Card[],
    players: PlayerState,
    turn: TurnState,
    street: StreetState,
    pointer: string
}

export type Store = typeof store;
export default store;