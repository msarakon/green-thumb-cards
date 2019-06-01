import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import GameBoard from './GameBoard';

afterEach(cleanup);

describe('GameBoard', () => {

    const mockStore = configureMockStore([]);
    const state = {
        turn: { mode: 'insert' },
        pointer: 'insertable',
        deck: [],
        players: {
            bunny1: { hand: [], garden: [] },
            bunny2: { hand: [], garden: [] },
            bunny3: { hand: [], garden: [] },
            bunny4: { hand: [], garden: [] }
        }
    };
    const store = mockStore(() => state);

    it('should place an item on mousedown if insert mode is on', () => {
        const component = render(<Provider store={store}><GameBoard /></Provider>);
        fireEvent.mouseDown(component.container.querySelector('.garden'));
    });

});