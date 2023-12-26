
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
 import items from './mockData'
import Products from '../src/components/products';

async function withFetch() {
    try {
        const res = await fetch('https://fakestoreapi.com/products?limit=5');
        const json = await res.json();
        return json;
    } catch(e) {
        console.log(e)
        return e
    }
}


const fetchMock = vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(items) }))

    describe('withFetch, Promise.resolve', () => {
        it('resolves', async () => {
            const json = await withFetch();
            
            expect(fetchMock.getMockName()).toEqual('fetch')
            expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
            expect(Array.isArray(json)).toEqual(true);
            expect(json.length).toEqual(5);
        });

        it('renders five (5) items', async () => {
            await withFetch() 
        
            expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
            expect(fetchMock.getMockName()).toEqual('fetch')
    
            render(<Products />);
            
            const headers = await screen.findAllByRole('heading', {level: 2})
            const images = await screen.findAllByRole('img')

            expect(headers).toHaveLength(5) 
            expect(images).toHaveLength(5) 

            screen.debug()
        })

        it('renders specific item', async () => {
            await withFetch() 
        
            expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
            expect(fetchMock.getMockName()).toEqual('fetch')
    
            render(<Products />);
            
            expect(await screen.findByText('Mens Cotton Jacket')).toBeInTheDocument();
        })  
    });


    describe('withFetch, Promise.reject', () => {

        beforeEach(() => {
            fetchMock.mockImplementation(() => Promise.reject({ message: 'API is down'}))
        }) 

            it('rejects', async () => {
                const error = await withFetch()
                expect(fetchMock.getMockName()).toEqual('fetch')
                expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
                expect(error.message).toBe('API is down')
            });

            it('error message is shown', async () => {
                await withFetch() 
        
                expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
                expect(fetchMock.getMockName()).toEqual('fetch')
        
                render(<Products />);
                        
                expect(await screen.findByText('API is down')).toBeInTheDocument();
            });
    });