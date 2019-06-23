export interface Card {
    id: number,
    title: string,
    name: string,
    category: string,
    affectsAll?: boolean,
    activelyResists?: string[]
    passivelyResists?: string[]
}

export interface GardenItem extends Card {
    zIndex?: number,
    bottom?: number,
    left?: number
}