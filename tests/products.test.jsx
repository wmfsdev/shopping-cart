
import { describe, it, expect, vi } from 'vitest';
import { render, screen, beforeEach } from '@testing-library/react';
import items from './mockData'
import Products from '../src/components/products';
import { userEvent } from '@testing-library/user-event';


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

vi.mock("react-router-dom", async () => {
    let actual = await vi.importActual("react-router-dom");
    console.log(actual)
    return {
        ...actual,
        useOutletContext: vi.fn().mockReturnValue([[], test()]),
    };
});

const fetchMock = vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(items) }))


    describe('mockOutlet', async () => {

        it('renders Outlet (5 forms)', async() => {
            render(<Products />)
            const forms = await screen.findAllByRole('form')
            expect(forms).toHaveLength(5)
        })


        it('add Item to Cart', async () => {
            // doesn't work
            const onSubmit = vi.fn();
            const user = userEvent.setup()
            render(<Products />)

            const button = await screen.findAllByRole('button')
           
            await user.click(button[0])

            expect(onSubmit).toHaveBeenCalled()
        })

    })

    describe('withFetch, Promise.resolve', () => {

        it('resolves', async () => {
            const json = await withFetch();
            
            expect(fetchMock.getMockName()).toEqual('fetch')
            expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
            expect(Array.isArray(json)).toEqual(true);
            expect(json.length).toEqual(5);
        });


        // it('renders five (5) items', async () => {
        //     await withFetch() 
        
        //     expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
        //     expect(fetchMock.getMockName()).toEqual('fetch')
    
        //     render(<Products />);
    
        //     const headers = await screen.findAllByRole('heading', {level: 2})
        //     const images = await screen.findAllByRole('img')

        //     expect(headers).toHaveLength(5) 
        //     expect(images).toHaveLength(5) 

        // })

        // it('renders specific item', async () => {
        //     await withFetch() 
         
        //     expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
        //     expect(fetchMock.getMockName()).toEqual('fetch')
     
        //     render(<Products />)
           
        //     const userName = await screen.findByText('Mens Cotton Jacket');
        //     expect(userName).toBeInTheDocument();
            
        //     screen.debug()
        // })  
    });


    // describe('withFetch, Promise.reject', () => {

    //     beforeEach(() => {
    //         fetchMock.mockImplementation(() => Promise.reject({ message: 'API is down'}))
    //     }) 

    //         it('rejects', async () => {
    //             const error = await withFetch()
    //             expect(fetchMock.getMockName()).toEqual('fetch')
    //             expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
    //             expect(error.message).toBe('API is down')
    //         });

    //         it('error message is shown', async () => {
    //             await withFetch() 
        
    //             expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
    //             expect(fetchMock.getMockName()).toEqual('fetch')
        
    //             render(<Products />);      
    //             expect(await screen.findByText('API is down')).toBeInTheDocument();
    //     });
    // });