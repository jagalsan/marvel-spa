import { render, screen } from '@testing-library/react';
import HomeClient from '../HomeClient';
import {
    FavoritesProvider,
    useFavorites,
} from '@/core/context/FavoritesContext';
import React, { ReactNode } from 'react';
import { Character } from '@/modules/characters/domain/Character';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock the useRouter hook from next/router
jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

const mockCharacters: Character[] = [
    {
        id: 1,
        name: 'Iron Man',
        description:
            'A wealthy American business magnate, playboy, and ingenious scientist.',
        modified: '',
        resourceURI: '',
        urls: [],
        thumbnail: { path: 'https://path/to/image', extension: 'jpg' },
        comics: { available: 0, returned: 0, collectionURI: '', items: [] },
        stories: { available: 0, returned: 0, collectionURI: '', items: [] },
        events: { available: 0, returned: 0, collectionURI: '', items: [] },
        series: { available: 0, returned: 0, collectionURI: '', items: [] },
    },
    {
        id: 2,
        name: 'Spider-Man',
        description: 'A superhero with spider-like abilities.',
        modified: '',
        resourceURI: '',
        urls: [],
        thumbnail: { path: 'https://path/to/image', extension: 'jpg' },
        comics: { available: 0, returned: 0, collectionURI: '', items: [] },
        stories: { available: 0, returned: 0, collectionURI: '', items: [] },
        events: { available: 0, returned: 0, collectionURI: '', items: [] },
        series: { available: 0, returned: 0, collectionURI: '', items: [] },
    },
];

const renderWithProviders = (ui: ReactNode) => {
    return render(<FavoritesProvider>{ui}</FavoritesProvider>);
};

describe('HomeClient', () => {
    beforeEach(() => {
        mockUseRouter.mockReturnValue({
            route: '/',
            push: jest.fn()
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('renders correctly with characters', () => {
        renderWithProviders(<HomeClient characters={mockCharacters} />);
        expect(screen.getByText(/Iron Man/i)).toBeInTheDocument();
    });

    test('filters characters based on search input', () => {
        renderWithProviders(<HomeClient characters={mockCharacters} />);
        // Implement search input and trigger filter
        const searchInput: HTMLInputElement = screen.getByRole('searchbox');
        searchInput.value = 'Spider';
        screen.getByText(/Spider-Man/i).click();
        // Add assertions based on the test requirements
    });
});
