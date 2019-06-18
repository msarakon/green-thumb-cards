import { drawCards as drawCardsFromDeck } from '../reducers/deckReducer';
import { addCards, removeCard, addItem, removeItem } from '../reducers/playerReducer';
import { startNewAction, finishAction } from '../reducers/turnReducer';
import { throwToStreet } from '../reducers/streetReducer';

const CARDS_AT_START = 5;
const MAX_HAND_CARDS = 6;

const startGame = (store) => {
    drawCardsFor(store, 'bunny1', CARDS_AT_START);
    drawCardsFor(store, 'bunny2', CARDS_AT_START);
    drawCardsFor(store, 'bunny3', CARDS_AT_START);
    drawCardsFor(store, 'bunny4', CARDS_AT_START);
};

/**
 * Draw n cards for the given player.
 */
const drawCardsFor = (store, playerId, proposedCount) => {
    const count = proposedCount > store.getState().deck.length ? store.getState().deck.length : proposedCount;
    if (count > 0) {
        console.log(`${store.getState().players[playerId].name} draws ${count} card(s)`);
        const drawn = store.getState().deck.slice(0, count);
        store.dispatch(drawCardsFromDeck(count));
        store.dispatch(addCards(playerId, drawn));
        doDisasters(store, playerId);
    }
};

/**
 * Handle disasters if present in a player's hand.
 */
const doDisasters = (store, playerId) => {
    const disasters = store.getState().players[playerId].hand
        .filter(card => card.category === 'disaster');
    disasters.forEach(disaster => {
        console.log(`*** Disaster event: "${disaster.title}"`);
        if (disaster.affectsAll) {
            Object.keys(store.getState().players).forEach(playerId =>
                throwPlantToStreet(store, playerId, disaster));
        } else {
            throwPlantToStreet(store, playerId, disaster);
        }
        store.dispatch(removeCard(playerId, disaster.id));
    });
    if (disasters.length > 0) {
        drawCardsFor(store, playerId, disasters.length);
    }
};

const throwPlantToStreet = (store, playerId, disaster) => {
    const player = store.getState().players[playerId];
    const defender = findDefender(store, playerId, disaster);
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
};

/**
 * Returns a suitable defending card/item in player's hand/garden if such exists.
 * A hand card is removed after use.
 * @param {String} playerId 
 * @param {Object} attack 
 */
const findDefender = (store, playerId, attack) => {
    const defender = store.getState().players[playerId].hand.find(card =>
        card.protectsFrom && card.protectsFrom.includes(attack.name));
    if (defender) {
        store.dispatch(removeCard(playerId, defender.id));
        return defender;
    } else {
        return store.getState().players[playerId].garden.find(card =>
            card.protectsFrom && card.protectsFrom.includes(attack.name));
    }
};

const placeItem = (store, evt) => {
    const containerBounds = evt.target.getBoundingClientRect();
    const x = evt.clientX - containerBounds.x - 20;
    const y = evt.clientY - containerBounds.y - 20;
    store.dispatch(addItem('bunny1', {
        ...store.getState().turn.card,
        top: Math.floor(y / containerBounds.height * 100),
        left: Math.floor(x / containerBounds.width * 100)
    }));
    store.getState().turn.callback();
    endTurn(store, 'bunny1');
};

const steal = (store, item, playerId) => {
    const attack = store.getState().turn.card;
    store.dispatch(removeCard('bunny1', attack.id));
    const victimName = store.getState().players[playerId].name;
    const defender = findDefender(store, playerId, attack);
    if (defender) {
        console.log(`You failed to steal "${item.title}" from ${victimName} because of "${defender.title}"`);
        store.dispatch(finishAction());
    } else {
        console.log(`You stole "${item.title}" from ${victimName}`);
        store.dispatch(removeItem(playerId, item.id));
        store.dispatch(playSingleActionCard(item, () => store.dispatch(finishAction())));
    }
};

