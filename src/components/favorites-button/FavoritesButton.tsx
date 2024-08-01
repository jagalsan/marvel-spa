'use client';
import React from 'react';
import styles from './FavoritesButton.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useFavorites } from '@/core/context/FavoritesContext';

const FavoritesButton: React.FC = () => {
    const router = useRouter();
    const { favoriteCount } = useFavorites();

    const handleFavoritesClick = () => {
        router.push('/?favoritesCharacters=true');
    };

    return (
        <button className={styles.FavoritesButton} onClick={handleFavoritesClick}>
            <Image
                width={24}
                height={21}
                className={styles.FavoritesButtonHeart}
                src={'/icons/heart-icon-fill.svg'}
                alt="Heart image"
            />
            {favoriteCount}
        </button>
    );
};

export default FavoritesButton;
