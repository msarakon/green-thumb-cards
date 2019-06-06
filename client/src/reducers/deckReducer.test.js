import reducer from './deckReducer';

describe('deckReducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {}).length).toEqual(113);
    });

    it('should handle drawing cards', () => {
        expect(reducer(undefined, { type: 'DRAW_CARDS', data: 6 }).length).toEqual(107);
    });
});