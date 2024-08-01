import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '../FavoritesContext';
import { Character } from '@/modules/characters/domain/Character';

const FAVORITES_KEY = 'marvel_favorites';

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
};

describe('FavoritesContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    const TestComponent = () => {
        const { favorites, addFavorite, removeFavorite, favoriteCount } = useFavorites();

        return (
            <div>
                <div>
                    Favorite Count: {favoriteCount}
                </div>
                <button onClick={() => addFavorite(mockCharacter)}>Add Favorite</button>
                <button onClick={() => removeFavorite(mockCharacter)}>Remove Favorite</button>
                <div>
                    {favorites.map(fav => (
                        <div key={fav.id}>{fav.name}</div>
                    ))}
                </div>
            </div>
        );
    };

    test('renders without crashing', () => {
        render(
            <FavoritesProvider>
                <TestComponent />
            </FavoritesProvider>
        );

        expect(screen.getByText(/Favorite Count:/i)).toBeInTheDocument();
    });

    test('adds a favorite character', async () => {
        render(
            <FavoritesProvider>
                <TestComponent />
            </FavoritesProvider>
        );

        fireEvent.click(screen.getByText(/Add Favorite/i));

        await waitFor(() => {
            expect(screen.getByText(/Iron Man/i)).toBeInTheDocument();
            expect(screen.getByText(/Favorite Count: 1/i)).toBeInTheDocument();
        });
    });

    test('removes a favorite character', async () => {
        render(
            <FavoritesProvider>
                <TestComponent />
            </FavoritesProvider>
        );

        fireEvent.click(screen.getByText(/Add Favorite/i));

        await waitFor(() => {
            expect(screen.getByText(/Iron Man/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/Remove Favorite/i));

        await waitFor(() => {
            expect(screen.queryByText(/Iron Man/i)).not.toBeInTheDocument();
            expect(screen.getByText(/Favorite Count: 0/i)).toBeInTheDocument();
        });
    });

    test('persists favorites to localStorage', async () => {
        render(
            <FavoritesProvider>
                <TestComponent />
            </FavoritesProvider>
        );

        fireEvent.click(screen.getByText(/Add Favorite/i));

        await waitFor(() => {
            expect(localStorage.getItem(FAVORITES_KEY)).toEqual(
                JSON.stringify([mockCharacter])
            );
        });
    });

    test('initializes favorites from localStorage', async () => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([mockCharacter]));

        render(
            <FavoritesProvider>
                <TestComponent />
            </FavoritesProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Iron Man/i)).toBeInTheDocument();
            expect(screen.getByText(/Favorite Count: 1/i)).toBeInTheDocument();
        });
    });
});
