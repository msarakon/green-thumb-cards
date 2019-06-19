import { GardenItem } from './card';

export class StreetState {
    top: GardenItem[];
    center: GardenItem[];
    bottom: GardenItem[];
    constructor() {
        this.top = [];
        this.center = [];
        this.bottom = [];
    }
}