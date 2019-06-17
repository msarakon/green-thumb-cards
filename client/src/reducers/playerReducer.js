const newPlayer = (name) => {
    return {
        name,
        hand: [],
        garden: [],
        points: 0
    };
};

const initialState = {};

initialState.bunny1 = newPlayer('Bunny 1 (You)');
initialState.bunny2 = newPlayer('Bunny 2');
initialState.bunny3 = newPlayer('Bunny 3');
initialState.bunny4 = newPlayer('Bunny 4');

const stateWithNewCards = (state, playerId, cards) => {
    state[playerId] = {
        ...state[playerId],
        hand: state[playerId].hand.concat(cards)
    };
    return state;
};

const stateWithRemovedCard = (state, playerId, cardId) => {
    state[playerId] = {
        ...state[playerId],
        hand: state[playerId].hand.filter(card => card.id !== cardId)
    };
    return state;
};

const stateWithNewItem = (state, playerId, item) => {
    state[playerId] = {
        ...state[playerId],
        garden: state[playerId].garden.concat(item)
    };
    return state;
};

const stateWithRemovedItem = (state, playerId, itemId) => {
    state[playerId] = {
        ...state[playerId],
        garden: state[playerId].garden.filter(item => item.id !== itemId)
    };
    return state;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'ADD_CARDS':
        return stateWithNewCards(state, action.data.playerId, action.data.cards);
    case 'REMOVE_CARD':
        return stateWithRemovedCard(state, action.data.playerId, action.data.cardId);
    case 'ADD_ITEM':
        return stateWithNewItem(state, action.data.playerId, action.data.card);
    case 'REMOVE_ITEM': return stateWithRemovedItem(state, action.data.playerId, action.data.itemId);
    default: return state;
    }
};

export const addCards = (playerId, cards) => {
    return {
        type: 'ADD_CARDS',
        data: { playerId, cards }
    };
};

export const removeCard = (playerId, cardId) => {
    return {
        type: 'REMOVE_CARD',
        data: { playerId, cardId }
    };
};

export const addItem = (playerId, card) => {
    return {
        type: 'ADD_ITEM',
        data: { playerId, card }
    };
};

export const removeItem = (playerId, itemId) => {
    return {
        type: 'REMOVE_ITEM',
        data: { playerId, itemId }
    };
};

export default reducer;