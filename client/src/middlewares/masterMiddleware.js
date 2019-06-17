import {
    startGame as handleStartGame,
    drawCardsFor as handleDrawCards,
    playCard as handlePlayCard,
    placeItem as handlePlaceItem,
    steal as handleSteal
} from '../logic/GameMaster';

const masterMiddleware = store => next => action => {
    switch (action.type) {
    case 'START_GAME': handleStartGame(store);
        break;
    case 'DRAW_CARDS_FOR': handleDrawCards(store, action.data.playerId, action.data.cardCount);
        break;
    case 'PLAY_CARD': handlePlayCard(store, action.data.playerId, action.data.card);
        break;
    case 'PLACE_ITEM': handlePlaceItem(store, action.data.event);
        break;
    case 'STEAL': handleSteal(store, action.data.item, action.data.playerId);
        break;
    default: next(action);
    }
};

const startGame = () => {
    return { type: 'START_GAME', data: null };
};

const drawCards = (playerId, cardCount) => {
    return {
        type: 'DRAW_CARDS_FOR',
        data: { playerId, cardCount }
    };
};

const playCard = (playerId, card) => {
    return {
        type: 'PLAY_CARD',
        data: { playerId, card }
    };
};

const placeItem = (event) => {
    return {
        type: 'PLACE_ITEM',
        data: { event }
    };
};

const steal = (item, playerId) => {
    return {
        type: 'STEAL',
        data: { item, playerId }
    };
};

export { masterMiddleware, startGame, drawCards, playCard, placeItem, steal };