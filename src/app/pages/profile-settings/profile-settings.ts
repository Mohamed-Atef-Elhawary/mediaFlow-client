import { ChangeDetectorRef, Component, computed } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { toastConfig } from '../../config/toastConfig';
import { AuthService } from '../../services/auth-service';
import { ApiUserInfo } from '../../interfaces/api-user-info';

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
  dob!: string;
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
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
      this.modifyDateOfBirth();
    }
    this.isNotChanged();
  }
  modifyDateOfBirth() {
    let dateOfBirth = this.userInfo()?.dateOfBirth;
    if (dateOfBirth) {
      this.dob = this.getDateOfBirth(dateOfBirth);
      this.createUserForm();
      this.cdr.detectChanges();
    }
  }
  getDateOfBirth(dob: string): string {
    let userBirth = new Date(dob);

    let yearOfBirth = String(userBirth.getFullYear());

    let month = String(userBirth.getMonth() + 1);
    let monthOfBirth = month.length === 1 ? `0${month}` : month;

    let day = String(userBirth.getDate());
    let dayOfBirth = day.length === 1 ? `0${day}` : day;

    return `${yearOfBirth}-${monthOfBirth}-${dayOfBirth}`;
  }
  createUserForm() {
    this.userForm = this.fb.group({
      dateOfBirth: [this.dob, [Validators.required]],
      email: [this.userInfo()?.email, [Validators.required, Validators.email]],
      phone: [this.userInfo()?.phone, [Validators.required, Validators.pattern(/^\d{8,11}$/)]],
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
    });
  }
  fileUploaded(event: any) {
    let file = event.target.files[0];
    if (file) {
      this.userForm.addControl('image', this.fb.control(file));
      const reader = new FileReader();
      reader.onload = () => {
        this.auth.userInfo.update((value) => {
          if (value) {
            return { ...value, image: reader.result as string };
          }
          return value;
        });
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.userForm.get('name')?.value);
    formData.append('email', this.userForm.get('email')?.value);
    formData.append('gender', this.userForm.get('gender')?.value);
    formData.append('phone', this.userForm.get('phone')?.value);
    formData.append('address', JSON.stringify(this.userForm.get('address')?.value));

    if (this.userForm.get('image')) {
      formData.append('image', this.userForm.get('image')?.value);
    }
    this.userService.updateProfile(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.auth.userDataSeter(res.data);
        }
      },
      error: (err) => {
        this.toastr.error(
          'Please check your connection or try again later.',
          'Error',
          toastConfig.errorConfig,
        );
        console.log('errrrrrrrrrrrr', err);
      },
    });
  }
  isNotChanged(): boolean {
    let { address, email, gender, name, phone } = this.userInfo() as ApiUserInfo;

    let {
      address: newAddress,
      email: newEmail,
      gender: newGender,
      image: newImage,
      name: newName,
      phone: newPhone,
    } = this.userForm.value;
    return (
      address.line1 === newAddress.line1 &&
      address.line2 === newAddress.line2 &&
      email === newEmail &&
      gender === newGender &&
      name === newName &&
      phone === newPhone &&
      newImage === undefined
    );
  }
}
