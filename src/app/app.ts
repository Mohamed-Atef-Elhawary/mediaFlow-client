import { Component, computed, Signal, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { AuthService } from './services/auth-service';
import { AuthView } from './types/authType';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('mediaFlow');

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    console.log(Date.now().toString());
    console.log(new Date(Date.now()));
    console.log(new Date().getTime());
  }
  authView: Signal<AuthView> = computed(() => this.auth.authView());
}
