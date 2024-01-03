
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import items from './mockData'
import { userEvent } from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routesConfig } from '../src/Router';


const fetchMock = vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(items) }))


describe('Purchase functionality', () => {

    const user = userEvent.setup()

    beforeEach( async() => {
        const router = createMemoryRouter(routesConfig, {initialEntries: ["/", "/storefront", "/products", "/cart"]})
        render(<RouterProvider router={router} />)

        await user.click(screen.getByRole('link', {name: /store/i}))
      })

    it('renders null when cart empty', async () => {
        const cartQuantity = await screen.findByTestId('cart-quantity')
        screen.debug(cartQuantity)
        expect(cartQuantity.nodeValue).toBeNull()
    })

    it('renders (1) purchase', async () => {
        const button = await screen.findAllByRole('button')
        const input = await screen.findAllByRole('spinbutton')

        await userEvent.type(input[0], "1")
        await user.click(button[0])

        const cartQuantity = await screen.findByTestId('cart-quantity')
        expect(cartQuantity.textContent).toEqual("1")
    })

    it('renders (4) purchases, same item', async () => {
        const button = await screen.findAllByRole('button')
        const input = await screen.findAllByRole('spinbutton')

        await userEvent.type(input[0], "4")
        await user.click(button[0])

        const cartQuantity = await screen.findByTestId('cart-quantity')
        expect(cartQuantity.textContent).toEqual("4")
    })

    it('renders (6) purchases, different items', async () => {
        const button = await screen.findAllByRole('button')
        const input = await screen.findAllByRole('spinbutton')

        await userEvent.type(input[0], "1")
        await userEvent.type(input[1], "2")
        await userEvent.type(input[2], "3")
        await user.click(button[0])
        await user.click(button[1])
        await user.click(button[2])

        const cartQuantity = await screen.findByTestId('cart-quantity')
        expect(cartQuantity.textContent).toEqual("6")
    })

    it('renders "additional" purchases (1 + 2), same item', async () => {
        const button = await screen.findAllByRole('button')
        const input = await screen.findAllByRole('spinbutton')

        await userEvent.type(input[0], "1")
        await user.click(button[0])
        await userEvent.type(input[0], "{backspace}")
        await userEvent.type(input[0], "2")
        await user.click(button[0])

        const cartQuantity = await screen.findByTestId('cart-quantity')
        expect(cartQuantity.textContent).toEqual("3")
    })
})

