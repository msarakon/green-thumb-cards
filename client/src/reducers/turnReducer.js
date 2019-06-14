const initialState = { mode: null, card: null, actions: 0 };

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'START_GAME':
        return { ...state, mode: 'start_game' };
    case 'START_NEW_ACTION':
        return { ...state, mode: 'select_action', actions: state.actions + 1 };
    case 'START_INSERT':
        return {
            ...state,
            mode: 'insert',
            card: action.data.card,
            callback: action.data.callback
        };
    case 'START_ATTACK':
        return {
            ...state,
            mode: 'attack',
            card: action.data.card,
            callback: action.data.callback
        };
    case 'FINISH_ACTION':
        return {
            ...state,
            mode: 'select_action',
            actions: state.actions - 1
        };
    default: return state;
    }
};

export const startGame = () => {
    return { type: 'START_GAME', data: null };
};

export const startNewAction = () => {
    return { type: 'START_NEW_ACTION', data: null };
};

export const finishAction = () => {
    return { type: 'FINISH_ACTION', data: null };
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