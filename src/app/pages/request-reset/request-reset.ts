import { Component, signal } from '@angular/core';
import { PasswordResetService } from '../../services/password-reset-service';
import { PhotoService } from '../../services/photo-service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../interfaces/api-response';
import { toastConfig } from '../../config/toastConfig';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-request-reset',
  imports: [RouterLink, FormsModule, FontAwesomeModule],
  templateUrl: './request-reset.html',
  styleUrl: './request-reset.css',
})
export class RequestReset {
  logo: string;
  email: string = '';
  showWarn = signal<boolean>(false);
  mainContent = signal<boolean>(true);
  check = faCheck;
  constructor(
    private passwordResetService: PasswordResetService,
    private photo: PhotoService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.logo = this.photo.static.logo;
  }
  ngOnInit() {}
  validEmail(email: string): boolean {
    const rgxp = /\w+@gmail.com/;
    return rgxp.test(email);
  }
  continue() {
    const isValid = this.validEmail(this.email);
    if (!isValid) {
      this.showWarn.set(true);
    } else {
      this.requestPasswordReset(this.email);
    }
  }
  requestPasswordReset(email: string): void {
    this.passwordResetService.requestPasswordReset(email).subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.toastr.success(response.message, 'Success', toastConfig.successConfig);
          this.mainContent.set(false);
        } else {
          this.toastr.success(response.message, 'Erorr', toastConfig.errorConfig);
        }
        console.log(response);
      },
      error: (err) => {
        console.log(err);
        this.toastr.success(err.message, 'Erorr', toastConfig.errorConfig);
      },
    });
  }
  hideWarn() {
    this.showWarn.set(false);
  }
}
