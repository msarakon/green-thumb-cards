import React from 'react';
import { shallow } from 'enzyme';
import { GameBoard } from './GameBoard';

describe('GameBoard', () => {

    const props = {
        turn: { mode: 'start_game', callback: () => {} },
        deck: [
            { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },
            { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }
        ],
        players: {
            bunny1: { name: 'Bunny 1', hand: [], garden: [] },
            bunny2: { name: 'Bunny 2', hand: [], garden: [] },
            bunny3: { name: 'Bunny 3', hand: [], garden: [] },
            bunny4: { name: 'Bunny 4', hand: [], garden: [] }
        },
        addItem: () => {},
        pickCards: (param, callback) => callback(props),
        addCards: (param1, param2, callback) => callback(props),
        startPickCard: () => {},
        startSelectAction: () => {},
        removeCard: () => props.players.bunny1.hand = [],
        removeItem: () => {},
        throwToStreet: () => {}
    };

    it('should handle starting the game', () => {
        const privProps = {
            ...props,
            pickCards: jest.fn()
        };
        shallow(<GameBoard {...privProps} />);
        const spy = jest.spyOn(privProps, 'pickCards');
        expect(spy).toHaveBeenCalledTimes(4);
    });

    it('should handle starting the game with disasters', () => {
        const privProps = {
            ...props,
            throwToStreet: jest.fn()
        };
        privProps.players.bunny1.hand = [{ id: 1, title: 'Disaster', category: 'disaster' }];
        privProps.players.bunny2.garden = [{ id: 2, title: 'Fizzbuzz', category: 'plant' }];
        shallow(<GameBoard {...privProps} />);
        const spy = jest.spyOn(privProps, 'throwToStreet');
        expect(spy).toHaveBeenCalledWith({ id: 2, title: 'Fizzbuzz', category: 'plant' });
    });

    it('should handle placing an item', () => {
        const privProps = {
            ...props,
            turn: {
                mode: 'insert',
                card: { id: 1, category: 'plant', title: 'Foobar' },
                callback: () => {}
            },
            pointer: 'insertable',
            addItem: jest.fn()
        };

        const wrapper = shallow(<GameBoard {...privProps} />);
        wrapper.find('.gameboard').simulate('mousedown', {
            target: {
                getBoundingClientRect: () => {
                    return { x: 100, y: 300, height: 400, width: 400 };
                }
            },
            clientX: 550,
            clientY: 500
        });

        const spy = jest.spyOn(privProps, 'addItem');
        expect(spy).toHaveBeenCalledWith('bunny1', {
            id: 1,
            category: 'plant',
            title: 'Foobar',
            left: 107,
            top: 45
        });
    });

    it('should handle an AI turn', () => {
        const privProps = {
            ...props,
            turn: {
                mode: 'insert',
                card: { id: 1, category: 'plant', title: 'Foobar' },
                callback: () => {}
            },
            pointer: 'insertable'
        };
        privProps.players.bunny2.hand = [{ id: 2, category: 'plant', title: 'Fizzbuzz' }];

        const wrapper = shallow(<GameBoard {...privProps} />);
        wrapper.find('.gameboard').simulate('mousedown', {
            target: {
                getBoundingClientRect: () => {
                    return { x: 100, y: 300, height: 400, width: 400 };
                }
            }
        });

    });

});