const imagePath = (name: string) => {
    try {
        return require('../assets/cards/' + name + '.png');
    } catch (ex) {
        return require('../assets/cards/placeholder.png');
    }
};

export { imagePath };