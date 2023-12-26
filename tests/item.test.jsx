import Item from "../src/components/item";

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import items from './mockData'


describe('renders Item', () => {

    it('renders', () => {
        render(
            <Item 
                title={items[0].title}
                img={items[0].img}
                price={items[0].price}
            />
        )
        // img
        expect(screen.queryByRole('img')).toBeInTheDocument()

        // header - product title
        expect(screen.queryByRole('heading', { name: /Fjallraven/i })).toBeInTheDocument()

        // input field
        expect(screen.queryByPlaceholderText(/0/i)).toBeInTheDocument()

        // add button
        expect(screen.queryByRole('button')).toBeInTheDocument()
        

      //  expect(screen.queryByRole('heading')).toBeInTheDocument()

        screen.debug()
    })

})