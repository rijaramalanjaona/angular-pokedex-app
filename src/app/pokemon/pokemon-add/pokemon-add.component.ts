import { Component, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPokemonColor, getPokemonTextColor, Pokemon, POKEMON_RULES } from '../../pokemon.model';
import { Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'app-pokemon-add',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './pokemon-add.component.html',
  styles: ``
})
export class PokemonAddComponent {
  readonly pokemonService = inject(PokemonService);
  readonly router = inject(Router);
  readonly POKEMON_RULES = signal(POKEMON_RULES).asReadonly();

  readonly form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
    ]),
    picture: new FormControl('', [
      Validators.required
    ]),
    life: new FormControl(10),
    damage: new FormControl(1),
    types: new FormArray([new FormControl('Normal')], [
        Validators.required,
        Validators.maxLength(POKEMON_RULES.MAX_TYPES)
      ]
    )
  });

  get pokemonTypeList(): FormArray {
    return this.form.get('types') as FormArray;
  }

  isPokemonTypeSelected(type: string): boolean {
    return this.pokemonTypeList.controls.some(control => control.value === type);
  }

  onPokemonTypeChange(type: string, isChecked: boolean): void {
    if (isChecked) {
      const control = new FormControl(type);
      this.pokemonTypeList.push(control);
    } else {
      const index = this.pokemonTypeList.controls
        .map(control => control.value)
        .indexOf(type);
      this.pokemonTypeList.removeAt(index);
    }
  }

  onSubmit() {
    this.pokemonName.markAsDirty();
    this.pokemonPicture.markAsDirty();
    const isFormValid = this.form.valid;

    if (isFormValid) {
      const pokemon: Omit<Pokemon, 'id'> = {
        name: this.pokemonName.value as string,
        picture: this.pokemonPicture.value as string,
        life: this.pokemonLife.value,
        damage: this.pokemonDamage.value,
        types: this.pokemonTypeList.value,
        created: new Date()
      };

      this.pokemonService.addPokemon(pokemon).subscribe((addedPokemon) =>
        this.router.navigate(['/pokemons', addedPokemon.id]));
    }

  }

  getPokemonColor(type: string): string {
    return getPokemonColor(type);
  }

  getPokemonTextColor(type: string): string {
    return getPokemonTextColor(type);
  }

  get pokemonName() {
    return this.form.get('name') as FormControl;
  }

  get pokemonPicture() {
    return this.form.get('picture') as FormControl;
  }

  get pokemonLife() {
    return this.form.get('life') as FormControl;
  }

  incrementLife() {
    const newValue = this.pokemonLife.value + 1;
    this.pokemonLife.setValue(newValue);
  }

  decrementLife() {
    const newValue = this.pokemonLife.value - 1;
    this.pokemonLife.setValue(newValue);
  }

  get pokemonDamage() {
    return this.form.get('damage') as FormControl;
  }

  incrementDamage() {
    const newValue = this.pokemonDamage.value + 1;
    this.pokemonDamage.setValue(newValue);
  }

  decrementDamage() {
    const newValue = this.pokemonDamage.value - 1;
    this.pokemonDamage.setValue(newValue);
  }
}
