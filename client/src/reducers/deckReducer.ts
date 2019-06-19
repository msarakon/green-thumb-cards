import { cards } from '../cards.json';
import { Card } from '../types/card';
import { DeckAction, DRAW_CARDS } from '../types/actions';

const shuffled = (cards: Card[]) => {
    const shuffled = [...cards];
    let temp: Card;
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
};

const initialState = shuffled(cards);

const reducer = (state = initialState, action: DeckAction): Card[] => {
    switch (action.type) {
    case DRAW_CARDS: {
        const newState = [ ...state ];
        newState.splice(0, action.count);
        return newState;
    }
    default: return state;
    }
};

export const drawCards = (count: number): DeckAction => {
    return {
        type: DRAW_CARDS,
        count
    };
};

export default reducer;