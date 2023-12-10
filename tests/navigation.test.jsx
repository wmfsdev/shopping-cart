
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import App from '../src/App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
      );
    screen.debug();
  });
});

describe('Navigation Router', () => {
  it('renders routes', async() => {
    render(<App />, {wrapper: BrowserRouter})
    const user = userEvent.setup()

    await user.click(screen.getByRole('link', {name: /store/i}))
    expect(screen.getByText(/products/i))
  })
})


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

        expect(screen.getByRole('link', {name: /home/i}))
        expect(screen.getByRole('link', {name: /store/i}))
        expect(screen.getByRole('link', {name: /cart/i}))
    })
   });