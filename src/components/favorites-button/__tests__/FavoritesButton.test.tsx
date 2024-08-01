import { render, screen, fireEvent } from '@testing-library/react';
import FavoritesButton from '../FavoritesButton';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/core/context/FavoritesContext';
import React from 'react';

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

describe('FavoritesButton', () => {
    beforeEach(() => {
        mockUseRouter.mockReturnValue({
            push: jest.fn(),
        });

        mockUseFavorites.mockReturnValue({
            favoriteCount: 5,
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('renders correctly with favorite count', () => {
        render(<FavoritesButton />);
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByAltText('Heart image')).toBeInTheDocument();
    });

    test('calls router.push with correct URL on click', () => {
        const { push } = useRouter();
        render(<FavoritesButton />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(push).toHaveBeenCalledWith('/?favoritesCharacters=true');
    });
});
