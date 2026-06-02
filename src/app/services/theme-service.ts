import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  mode = signal<'Light' | 'Dark'>(this.setMode());
  showOptions = signal<boolean>(false);
  constructor() {
    effect(() => {
      if (this.mode() === 'Dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }

  setMode(): 'Light' | 'Dark' {
    let mode = localStorage.getItem('mode');
    if (mode === 'Light' || mode === 'Dark') {
      return mode;
    }
    return 'Light';
  }
}
