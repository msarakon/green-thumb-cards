import store from '../store';
import GameMaster from './GameMaster';

describe('AI', () => {

    GameMaster.prototype.endTurn = jest.fn();
    const ai = new GameMaster().ai; 

    it('should skip the turn if there is nothing to do', () => {
        ai.playTurn('bunny2', []);
    });

    it('should place a plant in garden', () => {
        ai.playTurn('bunny2', [{ id: 1, title: 'Plant', category: 'plant' }]);
        expect(store.getState().players.bunny2.garden.filter(item => item.id === 1).length).toBe(1);
    });

    it('should place an environment item to garden', () => {
        ai.playTurn('bunny2', [{ id: 2, title: 'Environment', category: 'environment' }]);
        expect(store.getState().players.bunny2.garden.filter(item => item.id === 2).length).toBe(1);
    });

    it('should steal something successfully', () => {
        ai.playTurn('bunny3', [{ id: 3, title: 'Plant', category: 'plant' }]);
        ai.playTurn('bunny2', [{ id: 4, title: 'Attac', category: 'attack' }]);
        expect(store.getState().players.bunny3.garden.filter(item => item.id === 3).length).toBe(0);
        expect(store.getState().players.bunny2.garden.filter(item => item.id === 3).length).toBe(1);
    });

    it('should steal something without success', () => {
        ai.playTurn('bunny3', [{ id: 5, title: 'Plant', category: 'plant' }]);
        ai.playTurn('bunny3', [{ id: 6, title: 'Defend', category: 'defense', protectsFrom: ['attac'] }]);
        ai.playTurn('bunny2', [{ id: 7, title: 'Attac', name: 'attac', category: 'attack' }]);
        expect(store.getState().players.bunny3.garden.filter(item => item.id === 5).length).toBe(1);
        expect(store.getState().players.bunny2.garden.filter(item => item.id === 5).length).toBe(0);
    });

});