import { Component, computed, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Pokemon } from '../../pokemon.model';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-pokemon-profile',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './pokemon-profile.component.html',
  styles: ``
})
export class PokemonProfileComponent {
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));

  private readonly pokemonResponse = toSignal(
    this.pokemonService.getPokemonById(this.pokemonId)
      .pipe(
        map((value: Pokemon) => ({ value, error: undefined })),
        catchError((error) => of({ value: undefined, error }))
      )
  );

  readonly loading: Signal<boolean> = computed(() => !this.pokemonResponse());

  readonly error = computed(() => this.pokemonResponse()?.error);

  readonly pokemon = computed(() => this.pokemonResponse()?.value);
}
