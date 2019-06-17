import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, cleanup, fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import Hand from './Hand';
import { mockState, mockPlants } from '../test-utils';

afterEach(cleanup);

describe('Hand', () => {

    const mockStore = configureMockStore([thunk]);

    it('should handle playing a card', () => {
        const state = {
            ...mockState,
            turn: { ...mockState.turn, mode: 'select_action' }
        };
        mockState.players.bunny1.hand = mockState.players.bunny1.hand.concat(mockPlants);
        const store = mockStore(() => state);
        const component = render(<Provider store={store}><Hand /></Provider>);

        const card = component.container.querySelector('.card');
        fireEvent.click(card);
    });

    it('should handle drawing a card', () => {
        const state = {
            ...mockState,
            turn: { mode: 'select_action' },
            deck: mockState.deck.concat([mockPlants])
        };
        const store = mockStore(() => state);
        const component = render(<Provider store={store}><Hand /></Provider>);

        const deck = component.container.querySelector('.deck .card');
        fireEvent.click(deck);
        
        expect(store.getActions()).toEqual([{ type: 'DRAW_CARDS_FOR', data: { cardCount: 1, playerId: 'bunny1' } }]);
    });

    it('should emphasize the active card', () => {
        const state = {
            ...mockState,
            turn: { ...mockState.turn, mode: 'insert', card: mockPlants[0] }
        };
        mockState.players.bunny1.hand = mockState.players.bunny1.hand.concat(mockPlants[0]);
        const store = mockStore(() => state);
        const component = render(<Provider store={store}><Hand /></Provider>);

        expect(component.container.querySelector('.active')).toBeDefined();
    });

});