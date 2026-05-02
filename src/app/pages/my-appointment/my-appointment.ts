import { ChangeDetectorRef, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { AppointmentResponse } from '../../interfaces/appointment-response';

import { ToastrService } from 'ngx-toastr';
import { toastConfig } from '../../config/toastConfig';
import { DatePipe, NgClass } from '@angular/common';
import { PhotoService } from '../../services/photo-service';

@Component({
  selector: 'app-my-appointment',
  imports: [DatePipe, NgClass],
  templateUrl: './my-appointment.html',
  styleUrl: './my-appointment.css',
})
export class MyAppointment implements OnInit {
  myAppointments: WritableSignal<AppointmentResponse[]> = signal<AppointmentResponse[]>([]);
  emptyImage: string;
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private photo: PhotoService,
  ) {
    this.emptyImage = this.photo.static.empty;
  }
  ngOnInit(): void {
    this.userService.appointmentsList().subscribe({
      next: (res) => {
        if (res.data) {
          this.myAppointments.set(res.data.reverse());
          console.log(this.myAppointments());
        }
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error', toastConfig.errorConfig);
        console.log(err);
      },
    });
  }
  getAppointmentDate(date: string): Date {
    return new Date(Number(date));
  }

  cancelAppointment(appointmentId: string) {
    this.userService.cancleAppointment(appointmentId).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastr.success(res.message, 'success', toastConfig.successConfig);

          this.myAppointments.update((appointment) => {
            let appointmentObj = appointment.find(
              (appointment) => appointment._id === appointmentId,
            );
            if (appointmentObj) {
              appointmentObj.cancelled = true;
            }
            return appointment;
          });
          this.cdr.detectChanges();
          console.log(this.myAppointments());
        } else {
          this.toastr.error(res.message, 'Error', toastConfig.errorConfig);
        }
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error', toastConfig.errorConfig);
      },
    });
  }
}
