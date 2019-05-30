import { cards } from '../cards.json';

const initialState = [...cards];

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SHUFFLE_DECK': {
        const shuffled = [...state];
        let temp;
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        return shuffled;
    }
    default: return state;
    }
};

export const shuffleDeck = () => {
    return {
        type: 'SHUFFLE_DECK',
        data: null
    };
};

export default reducer;