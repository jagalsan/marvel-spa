import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FavoritesProvider } from '@/core/context/FavoritesContext';
import Layout from '../layout';

// eslint-disable-next-line react/display-name
jest.mock('@/components/favorites-button/FavoritesButton', () => () => <div>Favorites Button</div>);

describe('Layout', () => {
    test('renders layout with children', () => {
        const childrenContent = <div>Test Content</div>;

        render(
            <FavoritesProvider>
                <Layout>{childrenContent}</Layout>
            </FavoritesProvider>
        );

        // Check that the Marvel logo is rendered
        const logo = screen.getByAltText('Marvel Logo');
        expect(logo).toBeInTheDocument();

        // Check that the FavoritesButton is rendered
        const favoritesButton = screen.getByText('Favorites Button');
        expect(favoritesButton).toBeInTheDocument();

        // Check that the children content is rendered
        const children = screen.getByText('Test Content');
        expect(children).toBeInTheDocument();
    });
});
