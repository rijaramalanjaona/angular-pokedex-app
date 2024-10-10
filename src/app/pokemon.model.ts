export interface Pokemon {
  id: number;
  name: string;
  picture: string;
  life: number;
  damage: number;
  types: [string, string?, string?]; // (Eau, Feu, Vol, etc.). Un pokémon doit obligatoirement avoir 1 type, mais peut avoir 2 types supplémentaires facultatifs.
  created: Date;
}

export type PokemonList = Pokemon[];
