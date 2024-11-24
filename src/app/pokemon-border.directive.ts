import { Directive, ElementRef, HostListener, input } from '@angular/core';
import { getPokemonColor } from './pokemon.model';

@Directive({
  selector: '[appPokemonBorder]',
  standalone: true
})
export class PokemonBorderDirective {
  pokemonType = input.required<string>();
  private initialColor: string;

  constructor(private el: ElementRef) {
    this.initialColor = this.el.nativeElement.style.borderColor;
    this.el.nativeElement.style.borderWidth = '2px';
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    const color = getPokemonColor(this.pokemonType());
    this.setBorder(color);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    const color = this.initialColor;
    this.setBorder(color);
  }

  private setBorder(color: string): void {
    this.el.nativeElement.style.borderColor = color;
  }

}
