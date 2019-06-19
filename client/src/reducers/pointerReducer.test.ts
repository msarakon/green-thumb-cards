import reducer, { setPointer } from './pointerReducer';

describe('pointerReducer', () => {

    it('should handle setting the pointer', () => {
        expect(reducer(undefined, setPointer('foobar'))).toEqual('foobar');
    });

});