import HomeClient from '@/components/home-client/HomeClient';
import { MarvelApiLayout } from '@/data/types/marvel-api-layout.type';
import { AllCharactersGetter } from '@/modules/characters/application/AllCharactersGetter';
import { Character } from '@/modules/characters/domain/Character';
import { createApiCharacterRepository } from '@/modules/characters/infrastructure/ApiCharacterRepository';
import { Metadata } from 'next';

export const fetchCharacters = async (): Promise<MarvelApiLayout<Character[]>> => {
    const characterRepository = createApiCharacterRepository();
    const allCharactersGetter = new AllCharactersGetter(characterRepository);
    return await allCharactersGetter.get();
};

export const metadata: Metadata = {
    title: "Characters by Marvel",
    viewport: "width=device-width, initial-scale=1",
    openGraph: {
      title: "Characters by Marvel",
    },
    robots: "index, follow",
  };

export default async function Page() {
    const characters = await fetchCharacters();

    return (
        <>
            <HomeClient characters={characters.data.results}></HomeClient>
        </>
    );
}
