import { PlayerState, Player } from '../types/player';
import { Card, GardenItem } from '../types/card';
import { PlayerAction, ADD_CARDS, REMOVE_CARD, ADD_ITEM, REMOVE_ITEM } from '../types/actions';

const initialState: PlayerState = {
    bunny1: new Player('Bunny 1 (You)'),
    bunny2: new Player('Bunny 2'),
    bunny3: new Player('Bunny 3'),
    bunny4: new Player('Bunny 4')
};

const stateWithNewCards = (state: PlayerState, playerId: string, cards: Array<Card>): PlayerState => {
    state[playerId] = {
        ...state[playerId],
        hand: state[playerId].hand.concat(cards)
    };
    return state;
};

const stateWithRemovedCard = (state: PlayerState, playerId: string, cardId: number): PlayerState => {
    state[playerId] = {
        ...state[playerId],
        hand: state[playerId].hand.filter((card: Card) => card.id !== cardId)
    };
    return state;
};

const stateWithNewItem = (state: PlayerState, playerId: string, item: GardenItem): PlayerState => {
    state[playerId] = {
        ...state[playerId],
        garden: state[playerId].garden.concat(item)
    };
    return state;
};

const stateWithRemovedItem = (state: PlayerState, playerId: string, itemId: number): PlayerState => {
    state[playerId] = {
        ...state[playerId],
        garden: state[playerId].garden.filter((item: GardenItem) => item.id !== itemId)
    };
    return state;
};

const reducer = (state = initialState, action: PlayerAction): PlayerState => {
    switch (action.type) {
    case ADD_CARDS:
        return stateWithNewCards(state, action.playerId, action.cards);
    case REMOVE_CARD:
        return stateWithRemovedCard(state, action.playerId, action.cardId);
    case ADD_ITEM:
        return stateWithNewItem(state, action.playerId, action.item);
    case REMOVE_ITEM: return stateWithRemovedItem(state, action.playerId, action.itemId);
    default: return state;
    }
};

export const addCards = (playerId: string, cards: Card[]): PlayerAction  => {
    return {
        type: ADD_CARDS,
        playerId,
        cards
    };
};

export const removeCard = (playerId: string, cardId: number): PlayerAction  => {
    return {
        type: REMOVE_CARD,
        playerId,
        cardId
    };
};

export const addItem = (playerId: string, item: GardenItem): PlayerAction => {
    return {
        type: ADD_ITEM,
        playerId,
        item
    };
};

export const removeItem = (playerId: string, itemId: number): PlayerAction  => {
    return {
        type: REMOVE_ITEM,
        playerId,
        itemId
    };
};

export default reducer;