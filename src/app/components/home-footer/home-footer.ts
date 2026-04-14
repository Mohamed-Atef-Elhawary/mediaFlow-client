import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-footer',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './home-footer.html',
  styleUrl: './home-footer.css',
})
export class HomeFooter {
  footerPhoto: string;
  arrow = faArrowRight;
  constructor(private photo: PhotoService) {
    this.footerPhoto = this.photo.static.footerPhoto;
  }
}
