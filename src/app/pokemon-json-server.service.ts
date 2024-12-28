import { PokemonService } from './pokemon.service';
import { Pokemon, PokemonList } from './pokemon.model';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class PokemonJsonServerService implements PokemonService {
  private readonly http = inject(HttpClient);
  private readonly POKEMON_API_URL = 'http://localhost:3000/pokemons';

  getPokemonList(): Observable<PokemonList> {
    return this.http.get<PokemonList>(this.POKEMON_API_URL);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.POKEMON_API_URL}/${id}`);
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${this.POKEMON_API_URL}/${pokemon.id}`, pokemon);
  }

  deletePokemon(pokemonId: number): Observable<void> {
    return this.http.delete<void>(`${this.POKEMON_API_URL}/${pokemonId}`);
  }

  addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.POKEMON_API_URL, pokemon);
  }

}
