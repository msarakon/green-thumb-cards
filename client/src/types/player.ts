import { Card, GardenItem } from './card';

export class Player {
    name: String;
    hand: Array<Card>;
    garden: Array<GardenItem>;
    points: Number;
    constructor(name: String) {
        this.name = name;
        this.hand = [];
        this.garden = [];
        this.points = 0;
    }
}

export interface PlayerState {
    bunny1: Player
    bunny2: Player
    bunny3: Player
    bunny4: Player
}