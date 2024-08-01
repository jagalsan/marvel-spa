import { MarvelApiLayout } from "@/data/types/marvel-api-layout.type";
import { Character } from "../domain/Character";
import { CharacterRepository } from "../domain/CharacterRepository";

export class CharacterGetter {
  constructor(private readonly repository: CharacterRepository) {}
  async get(characterId: number): Promise<MarvelApiLayout<Character[]>> {
    return this.repository.get(characterId);
  }
}
