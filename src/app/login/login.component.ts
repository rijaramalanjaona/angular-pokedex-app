import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  readonly name: WritableSignal<string> = signal('');
  readonly password: WritableSignal<string> = signal('');
  readonly message: WritableSignal<string> = signal('Vous êtes déconnecté.');

  onSubmit(event: Event) {
    event.preventDefault();
    this.message.set('Tentative de connexion en cours ...');

    this.authService
      .login(this.name(), this.password())
      .subscribe(isLoggedIn => {
        if (!isLoggedIn) {
          this.name.set('');
          this.password.set('');
          this.message.set('Les identifiants saisis sont invalides.');

          return;
        }

        this.router.navigate(['/pokemons']);
      });
  }
}
