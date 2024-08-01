import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from '../CharacterCard';
import { Character } from '@/modules/characters/domain/Character';
import React from 'react';

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

describe('CharacterCard', () => {
    const mockNavigateToCharacterView = jest.fn();
    const mockOnFavoriteToggle = jest.fn();

    beforeEach(() => {
        mockNavigateToCharacterView.mockClear();
        mockOnFavoriteToggle.mockClear();
    });

    test('renders character details correctly', () => {
        render(
            <CharacterCard
                character={mockCharacter}
                navigateToCharacterView={mockNavigateToCharacterView}
                onFavoriteToggle={mockOnFavoriteToggle}
            />
        );

        expect(screen.getByText(/Iron Man/i)).toBeInTheDocument();
        const image = screen.getByAltText(/Iron Man/i);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src');
    });

    test('navigates to character view when image or title is clicked', () => {
        render(
            <CharacterCard
                character={mockCharacter}
                navigateToCharacterView={mockNavigateToCharacterView}
                onFavoriteToggle={mockOnFavoriteToggle}
            />
        );

        const image = screen.getByAltText(/Iron Man/i);
        fireEvent.click(image);
        expect(mockNavigateToCharacterView).toHaveBeenCalledWith(mockCharacter.id);

        const title = screen.getByText(/Iron Man/i);
        fireEvent.click(title);
        expect(mockNavigateToCharacterView).toHaveBeenCalledWith(mockCharacter.id);
    });

    test('toggles favorite status when favorite button is clicked', () => {
        render(
            <CharacterCard
                character={mockCharacter}
                navigateToCharacterView={mockNavigateToCharacterView}
                onFavoriteToggle={mockOnFavoriteToggle}
            />
        );

        const favoriteButton: HTMLButtonElement = screen.getByAltText(/Heart icon/i).parentElement as HTMLButtonElement;
        fireEvent.click(favoriteButton);
        expect(mockOnFavoriteToggle).toHaveBeenCalledWith(mockCharacter);
    });
});
