import { Card, GardenItem } from '../types/card';

export const START_GAME = 'START_GAME';
export const DRAW_CARDS_FOR = 'DRAW_CARDS_FOR';
export const PLAY_CARD = 'PLAY_CARD';
export const PLACE_ITEM = 'PLACE_ITEM';
export const STEAL = 'STEAL';
export const ADD_CARDS = 'ADD_CARDS';
export const REMOVE_CARD = 'REMOVE_CARD';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const DRAW_CARDS = 'DRAW_CARDS';
export const SET_POINTER = 'SET_POINTER';
export const THROW_TO_STREET = 'THROW_TO_STREET';
export const PICK_FROM_STREET = 'PICK_FROM_STREET';
export const START_NEW_ACTION = 'START_NEW_ACTION';
export const START_INSERT = 'START_INSERT';
export const START_ATTACK = 'START_ATTACK';
export const FINISH_ACTION = 'FINISH_ACTION';
export const WAIT = 'WAIT';

interface StartGame {
    type: typeof START_GAME
}

interface DrawCardsFor {
    type: typeof DRAW_CARDS_FOR,
    playerId: string,
    count: number
}

interface PlayCard {
    type: typeof PLAY_CARD,
    playerId: string,
    card: Card
}

interface PlaceItem {
    type: typeof PLACE_ITEM,
    event: React.MouseEvent<HTMLElement>
}

interface Steal {
    type: typeof STEAL,
    item: GardenItem,
    playerId: string
}

interface DrawCards {
    type: typeof DRAW_CARDS,
    count: number
}

interface AddCards {
    type: typeof ADD_CARDS,
    playerId: string,
    cards: Card[]
}

interface RemoveCard {
    type: typeof REMOVE_CARD,
    playerId: string,
    cardId: number
}

interface AddItem {
    type: typeof ADD_ITEM,
    playerId: string,
    item: GardenItem
}

interface RemoveItem {
    type: typeof REMOVE_ITEM,
    playerId: string,
    itemId: number
}

interface SetPointer {
    type: typeof SET_POINTER,
    pointer: string
}

interface ThrowToStreet {
    type: typeof THROW_TO_STREET,
    item: GardenItem
}

interface PickFromStreet {
    type: typeof PICK_FROM_STREET,
    itemId: number
}

interface StartNewAction {
    type: typeof START_NEW_ACTION
}

interface StartInsert {
    type: typeof START_INSERT,
    card: Card,
    callback: Function
}

interface StartAttack {
    type: typeof START_ATTACK,
    card: Card,
    callback: Function
}

interface FinishAction {
    type: typeof FINISH_ACTION
}

interface Wait {
    type: typeof WAIT
}

export type MasterAction = StartGame | DrawCardsFor | PlayCard | PlaceItem | Steal;
export type DeckAction = DrawCards;
export type PlayerAction = AddCards | RemoveCard | AddItem | RemoveItem;
export type PointerAction = SetPointer;
export type StreetAction = ThrowToStreet | PickFromStreet;
export type TurnAction = StartNewAction | StartInsert | StartAttack | FinishAction | Wait;
export type GameAction = MasterAction | DeckAction | PlayerAction | PointerAction | StreetAction | TurnAction;