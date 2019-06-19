import { Card } from './card';

export class TurnState {
    mode?: string;
    card?: Card;
    callback?: Function;
    actions: number;
    constructor() {
        this.actions = 0;
    }
}