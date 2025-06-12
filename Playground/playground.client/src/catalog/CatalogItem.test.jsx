import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CatalogItem from './CatalogItem';

describe('CatalogItem Component', () => {
    const mockProduct = {
        id: 1,
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Test Category',
    };

    const mockOnToggleWishlist = jest.fn();

    it('should render product details correctly', () => {
        const { getByText, getByAltText } = render(
            <CatalogItem
                product={mockProduct}
                isWishlisted={false}
                onToggleWishlist={mockOnToggleWishlist}
            />
        );

        expect(getByText('Test Product')).toBeInTheDocument();
        expect(getByText('Test Description')).toBeInTheDocument();
        expect(getByText('Category: Test Category')).toBeInTheDocument();
        expect(getByText('Price: $100')).toBeInTheDocument();
        expect(getByAltText('Test Product')).toBeInTheDocument();
    });

    it('should display unfilled heart icon when not wishlisted', () => {
        const { getByRole } = render(
            <CatalogItem
                product={mockProduct}
                isWishlisted={false}
                onToggleWishlist={mockOnToggleWishlist}
            />
        );

        const heartIcon = getByRole('button');
        expect(heartIcon).toHaveStyle('color: gray');
    });

    it('should display filled heart icon when wishlisted', () => {
        const { getByRole } = render(
            <CatalogItem
                product={mockProduct}
                isWishlisted={true}
                onToggleWishlist={mockOnToggleWishlist}
            />
        );

        const heartIcon = getByRole('button');
        expect(heartIcon).toHaveStyle('color: red');
    });

    it('should call onToggleWishlist when heart icon is clicked', () => {
        const { getByRole } = render(
            <CatalogItem
                product={mockProduct}
                isWishlisted={false}
                onToggleWishlist={mockOnToggleWishlist}
            />
        );

        const heartIcon = getByRole('button');
        fireEvent.click(heartIcon);

        expect(mockOnToggleWishlist).toHaveBeenCalledWith(mockProduct.id);
    });
});
