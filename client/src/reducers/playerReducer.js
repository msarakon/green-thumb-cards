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
        state[action.data.player] = {
            ...state[action.data.player],
            hand: state[action.data.player].hand.concat(action.data.cards)
        };
        return state;
    }
    case 'ADD_ITEM': {
        state[action.data.player] = {
            ...state[action.data.player],
            hand: state[action.data.player].hand.filter(card =>
                card.id !== action.data.card.id),
            garden: state[action.data.player].garden.concat(action.data.card)
        };
        return state;
    }
    default: return state;
    }
};

export const addCards = (playerId, cards) => {
    return {
        type: 'ADD_CARDS',
        data: { player: playerId, cards }
    };
};

export const addItem = (playerId, card) => {
    return {
        type: 'ADD_ITEM',
        data: { player: playerId, card }
    };
};

export default reducer;