const initialState = {
    top: [],
    center: [],
    bottom: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'THROW_TO_STREET': {
        const item = {
            ...action.data,
            top: Math.floor(Math.random() * 90),
            left: Math.floor(Math.random() * 90)
        };
        const streetAreas = Object.keys(state);
        const streetArea = streetAreas[Math.floor(Math.random()*streetAreas.length)];
        state[streetArea] = state[streetArea].concat(item);
        return state;
    }
    case 'PICK_FROM_STREET': {
        return {
            ...state,
            top: state.top.filter(item => item.id !== action.data),
            center: state.center.filter(item => item.id !== action.data),
            bottom: state.bottom.filter(item => item.id !== action.data)
        };
    }
    default: return state;
    }
};

export const throwToStreet = (card) => {
    return {
        type: 'THROW_TO_STREET',
        data: card
    };
};

export const pickFromStreet = (cardId) => {
    return {
        type: 'PICK_FROM_STREET',
        data: cardId
    };    
};

export default reducer;