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
import { OuterPage } from '../../pages/outer-page/outer-page';
import { NgClass } from '@angular/common';

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
  shownavLinks = signal<boolean>(false);
  @ViewChild('userMenu', { read: ViewContainerRef }) myMenue!: ViewContainerRef;
  @ViewChild('switchUserMenu', { read: ElementRef }) mydiv!: ElementRef;
  @ViewChild('navLinks', { read: ViewContainerRef }) myNavLinks!: ViewContainerRef;
  constructor(
    private photo: PhotoService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.logo = this.photo.static.logo;
    this.logo1 = this.photo.static.logo1;
  }
  showUserMenu: Signal<boolean> = computed(() => this.authService.showUserMenu());
  ngAfterViewInit(): void {
    this.getUserMenu();
    this.getNavLinks();

    document.addEventListener('click', (event) => {
      if (this.authService.authView() === 'authorized') {
        if (event.target !== this.mydiv.nativeElement) {
          this.authService.showUserMenu.set(false);
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
      this.shownavLinks.set(false);
    }
  }
  async getNavLinks() {
    const myCom = await import('../nav-links/nav-links').then((c) => c.NavLinks);
    this.myNavLinks.clear();
    this.myNavLinks.createComponent(myCom);
  }
  switchVavLinks() {
    this.shownavLinks.update((v) => !v);
  }
  show() {
    console.log('from navbar', this.authView());
  }

  authView = computed(() => {
    return this.authService.authView();
  });
  userImage = computed(() => {
    return this.authService.userData()?.image;
  });
  signinOrHome() {
    if (this.authView() === 'authorized') {
      this.router.navigate(['/home']);
    } else {
      this.authService.authView.set('outer');
      this.router.navigate(['outer']);
    }
  }
  update(state: AuthView) {
    this.router.navigate(['register', state]);
    this.show();
  }
}
