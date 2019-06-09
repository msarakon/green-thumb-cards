import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from '@testing-library/react';
import store from '../store';
import App from './App';

afterEach(cleanup);

describe('App', () => {

    it('should start the game when clicking the button', () => {
        const component = render(<Provider store={store}><App /></Provider>);
        expect(component.container.querySelector('.gameboard-container')).toBeNull();
        const button = component.getByText('start');
        fireEvent.click(button);
        expect(component.container.querySelector('.gameboard-container')).not.toBeNull();
    });

});