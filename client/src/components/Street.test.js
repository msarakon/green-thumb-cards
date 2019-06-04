import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import Street from './Street';

afterEach(cleanup);

describe('Street', () => {

    const mockStore = configureMockStore([thunk]);

    it('should render the street', () => {
        const state = {
            turn: { mode: 'insert' },
            street: { top: [{ id: 1 }, { id: 2 }], center: [{ id: 3 }], bottom: [] }
        };
        const store = mockStore(() => state);
        render(<Provider store={store}><Street streetId={'center'} /></Provider>);
    });

    it('should handle picking an item from street', () => {
        const state = {
            turn: { mode: 'select_action' },
            street: { top: [], center: [{ id: 1 }], bottom: [] }
        };
        const store = mockStore(() => state);

        const component = render(<Provider store={store}><Street streetId={'center'} /></Provider>);
        fireEvent.click(component.container.querySelector('.garden-item'));
    });

});