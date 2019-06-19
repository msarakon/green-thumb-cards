import { TurnAction, START_NEW_ACTION, START_INSERT, START_ATTACK, FINISH_ACTION } from '../types/actions';
import { TurnState } from '../types/turn';

const initialState: TurnState = new TurnState();

const reducer = (state = initialState, action: TurnAction): TurnState => {
    switch (action.type) {
    case START_NEW_ACTION:
        return { ...state, mode: 'select_action', actions: state.actions + 1 };
    case START_INSERT:
        return {
            ...state,
            mode: 'insert',
            card: action.card,
            callback: action.callback
        };
    case START_ATTACK:
        return {
            ...state,
            mode: 'attack',
            card: action.card,
            callback: action.callback
        };
    case FINISH_ACTION:
        return {
            ...state,
            mode: 'select_action',
            actions: state.actions - 1
        };
    default: return state;
    }
};

export const startNewAction = (): TurnAction => {
    return { type: START_NEW_ACTION };
};

export const finishAction = (): TurnAction => {
    return { type: FINISH_ACTION };
};

export default reducer;