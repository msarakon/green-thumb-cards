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

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'ADD_CARDS': {
        state[action.data.playerId] = {
            ...state[action.data.playerId],
            hand: state[action.data.playerId].hand.concat(action.data.cards)
        };
        return state;
    }
    case 'REMOVE_CARD': {
        state[action.data.playerId] = {
            ...state[action.data.playerId],
            hand: state[action.data.playerId].hand.filter(card =>
                card.id !== action.data.cardId)
        };
        return state;
    }
    case 'ADD_ITEM': {
        state[action.data.playerId] = {
            ...state[action.data.playerId],
            garden: state[action.data.playerId].garden.concat(action.data.card)
        };
        return state;
    }
    case 'REMOVE_ITEM': {
        state[action.data.playerId] = {
            ...state[action.data.playerId],
            garden: state[action.data.playerId].garden.filter(item => item.id !== action.data.itemId)
        };
        return state;
    }
    default: return state;
    }
};

export const addCards = (playerId, cards, callback) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'ADD_CARDS',
            data: { playerId, cards }
        });
        callback(getState());
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