import reducer, { startNewAction, finishAction } from './turnReducer';
import { mockPlants, mockAttacks } from '../test-utils';
import { START_INSERT, START_ATTACK } from '../types/actions';

describe('turnReducer', () => {

    it('should handle the select action mode', () => {
        expect(reducer(undefined, startNewAction())).toEqual({ mode: 'select_action', actions: 1 });
    });

    it('should handle starting insert mode', () => {
        expect(reducer(undefined, { type: START_INSERT, card: mockPlants[0], callback: () => {} }))
            .toEqual({ mode: 'insert', card: mockPlants[0], actions: 0, callback: expect.any(Function) });
    });

    it('should handle starting attack mode', () => {
        expect(reducer(undefined, { type: START_ATTACK, card: mockAttacks[0], callback: () => {} }))
            .toEqual({ mode: 'attack', card: mockAttacks[0], actions: 0, callback: expect.any(Function) });
    });

    it('should handle finishing an action', () => {
        expect(reducer({ mode: 'select_action', actions: 2 }, finishAction()))
            .toEqual({ mode: 'select_action', actions: 1 });
    });

});