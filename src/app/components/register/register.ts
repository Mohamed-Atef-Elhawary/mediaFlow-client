import { ChangeDetectorRef, Component, computed, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthView } from '../../types/authType';
import { AuthService } from '../../services/auth-service';
import { PhotoService } from '../../services/photo-service';
import { CommonModule } from '@angular/common';
import { UserRegister } from '../../interfaces/user-register';
import { UserLogin } from '../../interfaces/user-login';
import { ToastrService } from 'ngx-toastr';
import { toastConfig } from '../../config/toastConfig';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  userForm!: FormGroup;
  logo: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private photo: PhotoService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.logo = this.photo.static.logo;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      let state = param.get('state');
      if (state === 'signin' || state === 'signup') {
        this.userFormCreator();
        this.authService.authView.set(state);
        if (state === 'signup') {
          this.modifyUserForm(state);
        }
      }
    });
  }

  authView = computed(() => {
    return this.authService.authView();
  });

  update(state: AuthView) {
    this.router.navigate(['/register', state]);
  }

  userFormCreator() {
    this.userForm = this.fb.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        },
      ],
      password: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(/^\S+/),
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
          nonNullable: true,
        },
      ],
    });
  }

  modifyUserForm(state: AuthView) {
    if (this.userForm) {
      if (state === 'signup') {
        this.userForm.addControl(
          'name',
          this.fb.control('', {
            validators: [
              Validators.required,
              Validators.pattern(/^[A-Za-z]+(\s[A-Za-z]+)*$/),
              Validators.minLength(2),
              Validators.maxLength(20),
            ],
            nonNullable: true,
          }),
        );
      } else {
        this.userForm.removeControl('fullName');
      }
    }
  }
  get name() {
    return this.userForm.get('name');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  submit() {
    if (this.authView() === 'signin') {
      this.login(this.userForm.value);
    } else if (this.authView() === 'signup') {
      this.register(this.userForm.value);
    }
    this.userForm.reset();
  }

  register(data: UserRegister) {
    this.authService.register(data).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          // conso;
          this.toastr.success(res.message, 'MediaFlow', toastConfig.successConfig);
          this.authService.updateAuthState(res.data);
        } else {
          this.toastr.error(res.message, 'MediaFlow', toastConfig.errorConfig);
          // this.authService.updateAuthState(res.data.token);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  login(data: UserLogin) {
    this.authService.login(data).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          // conso;
          this.toastr.success(res.message, 'MediaFlow', toastConfig.successConfig);
          this.authService.updateAuthState(res.data);
          this.router.navigate(['/home']);
        } else {
          this.toastr.error(res.message, 'MediaFlow', toastConfig.errorConfig);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
