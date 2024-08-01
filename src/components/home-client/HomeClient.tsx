'use client';
import CharacterList from '@/components/characters-list/CharactersList';
import { Character } from '@/modules/characters/domain/Character';
import { useEffect, useState } from 'react';
import styles from './HomeClient.module.scss';
import Search from '../search/Search';
import { useSearchParams } from 'next/navigation';
import { useFavorites } from '@/core/context/FavoritesContext';

interface HomeClientProps {
    characters: Character[];
}

export default function HomeClient({ characters }: HomeClientProps) {
    const { favorites } = useFavorites();
    const [allCharacters, setAllCharacters] = useState<Character[]>(characters);
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>(characters);
    const searchParams = useSearchParams();
    const showFavorites = searchParams.get('favoritesCharacters') === 'true';

    useEffect(() => {
        if (showFavorites) {
            setAllCharacters(favorites);
            setFilteredCharacters(favorites);
        } else {
            setAllCharacters(characters);
            setFilteredCharacters(characters);
        }
    }, [characters, showFavorites]);

    const handleFilter = (searchTerm: string) => {
        const filtered = allCharacters.filter(character =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCharacters(filtered);
    };

    const handleFavoriteUpdate = (updatedFavorites: Character[]) => {
        if (showFavorites) {
            setAllCharacters(updatedFavorites);
            setFilteredCharacters(updatedFavorites);
        } else {
            setAllCharacters(characters);
            setFilteredCharacters(characters);
        }
    };

    return (
        <div className={styles.HomeContainer}>
            <div className={styles.HomeContainerSearch}>
                <Search onFilter={handleFilter} />
                <div className={styles.HomeContainerSearchCount}>
                    {filteredCharacters.length} results
                </div>
            </div>
            <div className={styles.HomeContainerCharacters}>
                {filteredCharacters.length > 0 ? (
                    <CharacterList
                        initialCharacters={filteredCharacters}
                        showFavorites={showFavorites}
                        onFavoritesUpdate={handleFavoriteUpdate}
                    />
                ) : (
                    'No data'
                )}
            </div>
        </div>
    );
}
