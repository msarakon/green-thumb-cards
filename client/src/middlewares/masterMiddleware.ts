import {
    startGame as handleStartGame,
    drawCardsFor as handleDrawCards,
    playCard as handlePlayCard,
    placeItem as handlePlaceItem,
    steal as handleSteal
} from '../logic/GameMaster';
import {
    GameAction, MasterAction, START_GAME, DRAW_CARDS_FOR, PLAY_CARD, PLACE_ITEM, STEAL
} from '../types/actions';
import { Card, GardenItem } from '../types/card';

const masterMiddleware = store => (next: Function) => (action: GameAction) => {
    switch (action.type) {
    case START_GAME: handleStartGame(store);
        break;
    case DRAW_CARDS_FOR: handleDrawCards(store, action.playerId, action.count);
        break;
    case PLAY_CARD: handlePlayCard(store, action.playerId, action.card);
        break;
    case PLACE_ITEM: handlePlaceItem(store, action.event);
        break;
    case STEAL: handleSteal(store, action.item, action.playerId);
        break;
    default: next(action);
    }
};

const startGame = (): MasterAction => {
    return { type: START_GAME };
};

const drawCards = (playerId: string, count: number): MasterAction => {
    return {
        type: DRAW_CARDS_FOR,
        playerId,
        count
    };
};

const playCard = (playerId: string, card: Card): MasterAction => {
    return {
        type: PLAY_CARD,
        playerId,
        card
    };
};

const placeItem = (event: React.MouseEvent<HTMLElement>): MasterAction => {
    return {
        type: PLACE_ITEM,
        event
    };
};

const steal = (item: GardenItem, playerId: string): MasterAction => {
    return {
        type: STEAL,
        item,
        playerId
    };
};

export { masterMiddleware, startGame, drawCards, playCard, placeItem, steal };