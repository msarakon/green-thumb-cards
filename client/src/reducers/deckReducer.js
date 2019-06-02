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
    case 'PICK_CARDS': {
        const newState = [ ...state ];
        newState.splice(0, action.data.count);
        return newState;
    }
    default: return state;
    }
};

export const pickCards = (count, callback) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'PICK_CARDS',
            data: { count }
        });
        callback(getState());
    };
};

export default reducer;