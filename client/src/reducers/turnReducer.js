const initialState = { mode: null, card: null };

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'START_SELECT_CARD': {
        return {
            mode: 'select_card',
            card: action.data
        };
    }
    case 'START_INSERT': {
        return {
            mode: 'insert',
            card: action.data
        };
    }
    case 'START_ATTACK': {
        return {
            mode: 'attack',
            card: action.data
        };
    }
    case 'END_TURN': return initialState;
    default: return state;
    }
};

export const startSelectCard = () => {
    return { type: 'START_SELECT_CARD', data: null };
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

export const endTurn = () => {
    return {
        type: 'END_TURN',
        data: null
    };
};

export default reducer;