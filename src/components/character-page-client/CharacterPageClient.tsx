'use client';
import CharacterDetails from '@/components/character-details/CharacterDetails';
import { CharacterComic } from '@/modules/characters/comic/domain/CharacterComic';
import { Character } from '@/modules/characters/domain/Character';
import { useEffect, useState } from 'react';
import { useFavorites } from '@/core/context/FavoritesContext';

type CharacterPageClientProps = {
    initialCharacter: Character;
    characterComics: CharacterComic[];
};

export default function CharacterPageClient({
    initialCharacter,
    characterComics,
}: CharacterPageClientProps) {
    const { addFavorite, removeFavorite, favorites } = useFavorites();
    const [character, setCharacter] = useState<Character>(initialCharacter);

    const updateFavoriteObject = (characterAux: Character) => {
        if (!characterAux.isFavorite) {
            removeFavorite(initialCharacter);
        } else {
            addFavorite(characterAux);
        }
    };

    useEffect(() => {
        const isFavorite = favorites.some(
            (fav: Character) => fav.id === initialCharacter.id
        );
        setCharacter({ ...initialCharacter, isFavorite });
    }, [initialCharacter]);

    const handleFavoriteToggle = () => {
        const updatedCharacter = {
            ...character,
            isFavorite: !character.isFavorite,
        };
        updateFavoriteObject(updatedCharacter);
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
