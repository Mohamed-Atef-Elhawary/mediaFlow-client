import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  static = {
    logo: 'logo.png',
    logo1: 'logo1.png',
    headerPhoto: 'homeHeader.png',
    footerPhoto: 'homeFooter.png',
    headerDisc: 'headerDisc.png',
    availableIcon: 'icon-ethereum.svg',
    outer: 'outer.png',
    about: 'aboutImg.avif',
    contact: 'contact.png',
    empty: 'empty.png',
    notFound: 'notFound.png',
  };
  staticSpecialityIcon = {
    heart: 'heartHealth.png',
    bones: 'bones.png',
    eye: 'eyecare.png',
    dental: 'DentalCare.png',
    brain: 'brain.png',
    children: 'ch.png',
  };
}
