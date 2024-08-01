'use client';
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react';
import { Character } from '@/modules/characters/domain/Character';

interface FavoritesContextProps {
    favorites: Character[];
    addFavorite: (character: Character) => void;
    removeFavorite: (character: Character) => void;
    favoriteCount: number;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
    undefined
);
const FAVORITES_KEY = 'marvel_favorites';

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Character[]>([]);
    const [favoriteCount, setFavoriteCount] = useState<number>(0);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
        setFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        setFavoriteCount(favorites.length);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (character: Character) => {
        setFavorites(prevFavorites => [...prevFavorites, character]);
    };

    const removeFavorite = (character: Character) => {
        setFavorites(prevFavorites =>
            prevFavorites.filter(fav => fav.id !== character.id)
        );
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite, favoriteCount }}>
            {children}
        </FavoritesContext.Provider>
    );
};
