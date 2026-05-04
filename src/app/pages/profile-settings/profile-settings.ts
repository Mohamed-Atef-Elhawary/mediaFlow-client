import { ChangeDetectorRef, Component, computed } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { toastConfig } from '../../config/toastConfig';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-profile-settings',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './profile-settings.html',
  styleUrl: './profile-settings.css',
})
export class ProfileSettings {
  userForm!: FormGroup;
  maxDate: string = '2026-01-01';
  minDate: string = '1870-01-01';
  yearOfBirth!: string;
  monthOfBirth!: string;
  dayOfBirth!: string;
  dob!: string;
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  userInfo = computed(() => {
    return this.auth.userInfo();
  });

  ngOnInit() {
    const resolveObj = this.route.snapshot;
    const infoObj = resolveObj.data['profileResolver'];
    if (infoObj.success) {
      this.auth.userDataSeter(infoObj.data);
      this.prepareUserInfo();
    }
    // console.log(resolveObj.data['profileResolver']);
    // console.log(this.userInfo()?.dateOfBirth);
    // if (!this.userInfo()) {
    //   this.userService.profile().subscribe({
    //     next: (res) => {
    //       if (res.success) {
    //         console.log('sssssssssssssssssssssssss');
    //         this.auth.userDataSetser(res.data);

    //         this.prepareUserInfo();
    //       }

    //       console.log(res);
    //     },
    //     error: (err) => {
    //       this.toastr.error(err.message, 'Error', toastConfig.errorConfig);
    //     },
    //   });
    // } else {
    //   this.prepareUserInfo();
    // }
  }
  prepareUserInfo() {
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', this.userInfo());
    let userBirth = new Date(this.userInfo()?.dateOfBirth || '');
    this.yearOfBirth = String(userBirth.getFullYear());
    this.monthOfBirth =
      String(userBirth.getMonth() + 1).length == 1
        ? `${0}${String(userBirth.getMonth() + 1)}`
        : String(userBirth.getMonth() + 1);

    this.dayOfBirth =
      String(userBirth.getDate()).length == 1
        ? `${0}${String(userBirth.getDate())}`
        : String(userBirth.getDate());

    this.dob = `${this.yearOfBirth}-${this.monthOfBirth}-${this.dayOfBirth}`;
    console.log(this.dob);
    this.createUserForm();
    this.cdr.detectChanges();
  }
  createUserForm() {
    this.userForm = this.fb.group({
      dateOfBirth: [this.dob, [Validators.required]],
      email: [this.userInfo()?.email, [Validators.required, Validators.email]],
      phone: [this.userInfo()?.phone, [Validators.required, Validators.pattern(/^\d{11}$/)]],
      gender: [this.userInfo()?.gender, [Validators.required]],
      name: [
        this.userInfo()?.name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
      ],
      address: this.fb.group({
        line1: [
          this.userInfo()?.address.line1,
          [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
        ],
        line2: [
          this.userInfo()?.address.line2,
          [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
        ],
      }),
      image: [],
    });
  }
  fileUploaded(event: any) {
    let file = event.target.files[0];
    if (file) {
      this.userForm.patchValue({ image: file });
      // const reader = new FileReader();
      // reader.onload = () => {};
      // reader.readAsDataURL(file);
      event.target.value = '';
    }
  }

  submit() {
    let formData = new FormData();
    formData.append('name', this.userForm.get('name')?.value);
    formData.append('email', this.userForm.get('email')?.value);

    formData.append('gender', this.userForm.get('gender')?.value);
    formData.append('address', JSON.stringify(this.userForm.get('address')?.value));
    if (this.userForm.get('image')?.value) {
      formData.append('image', this.userForm.get('image')?.value);
    }
    this.userService.updateProfile(formData).subscribe({
      next: (res) => {
        this.auth.userDataSeter(res.data);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastr.error(
          'Please check your connection or try again later.',
          'Error',
          toastConfig.errorConfig,
        );
        console.log(err);
      },
    });
  }
}
