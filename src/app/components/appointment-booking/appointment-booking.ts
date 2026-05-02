import { NgClass } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  effect,
  Input,
  input,
  OnChanges,
  OnInit,
  signal,
} from '@angular/core';
import { AppointmentRequest } from '../../interfaces/appointment-request';
import { UserService } from '../../services/user-service';
import { ToastrService } from 'ngx-toastr';
import { toastConfig } from '../../config/toastConfig';
import { DoctorData } from '../../interfaces/doctor-data';
import { DoctorService } from '../../services/doctor-service';
@Component({
  selector: 'app-appointment-booking',
  imports: [NgClass],
  templateUrl: './appointment-booking.html',
  styleUrl: './appointment-booking.css',
})
export class AppointmentBooking implements OnChanges {
  daysOfWeek: { dayName: string; dayNumber: number }[] = [
    { dayName: 'SAT', dayNumber: 0 },
    { dayName: 'SUN', dayNumber: 0 },
    { dayName: 'MON', dayNumber: 0 },
    { dayName: 'TUE', dayNumber: 0 },
    { dayName: 'WED', dayNumber: 0 },
    { dayName: 'THU', dayNumber: 0 },
    { dayName: 'FRI', dayNumber: 0 },
  ];
  dayNumber: number | undefined = undefined;

  timeArray: { time: string }[] = [];

  availableBook: {
    dayName: string;
    date: number;
    slots: { time: string }[];
  }[] = [];

  //dayIndex we use it to make bg-color
  dayIndex = signal<number | null>(null);

  appointmentTime = signal<string | undefined>(undefined);
  appointmentDate = signal<number | undefined>(undefined);

  @Input({ required: true }) docId!: string;
  myDoctor: DoctorData = {} as DoctorData;

  constructor(
    private userService: UserService,
    private doctor: DoctorService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
  ) {}

  ngOnChanges() {
    console.log(this.docId);
    if (this.docId) {
      this.getDoctor();
    }
  }

  getDoctor() {
    this.doctor.doctor(this.docId).subscribe({
      next: (res) => {
        if (res.success) {
          this.myDoctor = res.data;
          this.getAvailableBook();
        }
      },
      error: (err) => {
        console.log('error from getDoctor ', err);
      },
    });
  }
  getAvailableBook() {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endDate = new Date(today);
      endDate.setDate(today.getDate() + i);
      endDate.setHours(20, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let availableTime = [];
      let dayName = this.daysOfWeek[(currentDate.getDay() + 1) % this.daysOfWeek.length].dayName;
      let date = currentDate.getDate();
      this.daysOfWeek[(currentDate.getDay() + 1) % this.daysOfWeek.length].dayNumber = date;
      this.cdr.detectChanges();
      console.log(this.daysOfWeek);
      currentDate.setSeconds(0, 0);
      while (endDate >= currentDate) {
        let formatedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        if (
          !(
            this.myDoctor.appointmentBooked[date] &&
            this.myDoctor.appointmentBooked[date].includes(formatedTime)
          )
        ) {
          availableTime.push({
            time: formatedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      this.availableBook.push({
        dayName,
        date,
        slots: availableTime,
      });
    }
    this.cdr.detectChanges();
    console.log(this.availableBook);
  }

  getDateNumber(dayName: string) {
    console.log('dddddddddddd');
    let myObj = this.availableBook.find((item) => item.dayName == dayName);
    this.dayNumber = myObj?.date;
  }
  getTimeArrayAndUpdateAppointmentDate(dayName: string) {
    let myObj = this.availableBook.find((item) => item.dayName == dayName);
    this.timeArray = myObj?.slots || [];
    this.appointmentDate.set(myObj?.date);
  }

  bookAppointment() {
    let docId = this.docId;
    let appointmentDate = this.appointmentDate();
    let appointmentTime = this.appointmentTime();

    if (docId && appointmentDate && appointmentTime) {
      const appointmentData: AppointmentRequest = {
        docId,
        appointmentDate,
        appointmentTime,
      };

      this.userService.bookAppointment(appointmentData).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success(res.message, 'success', toastConfig.successConfig);
            console.log(res.message);
          }
        },
        error: (err) => {
          this.toastr.error(err.message, 'Error', toastConfig.errorConfig);
        },
      });
    } else {
      this.toastr.error('provide day and time', 'Missing data', toastConfig.errorConfig);
    }
  }
}
