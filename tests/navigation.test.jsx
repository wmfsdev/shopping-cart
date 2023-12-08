import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Navigation from '../src/components/navigation';

describe('Navigation component', () => {

    it('renders navigation component', () => {
        const container = render(<Navigation />)
        expect(container).toMatchSnapshot()
    })

    it('renders three navigation elements', () => {
        render(<Navigation />);
        
        const listElement = screen.getByRole('list');
        const listItems = screen.getAllByRole('listitem')

        expect(listElement).toBeInTheDocument();
        expect(listElement).toHaveClass('nav-list');
        expect(listItems.length).toEqual(3);
      
    });

    it('renders "home", "store" and "cart" in nav bar', () => {
        render(<Navigation />);

        expect(screen.getByRole('list').textContent).toMatch(/home/i)
        expect(screen.getByRole('list').textContent).toMatch(/store/i)
        expect(screen.getByRole('list').textContent).toMatch(/cart/i)
    })
  });