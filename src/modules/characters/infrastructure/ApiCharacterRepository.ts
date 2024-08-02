import { fetchApi } from '@/core/interceptors/http-config';
import { CharacterRepository } from '../domain/CharacterRepository';
import { Character } from '../domain/Character';
import { MarvelApiLayout } from '@/data/types/marvel-api-layout.type';

const MARVEL_HOST = process.env.MARVEL_HOST as string;

export function createApiCharacterRepository(): CharacterRepository {
    return {
        get,
        getAll,
    };
}

async function getAll(): Promise<MarvelApiLayout<Character[]>> {
    const characters = await fetchApi(`${MARVEL_HOST}/characters`, 'GET', {
        queryParams: { limit: 50 },
    }).then(response => response as Promise<MarvelApiLayout<Character[]>>);

    let charactersAux = initializeIsFavorite(characters);
    return charactersAux;
}

async function get(characterId: number): Promise<MarvelApiLayout<Character[]>> {
    const character = await fetchApi(
        `${MARVEL_HOST}/characters/${characterId}`,
        'GET'
    ).then(response => response as Promise<MarvelApiLayout<Character[]>>);

    let characterAux = initializeIsFavorite(character);

    return characterAux;
}

function initializeIsFavorite(
    characterList: MarvelApiLayout<Character[]>
): MarvelApiLayout<Character[]> {
    const characterListAux = characterList;
    characterListAux.data.results.forEach(c => (c.isFavorite = !!c.isFavorite));
    return characterListAux;
}
