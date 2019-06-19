import reducer, { addItem, removeItem, removeCard } from './playerReducer';
import { mockPlants } from '../test-utils';
import { ADD_CARDS } from '../types/actions'; 

describe('playerReducer', () => {

    it('should handle adding an item', () => {
        expect(reducer(undefined, addItem('bunny1', mockPlants[0])).bunny1.garden).toEqual([mockPlants[0]]);
    });

    it('should handle removing an item', () => {
        expect(reducer(undefined, removeItem('bunny1', mockPlants[0].id)).bunny1.garden).toEqual([]);
    });

    it('should handle adding cards', () => {
        expect(reducer(undefined, {
            type: ADD_CARDS,
            cards: [mockPlants[0]],
            playerId: 'bunny1'
        }).bunny1.hand).toEqual([mockPlants[0]]);
    });

    it('should handle removing a card', () => {
        expect(reducer(undefined, removeCard('bunny1', mockPlants[0].id)).bunny1.hand).toEqual([]);
    });

});