import React from 'react';
import { Provider } from 'react-redux';
import { render, act, cleanup } from 'react-testing-library';
import store from '../store';
import App from './App';

afterEach(cleanup);

describe('App', () => {

    it('should pass a placeholder test', () => {
        let content;
        act(() => { content = render(<Provider store={store}><App /></Provider>); });
        expect(content.container.querySelectorAll('div').length).toBe(1);
    });

});