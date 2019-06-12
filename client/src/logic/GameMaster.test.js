import GameMaster from './GameMaster';
import store from '../store';
import { playCard } from '../reducers/turnReducer';
import { addItem, addCards } from '../reducers/playerReducer';

describe('GameMaster', () => {

    const gm = new GameMaster();

    it('should handle starting the game', () => {
        gm.startGame();
    });

    it('should handle drawing cards for a player', () => {
        const deck = [{ id: 1 }, { id: 2 }, { id: 3 }];
        gm.drawCardsFor('bunny1', 2, deck, () => {});
    });

    it('should handle drawing cards for a player when the deck is empty', () => {
        gm.drawCardsFor('bunny1', 2, [], () => {});
    });

    it('should handle zero disasters', () => {
        const cards = [
            { id: 1, category: 'plant' },
            { id: 2, category: 'plant' },
            { id: 3, category: 'plant' }
        ];
        gm.doDisasters('bunny1', cards, [], () => {});
    });

    it('should handle some disasters', () => {
        store.dispatch(addItem('bunny1', { id: 1, category: 'plant' }));
        store.dispatch(addItem('bunny3', { id: 2, category: 'plant' }));
        const cards = [
            { id: 3, category: 'plant' },
            { id: 4, category: 'plant' },
            { id: 5, category: 'disaster' }
        ];
        gm.doDisasters('bunny1', cards, [], () => {});
    });

    it('should handle placing an item', () => {
        store.dispatch(playCard({ id: 1, category: 'plant' }, () => {}));
        gm.placeItem({
            target: {
                getBoundingClientRect: () => {
                    return { x: 100, y: 300, height: 400, width: 400 };
                }
            },
            clientX: 550,
            clientY: 500
        });
    });

    it('should handle successful stealing', () => {
        const plant = { id: 123, title: 'Foobar', category: 'plant' };
        store.dispatch(addItem('bunny3', plant));
        store.dispatch(playCard({ id: 666, category: 'attack', name: 'attac' }));

        gm.steal({ id: 123, title: 'Foobar'}, 'bunny3');

        expect(store.getState().turn.card.id === 123);
        expect(store.getState().players.bunny3.garden).not.toContain(plant);
    });

    it('should handle failed stealing', () => {
        const plant = { id: 124, title: 'Foobar', category: 'plant' };
        store.dispatch(addItem('bunny3', plant));
        store.dispatch(addCards(
            'bunny3',
            [{ id: 125, title: 'Defend', category: 'defense', protectsFrom: ['attac'] }],
            () => {}));
        store.dispatch(playCard({ id: 666, category: 'attack', name: 'attac' }));

        gm.steal({ id: 123, title: 'Foobar'}, 'bunny3');

        expect(store.getState().players.bunny3.garden).toContain(plant);
    });

    it('should start an AI turn', () => {
        gm.startTurn('bunny2', []);
    });

});