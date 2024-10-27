import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-profile',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './pokemon-profile.component.html',
  styles: ``
})
export class PokemonProfileComponent {
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId)).asReadonly();
}
