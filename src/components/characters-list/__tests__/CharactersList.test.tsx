import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { FavoritesProvider, useFavorites } from '@/core/context/FavoritesContext';
import React from 'react';
import { Character } from '@/modules/characters/domain/Character';
import CharacterList from '../CharactersList';

jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    useRouter: jest.fn(),
}));

jest.mock('@/core/context/FavoritesContext', () => ({
    ...jest.requireActual('@/core/context/FavoritesContext'),
    useFavorites: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const mockUseFavorites = useFavorites as jest.Mock;

const mockCharacters: Character[] = [
    {
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
        isFavorite: false,
    },
];

const renderWithProviders = (ui: React.ReactNode) => {
    return render(<FavoritesProvider>{ui}</FavoritesProvider>);
};

describe('CharacterList', () => {
    beforeEach(() => {
        mockUseRouter.mockReturnValue({
            push: jest.fn(),
        });

        mockUseFavorites.mockReturnValue({
            favorites: [],
            addFavorite: jest.fn(),
            removeFavorite: jest.fn(),
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('renders correctly with initial characters', () => {
        renderWithProviders(
            <CharacterList
                initialCharacters={mockCharacters}
                onFavoritesUpdate={jest.fn()}
            />
        );
        expect(screen.getByText(/Iron Man/i)).toBeInTheDocument();
        expect(screen.getByText(/Spider-Man/i)).toBeInTheDocument();
    });

    test('navigates to character view on card click', () => {
        const { push } = useRouter();
        renderWithProviders(
            <CharacterList
                initialCharacters={mockCharacters}
                onFavoritesUpdate={jest.fn()}
            />
        );
        const characterCard = screen.getByText(/Iron Man/i).closest('div');
        if (characterCard) {
            fireEvent.click(characterCard);
        }
        expect(push).toHaveBeenCalledWith('/character/1');
    });
});
