import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo-service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  notFoundImg: string;
  constructor(private photos: PhotoService) {
    this.notFoundImg = this.photos.static.notFound;
  }
}
