import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../Search';
import React from 'react';

describe('Search', () => {
    test('renders search input', () => {
        render(<Search onFilter={jest.fn()} />);
        expect(screen.getByPlaceholderText('SEARCH A CHARACTER...')).toBeInTheDocument();
    });

    test('calls onFilter with the correct input value', () => {
        const onFilterMock = jest.fn();
        render(<Search onFilter={onFilterMock} />);

        const searchInput: HTMLInputElement = screen.getByPlaceholderText('SEARCH A CHARACTER...');
        fireEvent.change(searchInput, { target: { value: 'Spider-Man' } });

        expect(onFilterMock).toHaveBeenCalledWith('Spider-Man');
    });

    test('updates the search input value correctly', () => {
        const onFilterMock = jest.fn();
        render(<Search onFilter={onFilterMock} />);

        const searchInput: HTMLInputElement = screen.getByPlaceholderText('SEARCH A CHARACTER...');
        fireEvent.change(searchInput, { target: { value: 'Iron Man' } });

        expect(searchInput.value).toBe('Iron Man');
    });

    test('handles empty input value correctly', () => {
        const onFilterMock = jest.fn();
        render(<Search onFilter={onFilterMock} />);

        const searchInput: HTMLInputElement = screen.getByPlaceholderText('SEARCH A CHARACTER...');
        fireEvent.change(searchInput, { target: { value: 'aaa' } });
        fireEvent.change(searchInput, { target: { value: '' } });

        expect(onFilterMock).toHaveBeenCalledWith('');
        expect(searchInput.value).toBe('');
    });
});
