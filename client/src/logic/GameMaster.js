import store from '../store.js';
import { drawCards } from '../reducers/deckReducer';
import { addCards, addItem, removeCard, removeItem } from '../reducers/playerReducer';
import { startDrawCard, startSelectAction, playCard } from '../reducers/turnReducer';
import { throwToStreet } from '../reducers/streetReducer';
import AI from './AI';

class GameMaster {

    constructor() {
        this.CARDS_AT_START = 5;
        this.MAX_HAND_CARDS = 6;
        this.startGame = this.startGame.bind(this);
        this.drawCardsFor = this.drawCardsFor.bind(this);
        this.placeItem = this.placeItem.bind(this);
        this.doDisasters = this.doDisasters.bind(this);
        this.throwPlantToStreet = this.throwPlantToStreet.bind(this);
        this.steal = this.steal.bind(this);
        this.findDefender = this.findDefender.bind(this);
        this.endTurn = this.endTurn.bind(this);
        this.startTurn = this.startTurn.bind(this);
        this.ai = new AI({
            MAX_HAND_CARDS: this.MAX_HAND_CARDS,
            drawCardsFor: this.drawCardsFor,
            endTurn: this.endTurn,
            findDefender: this.findDefender
        });
    }
   
    /**
     * The game begins. Draw the starting hand for each player.
     * Start turn for player 1.
     */
    startGame() {
        this.drawCardsFor('bunny1', this.CARDS_AT_START, store.getState().deck, (deck) => {
            this.drawCardsFor('bunny2', this.CARDS_AT_START, deck, (deck) => {
                this.drawCardsFor('bunny3', this.CARDS_AT_START, deck, (deck) => {
                    this.drawCardsFor('bunny4', this.CARDS_AT_START, deck, (deck) => {
                        this.startTurn('bunny1', deck);
                    });
                });
            });
        });
    }

    /**
     * Draw n cards for the given player.
     * @param {String} playerId 
     * @param {Number} proposedCount
     * @param {Array} deck
     * @param {Function} next
     */
    drawCardsFor(playerId, proposedCount, deck, next) {
        const count = proposedCount > deck.length ? deck.length : proposedCount;
        console.log(`${store.getState().players[playerId].name} draws ${count} card(s)`);
        const drawn = deck.slice(0, count);
        store.dispatch(drawCards(count, ({ deck }) => {
            store.dispatch(addCards(playerId, drawn, ({ players }) => {
                this.doDisasters(playerId, players[playerId].hand, deck, (deck) => {
                    next(deck);
                });
            }));
        }));
    }

    /**
     * Handle disasters if present in a player's hand.
     * @param {String} playerId
     * @param {Array} cards
     * @param {Array} deck
     * @param {Function} next
     */
    doDisasters(playerId, cards, deck, next) {
        const disasters = cards.filter(card => card.category === 'disaster');
        disasters.forEach(disaster => {
            console.log(`*** Disaster event: "${disaster.title}"`);
            if (disaster.affectsAll) {
                Object.keys(store.getState().players).forEach(playerId =>
                    this.throwPlantToStreet(playerId, disaster));
            } else {
                this.throwPlantToStreet(playerId, disaster);
            }
            store.dispatch(removeCard(playerId, disaster.id));
        });
        if (disasters.length > 0) {
            this.drawCardsFor(playerId, disasters.length, deck, (deck) => next(deck));
        } else {
            next(deck);
        }
    }

    throwPlantToStreet(playerId, disaster) {
        const player = store.getState().players[playerId];
        const defender = this.findDefender(playerId, disaster);
        if (defender) {
            console.log(`${player.name} is not affected because of "${defender.title}"`);
        } else {
            const plants = player.garden.filter(card => card.category === 'plant');
            const plant = plants[Math.floor(Math.random() * plants.length)];
            if (plant) {
                store.dispatch(removeItem(playerId, plant.id));
                console.log(`${player.name} lost "${plant.title}"`);
                store.dispatch(throwToStreet(plant));
            }
        }
    }

    placeItem(evt) {
        const containerBounds = evt.target.getBoundingClientRect();
        const x = evt.clientX - containerBounds.x - 20;
        const y = evt.clientY - containerBounds.y - 20;
        store.dispatch(addItem('bunny1', {
            ...store.getState().turn.card,
            top: Math.floor(y / containerBounds.height * 100),
            left: Math.floor(x / containerBounds.width * 100)
        }));
        store.getState().turn.callback();
        this.endTurn('bunny1', store.getState().deck);
    }

    steal(item, playerId) {
        const attack = store.getState().turn.card;
        const victimName = store.getState().players[playerId].name;
        const defender = this.findDefender(playerId, attack);
        if (defender) {
            console.log(`You failed to steal "${item.title}" from ${victimName} because of "${defender.title}"`);
        } else {
            console.log(`You stole "${item.title}" from ${victimName}`);
            store.dispatch(removeItem(playerId, item.id));
            store.dispatch(playCard(item, () => store.dispatch(removeCard('bunny1', attack.id))));
        }
    }

    /**
     * Returns a suitable defending card/item in player's hand/garden if such exists.
     * A hand card is removed after use.
     * @param {String} playerId 
     * @param {Object} attack 
     */
    findDefender(playerId, attack) {
        const defender = store.getState().players[playerId].hand.filter(card =>
            card.protectsFrom && card.protectsFrom.includes(attack.name))[0];
        if (defender) {
            store.dispatch(removeCard(playerId, defender.id));
            return defender;
        } else {
            return store.getState().players[playerId].garden.filter(card =>
                card.protectsFrom && card.protectsFrom.includes(attack.name))[0];
        }
    }

    /**
     * Start turn for the next player.
     * @param {String} playerId
     * @param {Array} deck
     */
    endTurn(playerId, deck) {
        const playerIds = Object.keys(store.getState().players);
        const playerIdx = playerIds.indexOf(playerId);
        const nextPlayerIdx = playerIdx === playerIds.length - 1 ? 0 : playerIdx + 1;
        this.startTurn(playerIds[nextPlayerIdx], deck);
    }

    /**
     * Start turn for the given player.
     * @param {String} playerId
     * @param {Array} deck
     */
    startTurn(playerId, deck) {
        console.log(`${store.getState().players[playerId].name}'s turn starts!`);
        if (playerId === 'bunny1') {
            if (deck.length > 0 && store.getState().players[playerId].hand.length < this.MAX_HAND_CARDS) {
                store.dispatch(startDrawCard());
            }
            else store.dispatch(startSelectAction());
        } else {
            this.ai.playTurn(playerId, deck);
        }
    }

}

export default GameMaster;