import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Garden from './Garden';

afterEach(cleanup);

describe('Garden', () => {

    it('should display the items in garden', () => {
        const player = {
            garden: [
                { id: 1, name: 'foobar', title: 'Foobar' },
                { id: 2, name: 'flower', title: 'Flower' },
                { id: 3, name: 'fizzbuzz', title: 'Fizzbuzz' }
            ]
        };
        render(<Garden player={player} />);
    });

});