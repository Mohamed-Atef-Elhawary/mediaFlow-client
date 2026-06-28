import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { PasswordResetService } from '../../services/password-reset-service';
import { PhotoService } from '../../services/photo-service';
import { toastConfig } from '../../config/toastConfig';
import { AuthService } from '../../services/auth-service';
import { LoginResponse } from '../../interfaces/login-response';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  newPassForm!: FormGroup;
  token!: string;
  logo: string;
  check = faCheck;
  showEqualityWarn = signal<boolean>(false);
  constructor(
    private passwordResetService: PasswordResetService,
    private authService: AuthService,
    private photo: PhotoService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.logo = this.photo.static.logo;
    this.authService.authView.set('signin');
  }
  ngOnInit() {
    this.route.queryParams.subscribe((res) => {
      this.token = res['token'];
    });
    this.passFormCreater();
  }
  passFormCreater(): void {
    this.newPassForm = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\S+/),
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        reNewPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\S+/),
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
      },
      { validators: this.isEqual },
    );
  }

  get newPassword() {
    return this.newPassForm.get('newPassword');
  }
  get reNewPassword() {
    return this.newPassForm.get('reNewPassword');
  }

  isEqual(form: AbstractControl): ValidationErrors | null {
    let pass = form.get('newPassword')?.value;
    let rePass = form.get('reNewPassword')?.value;
    return pass !== rePass ? { isEqual: { equal: false } } : null;
  }
  submit() {
    this.showEqualityWarn.set(true);
    if (this.newPassForm.valid) {
      const data = {
        token: this.token,
        newPassword: this.newPassword?.value,
      };
      this.passwordResetService.resetPassword(data).subscribe({
        next: (response) => {
          if (response.success) {
            this.toastr.success(response.message, 'Success', toastConfig.successConfig);
            this.loginToHome(response.data);
          } else {
            this.toastr.success(response.message, 'Erorr', toastConfig.errorConfig);
          }
        },
        error: (err) => {
          this.toastr.error(err.message, 'Error', toastConfig.errorConfig);
        },
      });
    }
  }

  loginToHome(data: LoginResponse) {
    this.authService.authView.set('authorized');
    this.authService.updateAuthState(data);
    this.router.navigate(['/home']);
  }
}
