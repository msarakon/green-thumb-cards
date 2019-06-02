const reducer = (state = null, action) => {
    switch (action.type) {
    case 'SET_POINTER': return action.data;
    default: return state;
    }
};

export const setPointer = (data) => {
    return {
        type: 'SET_POINTER',
        data
    };
};

export default reducer;