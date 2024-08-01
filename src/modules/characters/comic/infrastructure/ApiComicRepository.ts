import { fetchApi } from '@/core/interceptors/http-config';
import { CharacterComic } from '../domain/CharacterComic';
import { ComicRepository } from '../domain/CharacterComicRepository';
import { MarvelApiLayout } from '@/data/types/marvel-api-layout.type';

const MARVEL_HOST = process.env.MARVEL_HOST as string;

export function createApiCharacterComicRepository(): ComicRepository {
    return {
        getAll,
    };
}

async function getAll(
    characterId: number
): Promise<MarvelApiLayout<CharacterComic[]>> {
    const characterComics = await fetchApi(
        `${MARVEL_HOST}/characters/${characterId}/comics`,
        'GET',
        {
            queryParams: { limit: 20 },
        }
    ).then(response => response as Promise<MarvelApiLayout<CharacterComic[]>>);

    characterComics.data.results.forEach(comic => {
        const onSaleDate = comic.dates.find(d => d.type === 'onsaleDate')?.date;
        if (onSaleDate) {
            comic.saleYear = new Date(onSaleDate).getFullYear();
        }
    });

    return characterComics;
}
