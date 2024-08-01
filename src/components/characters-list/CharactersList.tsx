'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Character } from '@/modules/characters/domain/Character';
import styles from './CharacterList.module.scss';
import CharacterCard from '../character-card/CharatacterCard';
import { useFavorites } from '@/core/context/FavoritesContext';

interface CharacterListProps {
    initialCharacters: Character[];
    showFavorites?: boolean;
    onFavoritesUpdate: (updatedFavorites: Character[]) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ initialCharacters, showFavorites = false, onFavoritesUpdate }) => {
    const router = useRouter();

    const [characters, setCharacters] = useState<Character[]>(initialCharacters);
    const { addFavorite, removeFavorite, favorites } = useFavorites();


    useEffect(() => {
        const updateFavoriteStatus = () => {
            if (showFavorites) {
                const favoriteCharacters = favorites;
                setCharacters(favoriteCharacters);
            } else {
                const favoriteCharacters = favorites;
                const updatedCharacters = initialCharacters.map(character => ({
                    ...character,
                    isFavorite: favoriteCharacters.some((fav: Character) => fav.id === character.id),
                }));
                setCharacters(updatedCharacters);
            }
        };

        updateFavoriteStatus();
    }, [initialCharacters, showFavorites]);

    const navigateToCharacterView = (characterId: number) => {
        router.push(`/character/${characterId}`);
    };

    const handleFavoriteToggle = (character: Character) => {
        const updatedCharacter = { ...character, isFavorite: !character.isFavorite };
        if(!character.isFavorite) {
            addFavorite(updatedCharacter);
        } else {
            removeFavorite(updatedCharacter);
        }

        let updatedCharacters: Character[];
        if (showFavorites) {
            updatedCharacters = characters.filter(char => char.id !== character.id);
            setCharacters(updatedCharacters);
        } else {
            updatedCharacters = characters.map(char => (char.id === updatedCharacter.id ? updatedCharacter : char));
            setCharacters(updatedCharacters);
        }
        onFavoritesUpdate(updatedCharacters);
    };

    return (
        <div className={styles.CharacterListContainer}>
            {characters.map(character => (
                <CharacterCard
                    key={character.id}
                    character={character}
                    onFavoriteToggle={handleFavoriteToggle}
                    navigateToCharacterView={navigateToCharacterView}
                />
            ))}
        </div>
    );
};

export default CharacterList;
