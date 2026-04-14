import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-header',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './home-header.html',
  styleUrl: './home-header.css',
})
export class HomeHeader {
  headerPhoto: string;
  headerDisc: string;
  arrow = faArrowRight;
  constructor(private photo: PhotoService) {
    this.headerPhoto = photo.static.headerPhoto;
    this.headerDisc = photo.static.headerDisc;
  }
}
