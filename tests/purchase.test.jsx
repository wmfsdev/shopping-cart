
import { describe, it, expect, vi } from 'vitest';
import { render, screen, beforeEach } from '@testing-library/react';
import items from './mockData'
import Products from '../src/components/products';
import { userEvent } from '@testing-library/user-event';

import Purchase from '../src/components/purchase';


vi.mock("react-router-dom", async () => {
    let actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useOutletContext: vi.fn().mockReturnValue([[], test()]),
    };
});

// vi.mock('../src/components/purchase', async () => {
//     let actual = await vi.importActual('../src/components/purchase')
//     console.log(actual)
//     return {
//         ...actual,
//         test: vi.fn(() => console.log("different"))
//     }
// })

it('test', async () => {

   // const onSubmit = vi.fn(e => e.preventDefault());
    const test = vi
        .spyOn(window, 'test')
        .mockReturnValue(() => console.log("spy"))

    console.log(test)
    const user = userEvent.setup()
    render(<Purchase />)
   
    const button = await screen.findAllByRole('button')
   
 //   screen.debug(button)
    await user.click(button[0])
    
expect(test).toHaveBeenCalled()
   

})