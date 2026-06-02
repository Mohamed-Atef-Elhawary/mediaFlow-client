import { Component, computed } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme-service';
@Component({
  selector: 'app-modes-component',
  imports: [FontAwesomeModule],
  templateUrl: './modes-component.html',
  styleUrl: './modes-component.css',
})
export class ModesComponent {
  sunIcon = faSun;
  moonIcon = faMoon;
  checkIcon = faCheck;
  xIcon = faXmark;
  constructor(private themeService: ThemeService) {}
  mode = computed(() => this.themeService.mode());

  setMode(mode: 'Light' | 'Dark'): void {
    localStorage.setItem('mode', mode);
    this.themeService.mode.set(mode);
  }
  closeModeOptions() {
    this.themeService.showOptions.set(false);
  }
}
