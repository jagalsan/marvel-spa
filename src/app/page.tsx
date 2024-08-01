import HomeClient from '@/components/home-client/HomeClient';
import { MarvelApiLayout } from '@/data/types/marvel-api-layout.type';
import { AllCharactersGetter } from '@/modules/characters/application/AllCharactersGetter';
import { Character } from '@/modules/characters/domain/Character';
import { createApiCharacterRepository } from '@/modules/characters/infrastructure/ApiCharacterRepository';

export const fetchCharacters = async (): Promise<MarvelApiLayout<Character[]>> => {
    const characterRepository = createApiCharacterRepository();
    const allCharactersGetter = new AllCharactersGetter(characterRepository);
    return await allCharactersGetter.get();
};


export default async function Page() {
    const characters = await fetchCharacters();

    return (
        <>
            <HomeClient characters={characters.data.results}></HomeClient>
        </>
    );
}
