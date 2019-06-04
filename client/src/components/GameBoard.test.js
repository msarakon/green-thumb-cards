import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import store from '../store';
import { startGame } from '../reducers/turnReducer';
import GameBoard from './GameBoard';

afterEach(cleanup);

describe('GameBoard', () => {

    it('should place an item on mousedown if insert mode is on', () => {
        const mockStore = configureMockStore([thunk]);
        const state = {
            turn: { mode: 'insert', callback: () => {} },
            pointer: 'insertable',
            deck: [],
            players: {
                bunny1: { name: 'Bunny 1', hand: [{ id: 1, title: 'Foobar', category: 'plant' }], garden: [] },
                bunny2: { name: 'Bunny 2', hand: [{ id: 2, title: 'Fizzbuzz', category: 'plant' }], garden: [] },
                bunny3: { name: 'Bunny 3', hand: [{ id: 3, title: 'Attac', category: 'attack' }], garden: [] },
                bunny4: { name: 'Bunny 4', hand: [{ id: 4, title: 'Fizzbuzz', category: 'foobar' }], garden: [] }
            },
            street: { top: [], center: [], bottom: [] }
        };
        const storeMock = mockStore(() => state);

        const component = render(<Provider store={storeMock}><GameBoard /></Provider>);
        fireEvent.mouseDown(component.container.querySelector('.garden'));
    });

    it('should handle starting the game', () => {
        render(<Provider store={store}><GameBoard /></Provider>);
        store.dispatch(startGame());
    });

});