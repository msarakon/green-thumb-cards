import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { masterMiddleware } from '../middlewares/masterMiddleware';
import GameBoard from './GameBoard';
import { mockState, mockMousedown, mockPlants, mockAttacks } from '../test-utils';

afterEach(cleanup);

describe('GameBoard', () => {

    const mockStore = configureMockStore([thunk, masterMiddleware]);

    it('should handle the game preparation', () => {
        const store = mockStore(() => mockState);
        render(<Provider store={store} ><GameBoard /></Provider>);
    });

    it('should handle drawing a plant card and placing it', async () => {
        const state = {
            ...mockState,
            turn: { ...mockState.turn, mode: 'insert', card: mockPlants[0] },
            pointer: 'insertable'
        };
        const store = mockStore(() => state);
        const component = render(<Provider store={store} ><GameBoard /></Provider>);

        fireEvent.click(component.container.querySelector('.card'));
        fireEvent.mouseMove(component.container.querySelector('.gameboard'));
        fireEvent.mouseDown(component.container.querySelector('.garden'),  mockMousedown);

        await component.container.querySelector('#bunny1-garden .garden-item');
    });

    it('should handle stealing a plant', async () => {
        const state = {
            ...mockState,
            turn: { ...mockState.turn, mode: 'attack', card: mockAttacks[0] }
        };
        state.players.bunny2.garden = state.players.bunny2.garden.concat(mockPlants[0]);
        const store = mockStore(() => state);
        const component = render(<Provider store={store} ><GameBoard /></Provider>);

        fireEvent.click(component.container.querySelector('.garden-item'));
        fireEvent.mouseDown(component.container.querySelector('.garden'), mockMousedown);

        await component.container.querySelector('#bunny1-garden .garden-item');
    });
});