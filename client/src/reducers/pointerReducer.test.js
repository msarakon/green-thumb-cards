import reducer, { setPointer } from './pointerReducer';

describe('pointerReducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(null);
    });

    it('should handle setting the pointer', () => {
        expect(reducer(undefined, setPointer('foobar'))).toEqual('foobar');
    });

});