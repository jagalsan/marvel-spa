'use client';
import CharacterDetails from '@/components/character-details/CharacterDetails';
import { CharacterComic } from '@/modules/characters/comic/domain/CharacterComic';
import { Character } from '@/modules/characters/domain/Character';
import { useState } from 'react';
import { useFavorites } from '@/core/context/FavoritesContext';

type CharacterPageClientProps = {
    initialCharacter: Character;
    characterComics: CharacterComic[];
};

export default function CharacterPageClient({
    initialCharacter,
    characterComics,
}: CharacterPageClientProps) {
    const { addFavorite, removeFavorite } = useFavorites();
    const [character, setCharacter] = useState<Character>(initialCharacter);

    const handleFavoriteClick = (isFavorite: boolean) => {
        if (isFavorite) {
            removeFavorite(character);
        } else {
            addFavorite(character);
        }
    };

    const handleFavoriteToggle = () => {
        const updatedCharacter = { ...character, isFavorite: !character.isFavorite };
        handleFavoriteClick(updatedCharacter.isFavorite as boolean);
        setCharacter(updatedCharacter);
    };

    return (
        <CharacterDetails
            initialCharacter={character}
            comics={characterComics}
            onFavoriteToggle={handleFavoriteToggle}
        />
    );
}
