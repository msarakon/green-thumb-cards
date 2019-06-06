import reducer, { throwToStreet, pickFromStreet } from './streetReducer';

describe('streetReducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({ top: [], center: [], bottom: [] });
    });

    it('should handle throwing an item to the street', () => {
        reducer(undefined, throwToStreet({ id: 1 }));
        reducer(undefined, throwToStreet({ id: 2 }));
        const street = reducer(undefined, throwToStreet({ id: 3 }));
        const totalItems = Object.values(street).reduce((coll, streets) => coll.concat(streets), []);
        expect(totalItems.length).toBe(3);
    });

    it('should handle picking an item from the street', () => {
        const street = reducer(undefined, pickFromStreet(1));
        const totalItems = Object.values(street).reduce((coll, streets) => coll.concat(streets), []);
        expect(totalItems.length).toBe(2);
    });

});