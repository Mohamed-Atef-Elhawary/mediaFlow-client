import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  Signal,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { PhotoService } from '../../services/photo-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth-service';
import { AuthView } from '../../types/authType';
import { NgClass } from '@angular/common';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements AfterViewInit {
  logo: string;
  logo1: string;
  xmark = faXmark;
  bars = faBars;
  links: string[] = ['home', 'doctors', 'about', 'contact'];
  showNavLinks = signal<boolean>(false);

  @ViewChild('navLinks', { read: ViewContainerRef }) myNavLinks!: ViewContainerRef;
  @ViewChild('userMenu', { read: ViewContainerRef }) myMenue!: ViewContainerRef;
  @ViewChild('modesComponent', { read: ViewContainerRef }) myModes!: ViewContainerRef;
  @ViewChild('switchNavLinks', { read: ElementRef }) navLinkesSwitcher!: ElementRef;
  @ViewChild('switchUserMenu', { read: ElementRef }) userMenuSwitcher!: ElementRef;
  @ViewChild('switchUserMode', { read: ElementRef }) userModeSwitcher!: ElementRef;

  constructor(
    private photo: PhotoService,
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router,
  ) {
    this.logo = this.photo.static.logo;
    this.logo1 = this.photo.static.logo1;
  }
  showUserMenu: Signal<boolean> = computed(() => this.authService.showUserMenu());
  showThemeOptions: Signal<boolean> = computed(() => this.themeService.showOptions());

  ngAfterViewInit(): void {
    this.getUserMenu();
    this.getNavLinks();
    this.getModesOptions();
    document.addEventListener('click', (event) => {
      if (this.authService.authView() === 'authorized') {
        if (event.target !== this.userMenuSwitcher.nativeElement) {
          this.authService.showUserMenu.set(false);
        }
        if (event.target === this.userModeSwitcher.nativeElement) {
          this.themeService.showOptions.set(false);
        }
        if (this.showNavLinks()) {
          let svg = this.navLinkesSwitcher.nativeElement.querySelector('svg');
          let icon = svg.getAttribute('data-icon');
          if (icon == 'xmark') {
            this.showNavLinks.set(false);
          }
        }
      }
    });
  }

  async getUserMenu() {
    const menuComponent = await import('../user-menu/user-menu').then((c) => c.UserMenu);
    this.myMenue.clear();
    this.myMenue.createComponent(menuComponent);
  }

  switchShowUserMenu() {
    this.authService.showUserMenu.update((v) => !v);
    if (this.showUserMenu()) {
      this.showNavLinks.set(false);
    }
  }

  async getNavLinks() {
    const linksCom = await import('../nav-links/nav-links').then((c) => c.NavLinks);
    this.myNavLinks.clear();
    this.myNavLinks.createComponent(linksCom);
  }

  switchShowNavLinks(state: boolean) {
    this.showNavLinks.set(state);
  }

  async getModesOptions() {
    const modesCom = await import('../modes-component/modes-component').then(
      (c) => c.ModesComponent,
    );
    this.myModes.clear();
    this.myModes.createComponent(modesCom);
  }

  authView = computed(() => {
    console.log('from navBar', this.authService.authView());
    return this.authService.authView();
  });

  userImage = computed(() => {
    return this.authService.userData()?.image;
  });

  signinOrHome() {
    if (this.authView() === 'authorized') {
      this.authService.authView.set('authorized');
      this.router.navigate(['/home']);
    } else {
      this.authService.authView.set('outer');
      this.router.navigate(['outer']);
    }
  }

  update(state: AuthView) {
    this.router.navigate(['register', state]);
    this.authService.authView.set(state);
  }
}
