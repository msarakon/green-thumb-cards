import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, cleanup, fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import Hand from './Hand';
import { mockState, mockEnvironments, mockPlants, mockAttacks } from '../test-utils';

afterEach(cleanup);

describe('Hand', () => {

    const mockStore = configureMockStore([thunk]);

    it('should handle playing a card', () => {
        const state = {
            ...mockState,
            turn: { ...mockState.turn, mode: 'select_action' }
        };
        state.players.bunny1.hand = mockEnvironments;
        const store = mockStore(() => state);
        const component = render(<Provider store={store}><Hand /></Provider>);

        const card = component.container.querySelector('.card');
        fireEvent.click(card);

        expect(store.getActions()).toEqual([
            { type: 'PLAY_CARD', card: mockEnvironments[0], playerId: 'bunny1' }
        ]);
    });

    it('should handle drawing a card', () => {
        const state = {
            ...mockState,
            turn: { mode: 'select_action' },
            deck: mockPlants
        };
        const store = mockStore(() => state);
        const component = render(<Provider store={store}><Hand /></Provider>);

        const deck = component.container.querySelector('.deck .card');
        fireEvent.click(deck);
        
        expect(store.getActions()).toEqual([{ type: 'DRAW_CARDS_FOR', count: 1, playerId: 'bunny1' }]);
    });

    it('should emphasize the active card', () => {
        const state = {
            ...mockState,
            turn: { ...mockState.turn, mode: 'insert', card: mockAttacks[0] }
        };
        state.players.bunny1.hand = state.players.bunny1.hand.concat(mockAttacks);
        const store = mockStore(() => state);
        const component = render(<Provider store={store}><Hand /></Provider>);

        expect(component.container.querySelector('.active')).toBeDefined();
    });

});