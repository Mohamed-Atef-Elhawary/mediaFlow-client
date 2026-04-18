import { NgClass } from '@angular/common';
import { Component, input, OnInit, signal } from '@angular/core';
import { AppointmentRequest } from '../../interfaces/appointment-request';
import { UserService } from '../../services/user-service';
import { ToastrService } from 'ngx-toastr';
import { toastConfig } from '../../config/toastConfig';
@Component({
  selector: 'app-appointment-booking',
  imports: [NgClass],
  templateUrl: './appointment-booking.html',
  styleUrl: './appointment-booking.css',
})
export class AppointmentBooking implements OnInit {
  daysOfWeek: string[] = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];
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
  docId = input.required<string>();
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
  ) {}
  ngOnInit() {
    this.getAvailableBook();
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
      let dayName = this.daysOfWeek[(currentDate.getDay() + 1) % this.daysOfWeek.length];
      let date = currentDate.getDate();
      currentDate.setSeconds(0, 0);
      while (endDate >= currentDate) {
        let formatedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        availableTime.push({
          time: formatedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      this.availableBook.push({
        dayName,
        date,
        slots: availableTime,
      });
    }

    // console.log(this.availableBook);
  }

  getDateNumber(dayName: string) {
    let myObj = this.availableBook.find((item) => item.dayName == dayName);
    this.dayNumber = myObj?.date;
  }
  getTimeArrayAndUpdateAppointmentDate(dayName: string) {
    let myObj = this.availableBook.find((item) => item.dayName == dayName);
    this.timeArray = myObj?.slots || [];
    this.appointmentDate.set(myObj?.date);
  }

  bookAppointment() {
    let docId = this.docId();
    let appointmentDate = this.appointmentDate();
    let appointmentTime = this.appointmentTime();

    if (docId && appointmentDate && appointmentTime) {
      const appointmentData: AppointmentRequest = {
        docId,
        appointmentDate,
        appointmentTime,
      };

      this.userService.bookAppointment(appointmentData).subscribe(console.log);
    } else {
      this.toastr.error('provide day and time', 'Missing data', toastConfig.errorConfig);
    }
  }
}
