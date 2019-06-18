import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, cleanup, fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { masterMiddleware } from '../middlewares/masterMiddleware';
import Street from './Street';
import { mockState, mockPlants } from '../test-utils';

afterEach(cleanup);

describe('Street', () => {

    const mockStore = configureMockStore([thunk, masterMiddleware]);

    it('should handle picking an item from street', () => {
        const state = {
            ...mockState,
            turn: { ...mockState.turn, mode: 'select_action' },
            street: { top: [], center: [mockPlants[0]], bottom: [] }
        };
        const store = mockStore(() => state);

        const component = render(<Provider store={store}><Street streetId={'center'} /></Provider>);
        fireEvent.click(component.container.querySelector('.garden-item'));

        expect(store.getActions()[0].type).toEqual('START_INSERT');
        expect(store.getActions()[1]).toEqual( { type: 'PICK_FROM_STREET', data: mockPlants[0].id });
    });

});