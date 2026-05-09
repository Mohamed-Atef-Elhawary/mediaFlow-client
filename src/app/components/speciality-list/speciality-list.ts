import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  output,
  QueryList,
  signal,
  ViewChildren,
  EventEmitter,
  Output,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-speciality-list',
  imports: [CommonModule],
  templateUrl: './speciality-list.html',
  styleUrl: './speciality-list.css',
})
export class SpecialityList implements OnChanges {
  selectedSpeciality = signal<string>('');
  @Output() selected!: EventEmitter<string>;
  @Input() selectedSpecialityFromHome!: string | null;
  specialityList: string[] = [
    'Cardiology',
    'Orthopedics',
    'Ophthalmology',
    'Dentistry',
    'Neurology',
    'Pediatrics',
  ];
  constructor() {
    this.selected = new EventEmitter<string>();
  }
  ngOnChanges(): void {
    if (this.selectedSpecialityFromHome) {
      this.sendSpectiality(this.selectedSpecialityFromHome);
    }
  }
  sendSpectiality(speciality: string) {
    this.selectedSpeciality.set(speciality);
    this.selected.emit(speciality);
  }
}
