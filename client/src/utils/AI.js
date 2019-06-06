const playTurn = (props) => {
    const playerName = props.players[props.playerId].name;
    const playableCards = props.players[props.playerId].hand
        .filter(card => card.category === 'plant');
    const card = playableCards[Math.floor(Math.random() * playableCards.length)];
    if (card) {
        console.log(`${playerName} plays a "${card.title}"`);
        props.addItem(props.playerId, {
            ...card,
            top: Math.floor(Math.random() * 90),
            left: Math.floor(Math.random() * 90)
        });
        props.removeCard(props.playerId, card.id);
    } else {
        console.log(`${playerName} skips their turn`);
    }
    props.endTurn(props.playerId);
};

export { playTurn };