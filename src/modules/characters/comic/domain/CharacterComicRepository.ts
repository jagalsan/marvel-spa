import { MarvelApiLayout } from "@/data/types/marvel-api-layout.type";
import { CharacterComic } from "./CharacterComic";

export interface ComicRepository {
	getAll: (characterId: number) => Promise<MarvelApiLayout<CharacterComic[]>>;
}