import { GardenItem } from '../types/card';
import { StreetAction, THROW_TO_STREET, PICK_FROM_STREET } from '../types/actions';
import { StreetState } from '../types/street';

const initialState = new StreetState();

const reducer = (state = initialState, action: StreetAction): StreetState => {
    switch (action.type) {
    case THROW_TO_STREET: {
        const item = {
            ...action.item,
            top: Math.floor(Math.random() * 90),
            left: Math.floor(Math.random() * 90)
        };
        const streetAreas = Object.keys(state);
        const streetArea = streetAreas[Math.floor(Math.random() * streetAreas.length)];
        state[streetArea] = state[streetArea].concat(item);
        return state;
    }
    case PICK_FROM_STREET: {
        return {
            ...state,
            top: state.top.filter(item => item.id !== action.itemId),
            center: state.center.filter(item => item.id !== action.itemId),
            bottom: state.bottom.filter(item => item.id !== action.itemId)
        };
    }
    default: return state;
    }
};

export const throwToStreet = (item: GardenItem): StreetAction => {
    return {
        type: THROW_TO_STREET,
        item
    };
};

export const pickFromStreet = (itemId: number): StreetAction => {
    return {
        type: PICK_FROM_STREET,
        itemId
    };    
};

export default reducer;