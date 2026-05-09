import { Component, computed, effect, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { AuthService } from './services/auth-service';
import { AuthView } from './types/authType';
import { DoctorService } from './services/doctor-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(
    private auth: AuthService,
    private docService: DoctorService,
  ) {}

  authView: Signal<AuthView> = computed(() => this.auth.authView());
}
