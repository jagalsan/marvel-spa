'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Layout.module.scss';
import Image from 'next/image';
import FavoritesButton from '@/components/favorites-button/FavoritesButton';
import './globals.css';
import { FavoritesProvider } from '@/core/context/FavoritesContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html>
            <body className={styles.LayoutContainer}>
                <FavoritesProvider>
                    <header className={styles.Header}>
                        <Link href="/">
                            <Image
                                width={130}
                                height={52}
                                src="/images/marvel-logo.svg"
                                alt="Marvel Logo"
                                className={styles.Logo}
                            />
                        </Link>
                        <FavoritesButton />
                    </header>
                    <main>
                        <section className={styles.MainContent}>
                            {children}
                        </section>
                    </main>
                </FavoritesProvider>
            </body>
        </html>
    );
};

export default Layout;
