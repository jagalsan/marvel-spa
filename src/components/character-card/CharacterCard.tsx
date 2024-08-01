'use client';
import React from 'react';
import styles from './CharacterCard.module.scss';
import Image from 'next/image';
import { Character } from '@/modules/characters/domain/Character';

interface CharacterCardProps {
    character: Character;
    onFavoriteToggle: (character: Character) => void;
    navigateToCharacterView: (id: number) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
    character,
    onFavoriteToggle,
    navigateToCharacterView,
}) => {
    return (
        <div className={styles.CharacterCard}>
            <Image
                className={styles.CharacterCardImage}
                width={188}
                height={188}
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                onClick={() => {
                    navigateToCharacterView(character.id);
                }}
            />
            <div className={styles.CharacterCardTitleContainer}>
                <div
                    onClick={() => {
                        navigateToCharacterView(character.id);
                    }}
                    className={styles.CharacterCardTitle}>
                    {character.name}
                </div>
                <div
                    className={styles.CharacterCardFavoriteButton}
                    onClick={() => {
                        onFavoriteToggle(character);
                    }}>
                    <Image
                        width={24}
                        height={21}
                        src={
                            character.isFavorite
                                ? '/icons/heart-icon-fill.svg'
                                : '/icons/heart-icon.svg'
                        }
                        alt={'Heart icon'}></Image>
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;
