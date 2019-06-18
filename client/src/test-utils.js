const mockState = {
    deck: [],
    players: {
        bunny1: { name: 'Bunny 1', hand: [], garden: [] },
        bunny2: { name: 'Bunny 2', hand: [], garden: [] },
        bunny3: { name: 'Bunny 3', hand: [], garden: [] },
        bunny4: { name: 'Bunny 4', hand: [], garden: [] }
    },
    street: { top: [], center: [], bottom: [] },
    turn: { mode: 'start_game', callback: () => {} },
    pointer: null
};

const mockMousedown = {
    target: { getBoundingClientRect: () => { return { x: 100, y: 300, height: 400, width: 400 }; } },
    clientX: 550,
    clientY: 500
};

const mockPlants = [
    { id: 1, category: 'plant', title: 'Foobar', name: 'foobar' },
    { id: 2, category: 'plant', title: 'Fizzbuzz', name: 'fizzbuzz' },
    { id: 3, category: 'plant', title: 'Lorem', name: 'lorem' },
    { id: 4, category: 'plant', title: 'Ipsum', name: 'ipsum' }
];

const mockAttacks = [
    { id: 10, category: 'attack', title: 'Attac', name: 'attac' }
];

const mockDefenders = [
    { id: 100, category: 'defense', title: 'Mothra', name: 'mothra', protectsFrom: ['godzilla'] },
    { id: 101, category: 'defense', title: 'Defend', name: 'defend', protectsFrom: ['attac'] }
];

const mockDisasters = [
    { id: 1000, category: 'disaster', title: 'Godzilla', name: 'godzilla', affectsAll: true },
    { id: 1001, category: 'disaster', title: 'Stepping on Lego', name: 'stepping_on_lego' }
];

const mockSpecials = [
    { id: 10000, category: 'special', title: 'Pikachu', name: 'pikachu' }
];

const mockEnvironments = [
    { id: 100000, category: 'environment', title: 'Sofa', name: 'sofa' }
];

export { mockState, mockMousedown, mockPlants, mockAttacks, mockDefenders, mockDisasters, mockSpecials, mockEnvironments };