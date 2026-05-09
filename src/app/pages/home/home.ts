import { Component } from '@angular/core';
import { HomeHeader } from '../../components/home-header/home-header';
import { HomeSpeciality } from '../../components/home-speciality/home-speciality';
import { TopDoctors } from '../../components/top-doctors/top-doctors';
import { HomeFooter } from '../../components/home-footer/home-footer';

@Component({
  selector: 'app-home',
  imports: [HomeHeader, HomeSpeciality, TopDoctors, HomeFooter],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
