import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-booking',
  imports: [],
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

  bookIndex: number = 0;

  ngOnInit() {
    this.getAvailableBook();
    this.getDateNumber('SUN');
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

    console.log(this.availableBook);
  }
  getDateNumber(dayName: string) {
    let myObj = this.availableBook.find((item) => item.dayName == dayName);
    this.dayNumber = myObj?.date;
  }
  getTimeArray(dayName: string) {
    let myObj = this.availableBook.find((item) => item.dayName == dayName);
    this.timeArray = myObj?.slots || [];
    console.log(this.timeArray);
  }
}
