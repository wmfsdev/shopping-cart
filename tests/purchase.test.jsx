
import { describe, it, expect, vi } from 'vitest';
import { render, screen, beforeEach } from '@testing-library/react';
import items from './mockData'
import Products from '../src/components/products';
import { userEvent } from '@testing-library/user-event';

import Purchase from '../src/components/purchase';


// vi.mock("react-router-dom", async () => {
//     let actual = await vi.importActual("react-router-dom");
//     return {
//         ...actual,
//         useOutletContext: vi.fn().mockReturnValue([[], test()]),
//     };
// });


it('test', async () => {

    const title= "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    const img = "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    const price = "109.95" 
    const id = 1
    
    const user = userEvent.setup()
    render(<Purchase title={title} img={img} price={price} id={id}/>)
    
    const button = await screen.findAllByRole('button')
    const input = await screen.findAllByRole('spinbutton')

   
    await userEvent.type(input[0], "1")
    await user.click(button[0])

    screen.debug()
 
})