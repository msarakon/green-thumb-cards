import { PointerAction, SET_POINTER } from '../types/actions';

const reducer = (state = null, action: PointerAction) => {
    switch (action.type) {
    case SET_POINTER: return action.pointer;
    default: return state;
    }
};

export const setPointer = (pointer: string): PointerAction => {
    return {
        type: SET_POINTER,
        pointer
    };
};

export default reducer;