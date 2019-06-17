import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { masterMiddleware } from '../middlewares/masterMiddleware';
import { startGame, drawCardsFor, doDisasters, playCard, placeItem, steal } from './GameMaster';
import {
    mockState, mockMousedown,
    mockPlants, mockAttacks, mockDefenders, mockDisasters, mockSpecials, mockEnvironments
} from '../test-utils';

describe('GameMaster', () => {

    const mockStore = configureMockStore([thunk, masterMiddleware]);

    it('should handle starting the game', () => {
        const store = mockStore(() => mockState);
        startGame(store);
    });

    it('should handle drawing cards for a player', () => {
        const state = {
            ...mockState,
            deck: mockState.deck.concat(mockPlants)
        };
        const store = mockStore(() => state);
        drawCardsFor(store, 'bunny1', 2);
    });

    it('should handle drawing cards for a player when the deck is empty', () => {
        const state = { ...mockState, deck: [] };
        const store = mockStore(() => state);
        drawCardsFor(store, 'bunny1');
    });

    it('should handle zero disasters', () => {
        const state = { ...mockState, deck: [] };
        state.players.bunny1.hand = mockState.players.bunny1.hand.concat(mockPlants);
        const store = mockStore(() => state);
        doDisasters(store, 'bunny1');
    });

    it('should handle a disaster', () => {
        const state = { ...mockState };
        state.players.bunny1.garden = mockState.players.bunny1.garden.concat([mockPlants[0]]);
        state.players.bunny2.garden = mockState.players.bunny2.garden.concat([mockPlants[1]]);
        state.players.bunny3.garden = mockState.players.bunny3.garden.concat([mockPlants[2]]);
        state.players.bunny1.hand = mockState.players.bunny1.hand.concat([mockDisasters[0]]);
        state.players.bunny2.hand = mockState.players.bunny2.hand.concat([mockDefenders[0]]);
        const store = mockStore(() => state);
        doDisasters(store, 'bunny1');

        expect(store.getActions().filter(action => action.type == 'THROW_TO_STREET').length).toBe(2);
    });

    it('should handle playing a plant card', () => {
        const state = { ...mockState };
        const store = mockStore(() => state);
        playCard(store, 'bunny1', mockPlants[0]);
    });

    it('should handle playing an environment card', () => {
        const state = { ...mockState };
        const store = mockStore(() => state);
        playCard(store, 'bunny1', mockEnvironments[0]);
    });

    it('should handle playing an attack card', () => {
        const state = { ...mockState };
        const store = mockStore(() => state);
        playCard(store, 'bunny1', mockAttacks[0]);
    });
    
    it('should handle playing a special card', () => {
        const state = { ...mockState };
        const store = mockStore(() => state);
        playCard(store, 'bunny1', mockSpecials[0]);
    });

    it('should handle playing an unknown type card', () => {
        const state = { ...mockState };
        const store = mockStore(() => state);
        playCard(store, 'bunny1', { category: 'foobar' });
    });

    it('should handle placing an item', () => {
        const state = { ...mockState };
        const store = mockStore(() => state);
        placeItem(store, mockMousedown);
    });

    it('should handle successful stealing', async () => {
        const state = {
            ...mockState,
            turn: { ...mockState.turn, card: mockAttacks[0] }
        };
        state.players.bunny3.garden = mockState.players.bunny3.garden.concat([mockPlants[0]]);
        const store = mockStore(() => state);
        steal(store, mockPlants[0], 'bunny3');
    });

    it('should handle failed stealing', () => {
        const state = {
            ...mockState,
            turn: { ...mockState.turn, card: mockAttacks[0] }
        };
        state.players.bunny3.garden = mockState.players.bunny3.garden.concat([mockPlants[0]]);
        state.players.bunny3.hand = mockState.players.bunny3.hand.concat([mockDefenders[0]]);
        const store = mockStore(() => state);
        steal(store, mockPlants[0], 'bunny3');
    });

});