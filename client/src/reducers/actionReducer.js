const initialState = { mode: null, data: null };

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'START_INSERT': {
        return {
            mode: 'insert',
            data: action.data
        };
    }
    case 'START_ATTACK': {
        return {
            mode: 'attack',
            data: action.data
        };
    }
    default: {
        return state;
    }}
};

export const playCard = (card) => {
    switch (card.category) {
    case 'plant':
        return {
            type: 'START_INSERT',
            data: card
        };
    case 'attack':
        return {
            type: 'START_ATTACK',
            data: card
        };
    case 'environment':
        return {
            type: 'START_INSERT',
            data: card
        };
    default: return { type: '', data: null };
    }
};

export default reducer;