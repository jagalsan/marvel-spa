'use client';
import React from 'react';
import styles from './CharacterComicCard.module.scss';
import Image from 'next/image';
import { CharacterComic } from '@/modules/characters/comic/domain/CharacterComic';

interface CharacterComicCardProps {
    comic: CharacterComic;
}

const CharacterComicCard: React.FC<CharacterComicCardProps> = ({ comic }) => {
    return (
        <div key={comic.id} className={styles.ComicCard}>
            <Image
                src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
                alt={comic.title}
                className={styles.ComicCardComicImage}
                width={168}
                height={252}
            />
            <div className={styles.ComicCardContent}>
            <div className={styles.ComicCardContentTitle}>{comic.title}</div>
            <div className={styles.ComicCardContentYear}>{comic.saleYear}</div>
            </div>
        </div>
    );
};

export default CharacterComicCard;