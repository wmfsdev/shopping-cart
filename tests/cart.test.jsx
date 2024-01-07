
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

        await user.click(screen.getByRole('link', {name: /store/i}))
    })

    it('renders "Your Cart Is Empty" when cart empty', async() => {

        await user.click(screen.getByRole('link', {name: /cart/i}))
        const cart = await screen.findByRole('heading', {level: 2})
     //   screen.debug(cart)

        expect(cart.textContent).toBe("Your Cart Is Empty")
    })

    describe('renders single "cart item"', async() => {

        it('renders sub-elements of "cart item"', async() => {
            const button = await screen.findAllByRole('button')
            const input = await screen.findAllByRole('spinbutton')
    
            await userEvent.type(input[0], "1")
            await user.click(button[0])
            await user.click(screen.getByRole('link', {name: /cart/i}))
    
            const purchaseInfo = await screen.findByRole('form')
            // purchaseInfo.children are child elements of the form:
            // p, input, button, button, div
            expect(purchaseInfo.children).toHaveLength(5)
        })
        
        it('renders title for item purchase', async() => {
            const button = await screen.findAllByRole('button')
            const input = await screen.findAllByRole('spinbutton')
    
            await userEvent.type(input[0], "1")
            await user.click(button[0])
            await user.click(screen.getByRole('link', {name: /cart/i}))
    
            const title = await screen.findByText(/TEST - Foldsack No. 1 Backpack, Fits 15 Laptops/i)
            expect(title).toBeInTheDocument()
        })
    

        it('renders total price for item purchase of quantity 3', async() => {
            const button = await screen.findAllByRole('button')
            const input = await screen.findAllByRole('spinbutton')
    
            await userEvent.type(input[0], "3")
            await user.click(button[0])
            await user.click(screen.getByRole('link', {name: /cart/i}))
            
            const price = await screen.findByText(/£329.85/i)
            expect(price).toBeInTheDocument()
        })

       
    })

    describe('renders multiple "cart items"', async() => {

        it('')

    }) 
})