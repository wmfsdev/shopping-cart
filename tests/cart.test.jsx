
import { describe, it, expect, vi, beforeEach, expectTypeOf } from 'vitest';
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

        it('renders input field, update button and remove button', async() => {
            const button = await screen.findAllByRole('button')
            const input = await screen.findAllByRole('spinbutton')

            await userEvent.type(input[0], "1")
            await user.click(button[0])
            await user.click(screen.getByRole('link', {name: /cart/i}))

            const inputField = await screen.findByRole('spinbutton')
            const updateButton = await screen.findByRole('button', { name: /update/i })
            const removeButton = await screen.findByRole('button', { name: /remove/i })
            
            expect(inputField).toBeInTheDocument()
            expect(updateButton).toBeInTheDocument()
            expect(removeButton).toBeInTheDocument()
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
        
        it('renders new total cart quantity in navigation upon update', async() => {
            const productAddButton = await screen.findAllByRole('button')
            const productInput = await screen.findAllByRole('spinbutton')
    
            await userEvent.type(productInput[0], "3")
            await user.click(productAddButton[0])
            await user.click(screen.getByRole('link', {name: /cart/i}))

            const cartInput = await screen.findByRole('spinbutton')
            const cartUpdateButton = await screen.findByRole('button', {name: /update/i} )

            await userEvent.type(cartInput, "{backspace}")
            await userEvent.type(cartInput, "3")
            await user.click(cartUpdateButton)

            const updatedQuantity = await screen.findByTestId("cart-quantity")
            expect(updatedQuantity).toHaveTextContent("3")
        })

        it('renders new quantity in items input field upon update', async() => {
            const productAddButton = await screen.findAllByRole('button')
            const productInput = await screen.findAllByRole('spinbutton')
    
            await userEvent.type(productInput[0], "1")
            await user.click(productAddButton[0])
            await user.click(screen.getByRole('link', {name: /cart/i}))

            const cartInput = await screen.findByRole('spinbutton')
            const cartUpdateButton = await screen.findByRole('button', {name: /update/i} )

            await userEvent.type(cartInput, "{backspace}")
            await userEvent.type(cartInput, "3")
            await user.click(cartUpdateButton)
    
            expect(cartInput).toHaveValue(3)
        })
    })


    describe('renders multiple "cart items"', async() => {

        beforeEach( async() => {
            const productAddButton = await screen.findAllByRole('button')
            const productInput = await screen.findAllByRole('spinbutton')
            
            await userEvent.type(productInput[0], "1")
            await user.click(productAddButton[0])
            await userEvent.type(productInput[1], "1")
            await user.click(productAddButton[1])
            await userEvent.type(productInput[2], "1")
            await user.click(productAddButton[2])

            await user.click(screen.getByRole('link', {name: /cart/i}))
        })


        it('renders 3 sets of "cart items"', async() => {
            const purchaseInfo = await screen.findAllByRole('form')
            expect(purchaseInfo).toHaveLength(3)
        })

        it('renders 3 total items in navigation bar', async() => {
            const updatedQuantity = await screen.findByTestId("cart-quantity")
            expect(updatedQuantity).toHaveTextContent("3")
        })

        it('renders updated value for 3 input fields - "cart items" (1 extra each)', async() => {
            const cartInputs = await screen.findAllByRole('spinbutton')
            const cartUpdateButtons = await screen.findAllByRole('button', {name: /update/i} )
     
            await userEvent.type(cartInputs[0], "{backspace}")
            await userEvent.type(cartInputs[0], "2")
            await user.click(cartUpdateButtons[0])

            await userEvent.type(cartInputs[1], "{backspace}")
            await userEvent.type(cartInputs[1], "2")
            await user.click(cartUpdateButtons[1])

            await userEvent.type(cartInputs[2], "{backspace}")
            await userEvent.type(cartInputs[2], "2")
            await user.click(cartUpdateButtons[2])
      
            expect(cartInputs[0]).toHaveValue(2)
            expect(cartInputs[1]).toHaveValue(2)
            expect(cartInputs[2]).toHaveValue(2)
        })

        it.only('removes associated "cart item" from cart and display', async() => {
            const cartUpdateButtons = await screen.findAllByRole('button', {name: /remove/i} )

            await user.click(cartUpdateButtons[2])

            const cartItem = screen.queryByText(/Mens Cotton Jacket/i)
            expect(cartItem).not.toBeInTheDocument()
        })
    
    }) 
})