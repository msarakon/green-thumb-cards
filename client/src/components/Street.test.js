import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import Street from './Street';

afterEach(cleanup);

describe('Street', () => {

    const mockStore = configureMockStore([thunk]);

    it('should handle picking an item from street', () => {
        const state = {
            turn: { mode: 'select_card' },
            street: { top: [], center: [{ id: 1 }], bottom: [] }
        };
        const store = mockStore(() => state);

        const component = render(<Provider store={store}><Street streetId={'center'} /></Provider>);
        fireEvent.click(component.container.querySelector('.garden-item'));
    });

});