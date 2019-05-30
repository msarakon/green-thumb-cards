import React from 'react';
import { render, act, cleanup } from 'react-testing-library';
import App from './App';

afterEach(cleanup);

describe('App', () => {

    it('should pass a placeholder test', () => {
        let content;
        act(() => { content = render(<App />); });
        expect(content.container.querySelectorAll('div').length).toBe(1);
    });

});