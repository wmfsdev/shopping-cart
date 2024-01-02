
import { describe, it, expect, vi } from 'vitest';
import { render, screen, beforeEach } from '@testing-library/react';
import items from './mockData'
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routesConfig } from '../src/Router';


// async function withFetch() {
//     try {
//         const res = await fetch('https://fakestoreapi.com/products?limit=5');
//         const json = await res.json();
//         return json;
//     } catch(e) {
//         console.log(e)
//         return e
//     }
// }

const fetchMock = vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(items) }))


describe('Purchase functionality', () => {

    it('renders null when cart empty', async () => {
        const router = createMemoryRouter(routesConfig, {initialEntries: ["/", "/storefront", "/products", "/cart"]})
        render(<RouterProvider router={router} />)

        const cartQuantity = await screen.findByTestId('cart-quantity')
        screen.debug(cartQuantity)
        expect(cartQuantity.nodeValue).toBeNull()
    })

    it('renders purchase quantity (1)', async () => {

        const user = userEvent.setup()
        
        const router = createMemoryRouter(routesConfig, {initialEntries: ["/", "/storefront", "/products", "/cart"]})
        render(<RouterProvider router={router} />)
        await user.click(screen.getByRole('link', {name: /store/i}))

        const button = await screen.findAllByRole('button')
        const input = await screen.findAllByRole('spinbutton')

        await userEvent.type(input[0], "1")
        await user.click(button[0])

        const cartQuantity = await screen.findByTestId('cart-quantity')
        expect(cartQuantity.textContent).toEqual("1")
    })

    it('renders multiple purchases (4)', async () => {

        const user = userEvent.setup()
        
        const router = createMemoryRouter(routesConfig, {initialEntries: ["/", "/storefront", "/products", "/cart"]})
        render(<RouterProvider router={router} />)
        await user.click(screen.getByRole('link', {name: /store/i}))

        const button = await screen.findAllByRole('button')
        const input = await screen.findAllByRole('spinbutton')

        await userEvent.type(input[0], "4")
        await user.click(button[0])

        const cartQuantity = await screen.findByTestId('cart-quantity')
        expect(cartQuantity.textContent).toEqual("4")
    })

})

