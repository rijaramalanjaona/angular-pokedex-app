import { Component, computed, inject, signal } from '@angular/core';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { PokemonService } from '../../pokemon.service';
import { Pokemon } from '../../pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonBorderDirective, DatePipe],
  templateUrl: './pokemon-list.component.html',
  styles: ``
})
export class PokemonListComponent {
  private readonly pokemonService = inject(PokemonService);

  readonly pokemonList = signal(this.pokemonService.getPokemonList());

  readonly searchTerm = signal('');

  readonly pokemonListFiltered = computed(() => this.pokemonList()
    .filter(pokemon => pokemon.name.toLowerCase().includes(this.searchTerm().trim().toLowerCase())));

  size(pokemon: Pokemon): string {
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }
    return 'Moyen';
  }

  incrementLife(pokemon: Pokemon): void {
    pokemon.life = pokemon.life + 1;
  }

  decrementLife(pokemon: Pokemon): void {
    pokemon.life = pokemon.life - 1;
  }
}
