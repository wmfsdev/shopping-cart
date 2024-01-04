
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';

import { routesConfig } from '../src/Router';
import App from '../src/App';
import userEvent from '@testing-library/user-event';


describe('App', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
      );
  });
});

describe('Navigation Router', () => {

  beforeEach(() => {
    const router = createMemoryRouter(routesConfig, {initialEntries: ["/", "/storefront", "/products", "/cart"]})
    render(<RouterProvider router={router} />)
  })

  it('renders storefront', async() => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('link', {name: /home/i}))
    expect(screen.getByRole("heading", {name: /store front/i}))
  })

  it('renders products page', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('link', {name: /store/i}))
    expect(screen.getByRole("heading", {name: /products!!/i}))
  })

  it('renders shopping cart', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('link', {name: /cart/i}))
    expect(screen.getByRole("heading", {name: /cart/i}))
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