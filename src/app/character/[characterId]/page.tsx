import CharacterPageClient from '@/components/character-page-client/CharacterPageClient';
import { MarvelApiLayout } from '@/data/types/marvel-api-layout.type';
import { CharacterGetter } from '@/modules/characters/application/CharacterGetter';
import { AllCharacterComicsGetter } from '@/modules/characters/comic/application/AllCharacterComicsGetter';
import { CharacterComic } from '@/modules/characters/comic/domain/CharacterComic';
import { createApiCharacterComicRepository } from '@/modules/characters/comic/infrastructure/ApiComicRepository';
import { Character } from '@/modules/characters/domain/Character';
import { createApiCharacterRepository } from '@/modules/characters/infrastructure/ApiCharacterRepository';
import { Metadata } from 'next';

type CharacterPageProps = {
    params: {
        characterId: number;
    };
};

const fetchCharacter = async (characterId: number): Promise<MarvelApiLayout<Character[]>> => {
    const characterRepository = createApiCharacterRepository();
    const allCharactersGetter = new CharacterGetter(characterRepository);
    return await allCharactersGetter.get(characterId);
};

const fetchCharacterComics = async (
    characterId: number
): Promise<MarvelApiLayout<CharacterComic[]>> => {
    const characterRepository = createApiCharacterComicRepository();
    const allCharactersGetter = new AllCharacterComicsGetter(
        characterRepository
    );
    return await allCharactersGetter.get(characterId);
};

export const metadata: Metadata = {
    title: "Character by Marvel",
    viewport: "width=device-width, initial-scale=1",
    openGraph: {
      title: "Character by Marvel",
    },
    robots: "index, follow",
  };

export default async function Page({ params }: CharacterPageProps) {
    const character = await fetchCharacter(params.characterId);
    const characterComics = await fetchCharacterComics(params.characterId);

    return (
        <>
            <CharacterPageClient
                initialCharacter={character.data.results[0]}
                characterComics={characterComics.data.results}
            />
        </>
    );
}
