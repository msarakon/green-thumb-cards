import reducer from './deckReducer';
import { DRAW_CARDS } from '../types/actions'; 

describe('deckReducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {}).length).toEqual(113);
    });

    it('should handle drawing cards', () => {
        expect(reducer(undefined, { type: DRAW_CARDS, count: 6 }).length).toEqual(107);
    });
});