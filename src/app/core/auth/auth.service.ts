import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _isLoggedIn: WritableSignal<boolean>  = signal(false);
  readonly isLoggedIn: Signal<boolean> = this._isLoggedIn.asReadonly();

  login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = name === 'login' && password === 'password';
    this._isLoggedIn.set(isLoggedIn);
    return of(isLoggedIn).pipe(delay(1000));
  }
}
