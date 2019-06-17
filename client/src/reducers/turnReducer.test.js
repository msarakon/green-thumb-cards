import reducer, { startNewAction, finishAction } from './turnReducer';
import { mockPlants, mockAttacks } from '../test-utils';

describe('turnReducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({ mode: null, card: null, actions: 0 });
    });

    it('should handle the select action mode', () => {
        expect(reducer(undefined, startNewAction())).toEqual({ mode: 'select_action', actions: 1, card: null });
    });

    it('should handle starting insert mode', () => {
        expect(reducer(undefined, { type: 'START_INSERT', data: { card: mockPlants[0] } }))
            .toEqual({ mode: 'insert', card: mockPlants[0], actions: 0 });
    });

    it('should handle starting attack mode', () => {
        expect(reducer(undefined, { type: 'START_ATTACK', data: { card: mockAttacks[0] } }))
            .toEqual({ mode: 'attack', card: mockAttacks[0], actions: 0 });
    });

    it('should handle finishing an action', () => {
        expect(reducer({ mode: 'select_action', actions: 2, card: null }, finishAction()))
            .toEqual({ mode: 'select_action', actions: 1, card: null });
    });

});