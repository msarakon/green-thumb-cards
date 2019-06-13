import store from '../store.js';
import { addItem, removeCard, removeItem } from '../reducers/playerReducer';

class AI {

    constructor({ MAX_HAND_CARDS, drawCardsFor, endTurn, findDefender }) {
        this.MAX_HAND_CARDS = MAX_HAND_CARDS;
        this.drawCardsFor = drawCardsFor;
        this.endTurn = endTurn;
        this.findDefender = findDefender;
        this.playTurn = this.playTurn.bind(this);
        this.placeItem = this.placeItem.bind(this);
        this.getSomethingToSteal = this.getSomethingToSteal.bind(this);
        this.plantsInGarden = this.plantsInGarden.bind(this);
    }

    playTurn(playerId, deck) {
        const cardCount = this.MAX_HAND_CARDS - store.getState().players[playerId].hand.length;
        this.drawCardsFor(playerId, cardCount, deck, (deck) => {
            const playerName = store.getState().players[playerId].name;
            const playableCats = ['plant', 'environment'];
            if (this.plantsInGarden()) playableCats.push('attack');
            const playableCards = store.getState().players[playerId].hand
                .filter(card => playableCats.includes(card.category));
            const card = playableCards[Math.floor(Math.random() * playableCards.length)];
            if (card) {
                console.log(`${playerName} plays "${card.title}"`);
                if (card.category === 'plant' || card.category === 'environment') {
                    this.placeItem(playerId, card);
                } else if (card.category === 'attack') {
                    const haul = this.getSomethingToSteal(playerId, card);
                    if (haul) {
                        console.log(`${playerName} steals "${haul.item.title}" from ${haul.victimName}`);
                        store.dispatch(removeItem(haul.victimId, haul.item.id));
                        this.placeItem(playerId, haul.item);
                    }
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
    
    getSomethingToSteal(playerId, attack) {
        const possibleVictims = Object.entries(store.getState().players).filter(([id, player]) =>
            id !== playerId && player.garden.filter(item => item.category === 'plant').length > 0
        );
        const [ victimId, victim ] = possibleVictims[Math.floor(Math.random() * possibleVictims.length)];
        const possibleItems = victim.garden.filter(item => item.category === 'plant');
        const defender = this.findDefender(victimId, attack);
        if (defender) {
            const playerName = store.getState().players[playerId].name;
            console.log(`${playerName} tried to steal from ${victim.name} but it failed because of "${defender.title}"`);
            return null;
        } else {
            return {
                victimId,
                victimName: victim.name,
                item: possibleItems[Math.floor(Math.random() * possibleItems.length)]
            };
        }
    }
    
    plantsInGarden() {
        return Object.values(store.getState().players).some(player =>
            player.garden.some(item => item.category === 'plant'));
    }

}

export default AI;