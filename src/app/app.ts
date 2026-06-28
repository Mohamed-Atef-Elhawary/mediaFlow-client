import { Component, computed, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  constructor(private auth: AuthService) {}

  authView: Signal<AuthView> = computed(() => this.auth.authView());
}
