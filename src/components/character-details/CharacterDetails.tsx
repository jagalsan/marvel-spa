'use client';
import React, { useEffect, useState } from 'react';
import { Character } from '@/modules/characters/domain/Character';
import styles from './CharacterDetails.module.scss';
import Image from 'next/image';
import { CharacterComic } from '@/modules/characters/comic/domain/CharacterComic';
import CharacterComicCard from '../character-comic-card/CharacterComicCard';
import { useFavorites } from '@/core/context/FavoritesContext';

interface CharacterDetailProps {
    initialCharacter: Character;
    comics: CharacterComic[];
    onFavoriteToggle: (id: number) => void;
}

const CharacterDetails: React.FC<CharacterDetailProps> = ({
    initialCharacter,
    comics,
    onFavoriteToggle,
}) => {
    const { favorites } = useFavorites();
    const [character, setCharacter] = useState<Character>(initialCharacter);

    useEffect(() => {
        const isFavorite = favorites.some(
            (fav: Character) => fav.id === initialCharacter.id
        );
        setCharacter({ ...initialCharacter, isFavorite });
    }, [initialCharacter, favorites]);

    const handleFavoriteToggle = () => {
        setCharacter(prevCharacter => ({
            ...prevCharacter,
            isFavorite: !prevCharacter.isFavorite,
        }));
        onFavoriteToggle(character.id);
    };

    return (
        <div className={styles.CharacterDetailContainer}>
            <div className={styles.CharacterInfo}>
                <Image
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    className={styles.CharacterInfoImage}
                    width={278}
                    height={278}
                />
                <div className={styles.CharacterInfoText}>
                    <div className={styles.CharacterInfoTextContainer}>
                        <h1 className={styles.CharacterInfoTextTitle}>
                            {character.name}
                        </h1>
                        <button
                            className={styles.CharacterInfoTextHeartButton}
                            onClick={handleFavoriteToggle}>
                            <Image
                                width={24}
                                height={21}
                                className={styles.CharacterInfoTextHeartIcon}
                                src={
                                    character.isFavorite
                                        ? '/icons/heart-icon-fill.svg'
                                        : '/icons/heart-icon.svg'
                                }
                                alt="Heart image"
                            />
                        </button>
                    </div>
                    <p className={styles.CharacterInfoTextDescription}>
                        {character.description}
                    </p>
                </div>
            </div>
            <div className={styles.ComicsSection}>
                <h2 className={styles.ComicsSectionTitle}>COMICS</h2>
                <div className={styles.ComicsSectionSlider}>
                    {comics.map(comic => (
                        <CharacterComicCard key={comic.id} comic={comic} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CharacterDetails;
