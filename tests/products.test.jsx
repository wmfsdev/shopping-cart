
import { describe, it, expect, vi } from 'vitest';
import item from './mockData'


async function withFetch() {
	const res = await fetch('https://fakestoreapi.com/products?limit=5');
	const json = await res.json();

	return json;
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