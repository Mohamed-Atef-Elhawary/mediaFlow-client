import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo-service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  logo: string;
  menuIcon: string;
  links: string[] = ['home', 'doctors', 'about', 'contact'];
  constructor(private photo: PhotoService) {
    this.logo = this.photo.static.logo;
    this.menuIcon = this.photo.static.menuIcon;
  }
}
