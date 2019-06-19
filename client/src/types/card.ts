export interface Card {
    id: number,
    title: string,
    name: string,
    category: string,
    affectsAll?: boolean,
    protectsFrom?: string[]
};

export interface GardenItem extends Card {
    zIndex?: number,
    top?: number,
    left?: number
};