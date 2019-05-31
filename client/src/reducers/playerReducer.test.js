import reducer, { addCards, addItem } from './playerReducer';

describe('playerReducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {}).bunny1).toEqual({
            name: 'Bunny 1 (You)',
            hand: [],
            garden: [],
            points: 0
        });
    });

    it('should handle adding cards', () => {
        const card = { id: 1, name: 'flower', title: 'Flower', category: 'plant' };
        expect(reducer(undefined, addCards('bunny1', [card])).bunny1).toEqual({
            name: 'Bunny 1 (You)',
            hand: [card],
            garden: [],
            points: 0
        });
    });

    it('should handle adding an item', () => {
        const card = { id: 1, name: 'flower', title: 'Flower', category: 'plant' };
        expect(reducer(undefined, addItem('bunny1', card)).bunny1).toEqual({
            name: 'Bunny 1 (You)',
            hand: [],
            garden: [card],
            points: 0
        });
    });

});