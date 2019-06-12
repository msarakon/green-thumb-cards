import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from '@testing-library/react';
import store from '../store';
import Neighborhood from './Neighborhood';

afterEach(cleanup);

describe('Garden', () => {

    it('should handle mouse enter and leave events', () => {
        const component = render(<Provider store={store}><Neighborhood steal={() => {}} /></Provider>);
        fireEvent.mouseEnter(component.container.querySelector('.garden-container'));
        fireEvent.mouseLeave(component.container.querySelector('.garden-container'));
    });

});