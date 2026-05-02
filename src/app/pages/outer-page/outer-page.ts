import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PhotoService } from '../../services/photo-service';

@Component({
  selector: 'app-outer-page',
  imports: [RouterLink],
  templateUrl: './outer-page.html',
  styleUrl: './outer-page.css',
})
export class OuterPage {
  outerPhoto: string;
  constructor(private photo: PhotoService) {
    this.outerPhoto = this.photo.static.outer;
  }
}
