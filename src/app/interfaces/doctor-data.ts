import { DoctorRank } from './doctor-rank';

export interface DoctorData extends DoctorRank {
  about: string;
  address: { line1: 'string'; line2: string };
  appointmentBooked: any;
  available: boolean;
  consultationFee: number;
  date: string;
  dateOfBirth: string;
  degree: string;
  experience: string;
  gender: string;
  image: string;
  name: string;
  phone: string;
  speciality: string;
  _id: string;
}
