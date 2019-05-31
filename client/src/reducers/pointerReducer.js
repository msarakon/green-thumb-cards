const reducer = (state = null, action) => {
    switch (action.type) {
    case 'SET_POINTER': return action.data;
    default: return state;
    }
};

export const setInsertable = (insertable) => {
    return {
        type: 'SET_POINTER',
        data: insertable ? 'insertable' : null
    };
};

export default reducer;