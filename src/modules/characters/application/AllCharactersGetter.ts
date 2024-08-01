import { MarvelApiLayout } from "@/data/types/marvel-api-layout.type";
import { Character } from "../domain/Character";
import { CharacterRepository } from "../domain/CharacterRepository";

export class AllCharactersGetter {
  constructor(private readonly repository: CharacterRepository) {}
  async get(): Promise<MarvelApiLayout<Character[]>> {
    return this.repository.getAll();
  }
}
