const playTurn = (props) => {
    const playerName = props.players[props.playerId].name;
    const playableCats = ['plant', 'environment'];
    if (plantsInGarden(props.players)) playableCats.push('attack');
    const playableCards = props.players[props.playerId].hand
        .filter(card => playableCats.includes(card.category));
    const card = playableCards[Math.floor(Math.random() * playableCards.length)];
    if (card) {
        console.log(`${playerName} plays a "${card.title}"`);
        if (card.category === 'plant' || card.category === 'environment') {
            placeItem(props.playerId, props.addItem, card);
        } else if (card.category === 'attack') {
            const haul = getSomethingToSteal(props.players, props.playerId);
            console.log(`${playerName} steals a "${haul.item.title}" from ${haul.victimName}`);
            props.removeItem(haul.victimId, haul.item.id);
            placeItem(props.playerId, props.addItem, haul.item);
        }
        props.removeCard(props.playerId, card.id);
    } else {
        console.log(`${playerName} skips their turn`);
    }
    props.endTurn(props.playerId);
};

const placeItem = (playerId, addItem, item) => {
    addItem(playerId, {
        ...item,
        top: Math.floor(Math.random() * 90),
        left: Math.floor(Math.random() * 90)
    });
};

const getSomethingToSteal = (players, playerId) => {
    const possibleVictims = Object.entries(players).filter(([id, player]) =>
        id !== playerId && player.garden.filter(item => item.category === 'plant').length > 0
    );
    const [ victimId, victim ] = possibleVictims[Math.floor(Math.random() * possibleVictims.length)];
    const possibleItems = victim.garden.filter(item => item.category === 'plant');
    return {
        victimId,
        victimName: victim.name,
        item: possibleItems[Math.floor(Math.random() * possibleItems.length)]
    };
};

const plantsInGarden = (players) => {
    return Object.values(players).some(player =>
        player.garden.some(item => item.category === 'plant'));
};

export { playTurn };