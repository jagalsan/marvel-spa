import { render, screen } from '@testing-library/react';
import CharacterComicCard from '../CharacterComicCard';
import { CharacterComic } from '@/modules/characters/comic/domain/CharacterComic';
import React from 'react';

const mockComic: CharacterComic = {
    id: 1,
    title: 'Amazing Spider-Man #1',
    description: 'The very first issue of Amazing Spider-Man.',
    resourceURI: '',
    urls: [],
    thumbnail: { path: 'https://path/to/comic', extension: 'jpg' },
    series: { available: 0, returned: 0, collectionURI: '', items: [] },
    variants: [],
    collections: [],
    collectedIssues: [],
    dates: [{ type: 'onsaleDate', date: '1963-03-01T00:00:00-0500' }],
    prices: [],
    characters: { available: 0, returned: 0, collectionURI: '', items: [] },
    stories: { available: 0, returned: 0, collectionURI: '', items: [] },
    events: { available: 0, returned: 0, collectionURI: '', items: [] },
    saleYear: 1963,
} as unknown as CharacterComic;

describe('CharacterComicCard', () => {
    test('renders comic details correctly', () => {
        render(<CharacterComicCard comic={mockComic} />);

        expect(screen.getByText(/Amazing Spider-Man #1/i)).toBeInTheDocument();
        expect(screen.getByText(/1963/i)).toBeInTheDocument();
        const image = screen.getByAltText(/Amazing Spider-Man #1/i);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src');
        expect(image.getAttribute('src')).toContain('/_next/image?url=https%3A%2F%2Fpath%2Fto%2Fcomic.jpg&w=384&q=75');
    });
});
