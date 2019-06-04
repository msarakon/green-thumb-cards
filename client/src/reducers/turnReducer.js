const initialState = { mode: null, card: null };

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'START_GAME':
        return {
            mode: 'start_game'
        };
    case 'START_PICK_CARD':
        return {
            mode: 'pick_card',
            player: action.data
        };
    case 'START_SELECT_ACTION':
        return {
            mode: 'select_action'
        };
    case 'START_INSERT':
        return {
            mode: 'insert',
            card: action.data.card,
            callback: action.data.callback
        };
    case 'START_ATTACK':
        return {
            mode: 'attack',
            card: action.data.card,
            callback: action.data.callback
        };
    default: return state;
    }
};

export const startGame = () => {
    return { type: 'START_GAME', data: null };
};

export const startPickCard = () => {
    return { type: 'START_PICK_CARD', data: null };
};

export const startSelectAction = () => {
    return { type: 'START_SELECT_ACTION', data: null };
};

export const playCard = (card, callback) => {
    switch (card.category) {
    case 'plant':
        return {
            type: 'START_INSERT',
            data: { card, callback }
        };
    case 'attack':
        return {
            type: 'START_ATTACK',
            data: { card, callback }
        };
    case 'environment':
        return {
            type: 'START_INSERT',
            data: { card, callback }
        };
    default: return { type: '', data: null };
    }
};

export default reducer;