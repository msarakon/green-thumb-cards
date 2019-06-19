import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { masterMiddleware } from '../middlewares/masterMiddleware';
import {
    startGame, drawCardsFor, doDisasters, playCard, placeItem, steal,
    playAITurn
} from './GameMaster';
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
            deck: mockPlants
        };
        const store = mockStore(() => state);

        drawCardsFor(store, 'bunny1', 2);
    });

    it('should handle drawing cards for a player when the deck is empty', () => {
        const state = { ...mockState, deck: [] };
        const store = mockStore(() => state);

        drawCardsFor(store, 'bunny1', 3);
    });

    it('should handle zero disasters', () => {
        const state = {
            ...mockState,
            players: {
                ...mockState.players,
                bunny1: {
                    ...mockState.players.bunny1,
                    hand: mockPlants
                }
            }
        };
        const store = mockStore(() => state);

        doDisasters(store, 'bunny1');
    });

    it('should handle a disaster that affects all', () => {
        const state = {
            ...mockState,
            players: {
                ...mockState.players,
                bunny1: {
                    ...mockState.players.bunny1,
                    hand: [mockDisasters[0], mockEnvironments[1]],
                    garden: [mockPlants[0]]
                },
                bunny2: {
                    ...mockState.players.bunny2,
                    garden: [mockPlants[1]],
                    hand: [mockDefenders[0]]
                },
                bunny3: {
                    ...mockState.players.bunny3,
                    garden: [mockPlants[2]]
                }
            }
        };
        const store = mockStore(() => state);

        doDisasters(store, 'bunny1');

        expect(store.getActions().filter(action => action.type == 'THROW_TO_STREET').length).toBe(2);
    });

    it('should handle a disaster that only affects the player', () => {
        const state = {
            ...mockState,
            players: {
                ...mockState.players,
                bunny1: {
                    ...mockState.players.bunny1,
                    hand: [mockDisasters[1]],
                    garden: [mockPlants[0]]
                },
                bunny4: {
                    ...mockState.players.bunny4,
                    garden: [mockPlants[1]]
                }
            }
        };
        const store = mockStore(() => state);

        doDisasters(store, 'bunny1');

        expect(store.getActions().filter(action => action.type == 'THROW_TO_STREET').length).toBe(1);
    });

    it('should handle playing a plant card', () => {
        const state = { ...mockState };
        const store = mockStore(() => state);

        playCard(store, 'bunny1', mockPlants[0]);

        expect(store.getActions()[0].type).toEqual('START_INSERT');
    });

    it('should handle playing an environment card', () => {
        const state = { ...mockState };
        const store = mockStore(() => state);

        playCard(store, 'bunny1', mockEnvironments[0]);

        expect(store.getActions()[0].type).toEqual('START_INSERT');
    });

    it('should handle playing an attack card', () => {
        const state = { ...mockState };
        const store = mockStore(() => state);

        playCard(store, 'bunny1', mockAttacks[0]);

        expect(store.getActions()[0].type).toEqual('START_ATTACK');
    });
    
    it('should handle playing a special card', () => {
        const state = { ...mockState };
        const store = mockStore(() => state);

        playCard(store, 'bunny1', mockSpecials[0]);

        expect(store.getActions()[0].type).toEqual('REMOVE_CARD');
        expect(store.getActions()[1].type).toEqual('START_NEW_ACTION');
    });

    it('should handle playing an unknown type card', () => {
        const state = { ...mockState };
        const store = mockStore(() => state);

        playCard(store, 'bunny1', { id: 1, name: 'foobar', title: 'Foobar', category: 'foobar' });

        expect(store.getActions()).toEqual([{ data: null, type: null }]);
    });

    it('should handle placing an item', () => {
        const state = { ...mockState };
        const store = mockStore(() => state);

        placeItem(store, mockMousedown);

        expect(store.getActions()[0].type).toEqual('ADD_ITEM');
    });

    it('should handle successful stealing', async () => {
        const state = {
            ...mockState,
            turn: { ...mockState.turn, card: mockAttacks[0] },
            players: {
                ...mockState.players,
                bunny3: {
                    ...mockState.players.bunny3,
                    garden: [mockPlants[0]]
                }
            }
        };
        const store = mockStore(() => state);

        steal(store, mockPlants[0], 'bunny3');

        expect(store.getActions()[0].type).toEqual('REMOVE_CARD');
        expect(store.getActions()[1].type).toEqual('REMOVE_ITEM');
        expect(store.getActions()[2].type).toEqual('START_INSERT');
    });

    it('should handle failed stealing', () => {
        const state = {
            ...mockState,
            turn: { ...mockState.turn, card: mockAttacks[0] },
            players: {
                ...mockState.players,
                bunny3: {
                    ...mockState.players.bunny3,
                    garden: [mockPlants[0]],
                    hand: [mockDefenders[1]]
                }
            }
        };
        const store = mockStore(() => state);

        steal(store, mockPlants[0], 'bunny3');

        expect(store.getActions()[0].type).toEqual('REMOVE_CARD');
        expect(store.getActions()[1].type).toEqual('REMOVE_CARD');
    });

    it('should handle successful AI stealing', () => {
        const state = {
            ...mockState,
            players: {
                ...mockState.players,
                bunny2: {
                    ...mockState.players.bunny2,
                    hand: [mockAttacks[0]]
                },
                bunny3: {
                    ...mockState.players.bunny3,
                    garden: [mockPlants[0]]
                }
            }
        };
        const store = mockStore(() => state);

        playAITurn(store, 'bunny2', 0);

        expect(store.getActions()[0].type).toEqual('REMOVE_ITEM');
        expect(store.getActions()[1].type).toEqual('ADD_ITEM');
        expect(store.getActions()[2].type).toEqual('REMOVE_CARD');
    });

    it('should handle failed AI stealing', () => {
        const state = {
            ...mockState,
            players: {
                ...mockState.players,
                bunny2: {
                    ...mockState.players.bunny2,
                    hand: [mockAttacks[0]]
                },
                bunny3: {
                    ...mockState.players.bunny3,
                    hand: mockDefenders,
                    garden: mockPlants
                }
            }
        };
        const store = mockStore(() => state);

        playAITurn(store, 'bunny2', 0);

        expect(store.getActions()[0].type).toEqual('REMOVE_CARD');
        expect(store.getActions()[1].type).toEqual('REMOVE_CARD');
    });

    it('should handle playing a plant card for AI', () => {
        const state = {
            ...mockState,
            players: {
                ...mockState.players,
                bunny2: {
                    ...mockState.players.bunny2,
                    hand: mockPlants
                }
            }
        };
        const store = mockStore(() => state);

        playAITurn(store, 'bunny2', 0);

        expect(store.getActions()[0].type).toEqual('ADD_ITEM');
    });

});