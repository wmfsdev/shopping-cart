
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import item from './mockData'
import Products from '../src/components/products';

async function withFetch() {
    try {
	const res = await fetch('https://fakestoreapi.com/products?limit=5');
	const json = await res.json();
    return json;
    } catch(e) {
        throw new Error(e)
    }
}

const fetchMock = vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(item) }))

    describe('withFetch', () => {
        it('works', async () => {
            const json = await withFetch();
            expect(fetchMock.getMockName()).toEqual('fetch')
            expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
            
            expect(Array.isArray(json)).toEqual(true);
            expect(json.length).toEqual(5);
        });

    });

    describe('withFetch', () => {

        beforeEach(() => {
            fetchMock.mockImplementationOnce(() => Promise.reject({ message: 'API is down' }))
        }) 

        it('throws error', async () => {
            expect(fetchMock.getMockName()).toEqual('fetch')
            expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');

            await expect(withFetch()).rejects.toThrow()
        });

        it('error message is shown', async () => {

        // expect(error).toHaveValue('API is down')
        //     const error = await withFetch();
        //     expect(error).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5')

            render(<Products />);

            await expect() screen.getByText('API is down');
        
            const errorMessage = await screen.getByText('API is down');
            expect(errorMessage).toBeInTheDocument();

        });

    });
   