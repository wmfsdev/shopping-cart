
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import item from './mockData'
import Products from '../src/components/products';

async function withFetch() {
    try {
        const res = await fetch('https://fakestoreapi.com/products?limit=5');
        const json = await res.json();
        return json;
    } catch(e) {
        return e
    }
}


const fetchMock = vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(item) }))

    describe('withFetch, Promise.resolve', () => {
        it('resolves', async () => {
            const json = await withFetch();
            
            expect(fetchMock.getMockName()).toEqual('fetch')
            expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
            
            expect(Array.isArray(json)).toEqual(true);
            expect(json.length).toEqual(5);
        });

    });

    describe('withFetch, Promise.reject', () => {

        beforeEach(() => {
            fetchMock.mockImplementationOnce(() => Promise.reject({ message: 'API is down' }))
        }) 

            it('rejects', async () => {
                const error = await withFetch()
                expect(fetchMock.getMockName()).toEqual('fetch')
                expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
                expect(error.message).toBe('API is down')
            });

            it('error message is shown', async () => {

                fetchMock.mockImplementation(() => Promise.reject({message: 'API is down'}))
        
                await withFetch() 
        
                expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
                expect(fetchMock.getMockName()).toEqual('fetch')
        
                render(<Products />);
                        
                await waitFor(() => {
                    // screen.debug()
                    expect(screen.getByText('API is down')).toBeInTheDocument();
                })
            });
    });