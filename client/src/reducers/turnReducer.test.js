import reducer, { startGame, startSelectAction, playCard } from './turnReducer';

describe('turnReducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({ mode: null, card: null });
    });

    it('should handle starting the game', () => {
        expect(reducer(undefined, startGame())).toEqual({ mode: 'start_game' });
    });

    it('should handle the select action mode', () => {
        expect(reducer(undefined, startSelectAction())).toEqual({ mode: 'select_action' });
    });

    it('should handle playing a plant card', () => {
        const card = { id: 1, name: 'flower', title: 'Flower', category: 'plant' };
        expect(reducer(undefined, playCard(card))).toEqual({ mode: 'insert', card });
    });

    it('should handle playing an attack card', () => {
        const card = { id: 2, name: 'fighto', title: 'Fighto', category: 'attack' };
        expect(reducer(undefined, playCard(card))).toEqual({ mode: 'attack', card });
    });

    it('should handle playing an environment card', () => {
        const card = { id: 3, name: 'kitty', title: 'Kitty', category: 'environment' };
        expect(reducer(undefined, playCard(card))).toEqual({ mode: 'insert', card });
    });

    it('should handle playing a defense card', () => {
        const card = { id: 4, name: 'he_also_defend', title: 'He also defend', category: 'defense' };
        expect(reducer(undefined, playCard(card))).toEqual({ mode: null, card: null });
    });

});