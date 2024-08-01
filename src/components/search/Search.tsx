'use client';
import { useState } from 'react';
import styles from './Search.module.scss';

interface SearchProps {
    onFilter: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onFilter }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onFilter(value);
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
                <span className={styles.searchBoxIcon}>🔍</span>
                <input
                    className={styles.searchBoxInput}
                    type="search"
                    placeholder="SEARCH A CHARACTER..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default Search;
