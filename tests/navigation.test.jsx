
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import App from '../src/App';

describe('App', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
      );

    screen.debug();

    // check if App components renders headline
  });
});

 describe('Navigation component', () => {

    it('renders navigation component', () => {
        const container = render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
        )
        expect(container).toMatchSnapshot()
    })

    it('renders three navigation elements', () => {
        render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
        );
        
        const listElement = screen.getByRole('list');
        const listItems = screen.getAllByRole('listitem')

        expect(listElement).toBeInTheDocument();
        expect(listElement).toHaveClass('nav-list');
        expect(listItems.length).toEqual(3);
    });

    it('renders "home", "store" and "cart" in nav bar', () => {
        render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
        );

        expect(screen.getByRole('list').textContent).toMatch(/home/i)
        expect(screen.getByRole('list').textContent).toMatch(/store/i)
        expect(screen.getByRole('list').textContent).toMatch(/cart/i)
    })
   });