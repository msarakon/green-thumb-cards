import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { masterMiddleware } from '../middlewares/masterMiddleware';
import GameBoard from './GameBoard';
import { mockState, mockMousedown, mockPlants, mockAttacks } from '../test-utils/mock-data';

afterEach(cleanup);

describe('GameBoard', () => {

    const mockStore = configureMockStore([thunk, masterMiddleware]);

    it('should handle the game preparation', () => {
        const store = mockStore(() => mockState);
        render(<Provider store={store} ><GameBoard /></Provider>);
    });

    it('should handle selecting a plant card', () => {
        const state = {
            ...mockState,
            players: {
                ...mockState.players,
                bunny1: {
                    ...mockState.players.bunny1,
                    hand: [mockPlants[0]]
                }
            }
        };
        const store = mockStore(() => state);
        const component = render(<Provider store={store} ><GameBoard /></Provider>);

        fireEvent.click(component.container.querySelector('.card'));
        
        expect(store.getActions()[0].type).toEqual('START_INSERT');

        // workaround for running the callback function of playCard()
        store.getActions()[0].callback();
    });

    it('should handle placing a plant', () => {
        const state = {
            ...mockState,
            turn: { ...mockState.turn, mode: 'insert', card: mockPlants[0] },
            pointer: 'insertable'
        };
        const store = mockStore(() => state);
        const component = render(<Provider store={store} ><GameBoard /></Provider>);

        fireEvent.mouseDown(component.container.querySelector('#bunny1-garden'), mockMousedown);

        expect(store.getActions()[0].type).toEqual('ADD_ITEM');
    });

    it('should handle stealing a plant', () => {
        const state = {
            ...mockState,
            turn: { ...mockState.turn, mode: 'attack', card: mockAttacks[0] },
            players: {
                ...mockState.players,
                bunny2: {
                    ...mockState.players.bunny2,
                    garden: [mockPlants[0]]
                }
            }
        };
        const store = mockStore(() => state);
        const component = render(<Provider store={store} ><GameBoard /></Provider>);

        fireEvent.click(component.container.querySelector('#bunny2-garden .garden-item'));

        expect(store.getActions()[0].type).toEqual('REMOVE_CARD');
        expect(store.getActions()[1].type).toEqual('REMOVE_ITEM');
        expect(store.getActions()[2].type).toEqual('START_INSERT');
    });
});