import store from '../store.js';
import { addItem, removeCard, removeItem } from '../reducers/playerReducer';

class AI {

    constructor({ drawCardsFor, endTurn }) {
        this.drawCardsFor = drawCardsFor;
        this.endTurn = endTurn;
        this.playTurn = this.playTurn.bind(this);
        this.placeItem = this.placeItem.bind(this);
        this.getSomethingToSteal = this.getSomethingToSteal.bind(this);
        this.plantsInGarden = this.plantsInGarden.bind(this);
    }

    playTurn({ playerId, deck }) {
        this.drawCardsFor(playerId, 1, deck, (deck) => {
            const playerName = store.getState().players[playerId].name;
            const playableCats = ['plant', 'environment'];
            if (this.plantsInGarden(store.getState().players)) playableCats.push('attack');
            const playableCards = store.getState().players[playerId].hand
                .filter(card => playableCats.includes(card.category));
            const card = playableCards[Math.floor(Math.random() * playableCards.length)];
            if (card) {
                console.log(`${playerName} plays "${card.title}"`);
                if (card.category === 'plant' || card.category === 'environment') {
                    this.placeItem(playerId, card);
                } else if (card.category === 'attack') {
                    const haul = this.getSomethingToSteal(store.getState().players, playerId);
                    console.log(`${playerName} steals "${haul.item.title}" from ${haul.victimName}`);
                    store.dispatch(removeItem(haul.victimId, haul.item.id));
                    this.placeItem(playerId, haul.item);
                }
                store.dispatch(removeCard(playerId, card.id));
            } else {
                console.log(`${playerName} skips their turn`);
            }
            this.endTurn(playerId, deck);
        });
    }
    
    placeItem(playerId, item) {
        store.dispatch(addItem(playerId, {
            ...item,
            top: Math.floor(Math.random() * 90),
            left: Math.floor(Math.random() * 90)
        }));
    }
    
    getSomethingToSteal(players, playerId) {
        const possibleVictims = Object.entries(players).filter(([id, player]) =>
            id !== playerId && player.garden.filter(item => item.category === 'plant').length > 0
        );
        const [ victimId, victim ] = possibleVictims[Math.floor(Math.random() * possibleVictims.length)];
        const possibleItems = victim.garden.filter(item => item.category === 'plant');
        return {
            victimId,
            victimName: victim.name,
            item: possibleItems[Math.floor(Math.random() * possibleItems.length)]
        };
    }
    
    plantsInGarden(players) {
        return Object.values(players).some(player =>
            player.garden.some(item => item.category === 'plant'));
    }

}

export default AI;