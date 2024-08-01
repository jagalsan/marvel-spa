import { MarvelApiLayout } from "@/data/types/marvel-api-layout.type";
import { Character } from "./Character";

export interface CharacterRepository {
	get: (characterId: number) => Promise<MarvelApiLayout<Character[]>>;
	getAll: () => Promise<MarvelApiLayout<Character[]>>;
}