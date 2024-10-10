import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPokemonBorder]',
  standalone: true
})
export class PokemonBorderDirective {
  private initialColor: string;

  constructor(private el: ElementRef) {
    this.initialColor = this.el.nativeElement.style.borderColor;
    this.el.nativeElement.style.borderWidth = '2px';
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    const color = 'green';
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
