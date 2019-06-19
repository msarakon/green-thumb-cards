import reducer, { throwToStreet, pickFromStreet } from './streetReducer';
import { mockPlants } from '../test-utils';

describe('streetReducer', () => {

    it('should handle throwing an item to the street', () => {
        reducer(undefined, throwToStreet(mockPlants[0]));
        reducer(undefined, throwToStreet(mockPlants[1]));
        const street = reducer(undefined, throwToStreet(mockPlants[2]));
        const totalItems = Object.values(street).reduce((coll, streets) => coll.concat(streets), []);
        expect(totalItems.length).toBe(3);
    });

    it('should handle picking an item from the street', () => {
        const street = reducer(undefined, pickFromStreet(1));
        const totalItems = Object.values(street).reduce((coll, streets) => coll.concat(streets), []);
        expect(totalItems.length).toBe(2);
    });

});