
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import items from './mockData'
import { userEvent } from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routesConfig } from '../src/Router';


const fetchMock = vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(items) }))


describe('Cart functionality', async() => {
    
    const user = userEvent.setup()

    beforeEach( async() => {
        const router = createMemoryRouter(routesConfig, {initialEntries: ["/", "/storefront", "/products", "/cart"]})
        render(<RouterProvider router={router} />)

        await user.click(screen.getByRole('link', {name: /cart/i}))
    })

    it('renders "Your Cart Is Empty" when cart empty', async() => {

        const cart = await screen.findByRole('heading', {level: 2})
        screen.debug(cart)

        expect(cart.textContent).toBe("Your Cart Is Empty")
    })

})