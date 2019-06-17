import { cards } from '../cards.json';

const shuffled = (cards) => {
    const shuffled = [...cards];
    let temp;
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
};

const initialState = shuffled(cards);

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'DRAW_CARDS': {
        const newState = [ ...state ];
        newState.splice(0, action.data);
        return newState;
    }
    default: return state;
    }
};

export const drawCards = (data) => {
    return {
        type: 'DRAW_CARDS',
        data
    };
};

export default reducer;