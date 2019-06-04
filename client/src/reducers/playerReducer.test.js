import reducer, { addItem, removeItem } from './playerReducer';

describe('playerReducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {}).bunny1).toEqual({
            name: 'Bunny 1 (You)',
            hand: [],
            garden: [],
            points: 0
        });
    });

    it('should handle adding an item', () => {
        const card = { id: 3, name: 'foobar', title: 'Foobar', category: 'plant' };
        expect(reducer(undefined, addItem('bunny1', card)).bunny1.garden).toEqual([card]);
    });

    it('should handle removing an item', () => {
        expect(reducer(undefined, removeItem('bunny1', 3)).bunny1.garden).toEqual([]);
    });

});