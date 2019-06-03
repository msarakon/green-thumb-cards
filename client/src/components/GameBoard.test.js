import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import GameBoard from './GameBoard';

afterEach(cleanup);

describe('GameBoard', () => {

    const mockStore = configureMockStore([thunk]);

    it('should place an item on mousedown if insert mode is on', () => {
        const state = {
            turn: { mode: 'insert', callback: () => {} },
            pointer: 'insertable',
            deck: [],
            players: {
                bunny1: { name: 'Bunny 1', hand: [{ id: 1, category: 'plant' }], garden: [] },
                bunny2: { name: 'Bunny 2', hand: [{ id: 2, category: 'plant' }], garden: [] },
                bunny3: { name: 'Bunny 3', hand: [{ id: 3, category: 'attack' }], garden: [] },
                bunny4: { name: 'Bunny 4', hand: [{ id: 4, category: 'foobar' }], garden: [] }
            },
            street: { top: [], center: [], bottom: [] }
        };
        const store = mockStore(() => state);

        const component = render(<Provider store={store}><GameBoard /></Provider>);
        fireEvent.mouseDown(component.container.querySelector('.garden'));
    });

    it('should handle a disaster event', () => {
        const state = {
            turn: { mode: 'start_game' },
            deck: [],
            players: {
                bunny1: { name: 'Bunny 1', hand: [{ id: 1, category: 'disaster' }], garden: [] },
                bunny2: { name: 'Bunny 2', hand: [], garden: [{ id: 2, category: 'plant' }] },
                bunny3: { name: 'Bunny 3', hand: [{ id: 3, category: 'attack' }], garden: [] },
                bunny4: { name: 'Bunny 4', hand: [{ id: 4, category: 'foobar' }], garden: [] }
            },
            street: { top: [], center: [], bottom: [] }
        };
        const store = mockStore(() => state);

        render(<Provider store={store}><GameBoard /></Provider>);
    });

});