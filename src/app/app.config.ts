import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { PokemonAddComponent } from './pokemon/pokemon-add/pokemon-add.component';
import { PokemonService } from './pokemon.service';
import { PokemonLocalStorageService } from './pokemon-local-storage.service';
import { PokemonJsonServerService } from './pokemon-json-server.service';
import { environment } from '../environments/environment';

function pokemonServiceFactory(): PokemonService {
  return environment.production ? new PokemonLocalStorageService() : new PokemonJsonServerService();
}

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Page de connexion',
  },
  {
    path: 'pokemons',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: PokemonListComponent,
        title: 'Pokédex',
      },
      {
        path: 'add',
        component: PokemonAddComponent,
        title: 'Pokémon',
      },
      {
        path: 'edit/:id',
        component: PokemonEditComponent,
        title: 'Pokémon'
      },
      {
        path: ':id',
        component: PokemonProfileComponent,
        title: 'Pokémon'
      }
    ]
  },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, title: 'Page introuvable' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: PokemonService,
      useFactory: pokemonServiceFactory
    }
  ]
};
