import { MarvelApiLayout } from "@/data/types/marvel-api-layout.type";
import { CharacterComic } from "../domain/CharacterComic";
import { ComicRepository } from "../domain/CharacterComicRepository";

export class AllCharacterComicsGetter {
  constructor(private readonly repository: ComicRepository) {}
  async get(characterId: number): Promise<MarvelApiLayout<CharacterComic[]>> {
    return this.repository.getAll(characterId);
  }
}
