const newPlayer = (name) => {
    return { name, hand: [], points: 0 };
};

const initialState = {};

initialState.bunny1 = newPlayer('Bunny 1 (You)');
initialState.bunny2 = newPlayer('Bunny 2');
initialState.bunny3 = newPlayer('Bunny 3');
initialState.bunny4 = newPlayer('Bunny 4');

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'ADD_CARDS': {
        const newState = { ...state };
        const newHand = state[action.data.player].hand.concat(action.data.cards);
        newState[action.data.player].hand = newHand;
        return newState;
    }
    default: return state;
    }
};

export const addCards = (playerId, cards) => {
    return {
        type: 'ADD_CARDS',
        data: {
            player: playerId,
            cards: cards
        }
    };
};

export default reducer;