import reducer from './deckReducer';
import { DRAW_CARDS } from '../types/actions'; 

describe('deckReducer', () => {

    it('should handle drawing cards', () => {
        expect(reducer(undefined, { type: DRAW_CARDS, count: 6 }).length).toEqual(107);
    });
});