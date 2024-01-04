import Item from "../src/components/item";

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import items from './mockData'


describe('renders Item', () => {

    it('does nothing', () => {
        
    })

    // it('renders', () => {
    //     render(
    //         <Item 
    //             title={items[0].title}
    //             img={items[0].img}
    //             price={items[0].price}
    //         />
    //     )
    //     expect(screen.queryByRole('img')).toBeInTheDocument()
    //     expect(screen.queryByRole('heading', { name: /Fjallraven/i })).toBeInTheDocument()
    //     expect(screen.queryByPlaceholderText(/0/i)).toBeInTheDocument()
    //     expect(screen.queryByRole('button')).toBeInTheDocument()
    //     screen.debug()
    // })

    // it('consists of 4 single, unique elements', () => {
    //     render(
    //         <Item 
    //             title={items[0].title}
    //             img={items[0].img}
    //             price={items[0].price}
    //         />
    //     )
    //     expect(screen.queryAllByRole('img')).toHaveLength(1)
    //     expect(screen.queryAllByRole('heading')).toHaveLength(1)
    //     expect(screen.queryAllByPlaceholderText(/0/i)).toHaveLength(1)
    //     expect(screen.queryAllByRole('button')).toHaveLength(1)
    // })

})