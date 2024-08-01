import { render, screen, fireEvent } from '@testing-library/react';
import CharacterPageClient from '../CharacterPageClient';
import { useFavorites } from '@/core/context/FavoritesContext';
import React from 'react';
import { Character } from '@/modules/characters/domain/Character';
import { CharacterComic } from '@/modules/characters/comic/domain/CharacterComic';
import { FavoritesProvider } from '@/core/context/FavoritesContext';

jest.mock('@/core/context/FavoritesContext', () => ({
    ...jest.requireActual('@/core/context/FavoritesContext'),
    useFavorites: jest.fn(),
}));

const mockUseFavorites = useFavorites as jest.Mock;

const mockCharacter: Character = {
    id: 1,
    name: 'Iron Man',
    description: 'A wealthy American business magnate, playboy, and ingenious scientist.',
    modified: '',
    resourceURI: '',
    urls: [],
    thumbnail: { path: 'https://path/to/image', extension: 'jpg' },
    comics: { available: 0, returned: 0, collectionURI: '', items: [] },
    stories: { available: 0, returned: 0, collectionURI: '', items: [] },
    events: { available: 0, returned: 0, collectionURI: '', items: [] },
    series: { available: 0, returned: 0, collectionURI: '', items: [] },
    isFavorite: false,
};

const mockComics: CharacterComic[] = [
    {
        id: 1,
        title: 'Comic 1',
        description: 'Description 1',
        resourceURI: '',
        urls: [],
        thumbnail: { path: 'https://path/to/comic1', extension: 'jpg' },
        series: { available: 0, returned: 0, collectionURI: '', items: [] },
        variants: [],
        collections: [],
        collectedIssues: [],
        dates: [],
        prices: [],
        characters: { available: 0, returned: 0, collectionURI: '', items: [] },
        stories: { available: 0, returned: 0, collectionURI: '', items: [] },
        events: { available: 0, returned: 0, collectionURI: '', items: [] },
    },
] as unknown as CharacterComic[];

const renderWithProviders = (ui: React.ReactNode) => {
    return render(<FavoritesProvider>{ui}</FavoritesProvider>);
};

describe('CharacterPageClient', () => {
    beforeEach(() => {
        mockUseFavorites.mockReturnValue({
            addFavorite: jest.fn(),
            removeFavorite: jest.fn(),
            favorites: [],
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('renders character details correctly', () => {
        renderWithProviders(
            <CharacterPageClient
                initialCharacter={mockCharacter}
                characterComics={mockComics}
            />
        );

        expect(screen.getByText(/Iron Man/i)).toBeInTheDocument();
        expect(screen.getByText(/Comic 1/i)).toBeInTheDocument();
    });
});
