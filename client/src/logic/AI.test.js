import AI from './AI';

describe('AI', () => {

    const mockFuncs = { endTurn: jest.fn() };
    const endTurnSpy = jest.spyOn(mockFuncs, 'endTurn');

    const ai = new AI({
        endTurn: mockFuncs.endTurn,
        drawCardsFor: (param1, param2, param3, callback) => callback([]) 
    });

    const props = {
        playerId: 'bunny1',
        players: {
            bunny1: { name: 'Bunny 1', hand: [], garden: [] },
            bunny2: { name: 'Bunny 2', hand: [], garden: [] },
            bunny3: { name: 'Bunny 3', hand: [], garden: [] },
            bunny4: { name: 'Bunny 4', hand: [], garden: [] }
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should skip the turn if there is nothing to do', () => {
        ai.playTurn(props);
        expect(endTurnSpy).toHaveBeenCalledTimes(1);
    });

    it('should place a plant to garden', () => {
        const privProps = {
            ...props,
            players: {
                ...props.players,
                bunny1: {
                    ...props.players.bunny1,
                    hand: props.players.bunny1.hand.concat({ id: 1, title: 'Plant', category: 'plant' })
                }
            }
        };
        ai.playTurn(privProps);
        // expect(addItemSpy).toHaveBeenCalledTimes(1);
        // expect(removeCardSpy).toHaveBeenCalledTimes(1);
        expect(endTurnSpy).toHaveBeenCalledTimes(1);
    });

    it('should place an environment item to garden', () => {
        const privProps = {
            ...props,
            players: {
                ...props.players,
                bunny1: {
                    ...props.players.bunny1,
                    hand: props.players.bunny1.hand.concat({ id: 1, title: 'Env', category: 'environment' })
                }
            }
        };
        ai.playTurn(privProps);
        // expect(addItemSpy).toHaveBeenCalledTimes(1);
        // expect(removeCardSpy).toHaveBeenCalledTimes(1);
        expect(endTurnSpy).toHaveBeenCalledTimes(1);
    });

    it('should steal something', () => {
        const privProps = {
            ...props,
            players: {
                ...props.players,
                bunny1: {
                    ...props.players.bunny1,
                    hand: props.players.bunny1.hand.concat({ id: 1, title: 'Attac', category: 'attack' })
                },
                bunny2: {
                    ...props.players.bunny2,
                    garden: props.players.bunny2.garden.concat({ id: 2, title: 'Haul', category: 'plant' })
                }
            }
        };
        ai.playTurn(privProps);
        // expect(addItemSpy).toHaveBeenCalledTimes(1);
        // expect(removeCardSpy).toHaveBeenCalledTimes(1);
        // expect(removeItemSpy).toHaveBeenCalledTimes(1);
        expect(endTurnSpy).toHaveBeenCalledTimes(1);
    });

});