const playAITurn = (store, playerId, actions) => {
    actions = Object.is(actions, undefined) ? 0 : actions;
    const cardCount = MAX_HAND_CARDS - store.getState().players[playerId].hand.length;
    drawCardsFor(store, playerId, cardCount);
    const playerName = store.getState().players[playerId].name;
    const card = getPlayableCard(store.getState().players, playerId);
    if (card) {
        actions = playAICard(store, playerName, playerId, card, actions);
        if (actions > 0) playAITurn(store, playerId, actions);
    } else {
        console.log(`${playerName} skips their turn`);
    }
    endTurn(store, playerId);
};

const getPlayableCard = (players, playerId) => {
    const playableCats = ['plant', 'environment', 'special'];
    if (plantsInGarden(players)) playableCats.push('attack');
    const playableCards = players[playerId].hand.filter(card => playableCats.includes(card.category));
    return playableCards[Math.floor(Math.random() * playableCards.length)];
};

const playAICard = (store, playerName, playerId, card, actions) => {
    console.log(`${playerName} plays "${card.title}"`);
    if (card.category === 'plant' || card.category === 'environment') {
        autoPlaceItem(store, playerId, card);
        actions--;
    } else if (card.category === 'attack') {
        const haul = getSomethingToSteal(store, playerId, card);
        if (haul) {
            console.log(`${playerName} steals "${haul.item.title}" from ${haul.victimName}`);
            store.dispatch(removeItem(haul.victimId, haul.item.id));
            autoPlaceItem(store, playerId, haul.item);
        }
        actions--;
    } else if (card.category === 'special') {
        actions++;
    }
    store.dispatch(removeCard(playerId, card.id));
    return actions;
};

const autoPlaceItem = (store, playerId, item) => {
    store.dispatch(addItem(playerId, {
        ...item,
        top: Math.floor(Math.random() * 90),
        left: Math.floor(Math.random() * 90)
    }));
};

const getSomethingToSteal = (store, playerId, attack) => {
    const possibleVictims = Object.entries(store.getState().players).filter(([id, player]) =>
        id !== playerId && player.garden.filter(item => item.category === 'plant').length > 0
    );
    const [ victimId, victim ] = possibleVictims[Math.floor(Math.random() * possibleVictims.length)];
    const possibleItems = victim.garden.filter(item => item.category === 'plant');
    const defender = findDefender(store, victimId, attack);
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
};

const plantsInGarden = (players) => {
    return Object.values(players).some(player => player.garden.some(item => item.category === 'plant'));
};

/**
 * Start turn for the next player.
 * @param {Object} store
 * @param {String} playerId
 */
const endTurn = (store, playerId) => {
    if (store.getState().turn.actions > 0) return;
    const playerIds = Object.keys(store.getState().players);
    const playerIdx = playerIds.indexOf(playerId);
    const nextPlayerIdx = playerIdx === playerIds.length - 1 ? 0 : playerIdx + 1;
    startTurn(store, playerIds[nextPlayerIdx]);
};

/**
 * Start turn for the given player.
 * @param {String} playerId
 */
const startTurn = (store, playerId) => {
    console.log(`${store.getState().players[playerId].name}'s turn starts!`);
    if (playerId === 'bunny1') store.dispatch(startNewAction());
    else playAITurn(store, playerId);
};

const playSingleActionCard = (card, callback) => {
    switch (card.category) {
    case 'plant':
        return {
            type: 'START_INSERT',
            data: { card, callback }
        };
    case 'attack':
        return {
            type: 'START_ATTACK',
            data: { card, callback }
        };
    case 'environment':
        return {
            type: 'START_INSERT',
            data: { card, callback }
        };
    default: return { type: null, data: null };
    }    
};

const playCard = (store, playerId, card) => {
    if (card.category === 'special') {
        store.dispatch(removeCard(playerId, card.id));
        store.dispatch(startNewAction());
    } else {
        store.dispatch(playSingleActionCard(card, () => {
            store.dispatch(removeCard(playerId, card.id));
            store.dispatch(finishAction());
        }));
    }
};

export {
    startGame,
    drawCardsFor,
    playCard,
    placeItem,
    steal,
    doDisasters,
    playAITurn
};