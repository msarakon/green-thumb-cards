import reducer, { addCards, removeCard, addItem, removeItem } from './playerReducer';

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
        const cards = [
            { id: 1, name: 'flower', title: 'Flower', category: 'plant' },
            { id: 2, name: 'fizzbuzz', title: 'Fizzbuzz', category: 'plant' }
        ];
        expect(reducer(undefined, addCards('bunny1', cards)).bunny1).toEqual({
            name: 'Bunny 1 (You)',
            hand: cards,
            garden: [],
            points: 0
        });
    });

    it('should handle removing a card', () => {
        expect(reducer(undefined, removeCard('bunny1', 2)).bunny1.hand.length).toBe(1);
    });

    it('should handle adding an item', () => {
        const card = { id: 3, name: 'foobar', title: 'Foobar', category: 'plant' };
        expect(reducer(undefined, addItem('bunny1', card)).bunny1.garden).toEqual([card]);
    });

    it('should handle removing an item', () => {
        expect(reducer(undefined, removeItem('bunny1', 3)).bunny1.garden).toEqual([]);
    });

});