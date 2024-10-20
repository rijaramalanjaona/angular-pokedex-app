import { Component, computed, inject, signal } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { PokemonBorderDirective } from './pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonBorderDirective, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
