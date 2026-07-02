import { Component, computed, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { ApiUserInfo } from '../../interfaces/api-user-info';
import { ToastrService } from 'ngx-toastr';
import { toastConfig } from '../../config/toastConfig';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-profile',
  imports: [DatePipe, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  // userInfo = signal<ApiUserInfo | null>(null);
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private toastr: ToastrService,
  ) {}

  userInfo = computed(() => {
    return this.auth.userInfo();
  });
  ngOnInit() {
    const resolveObj = this.route.snapshot.data['profileResolver'];
    if (resolveObj.success == true) {
      this.auth.userDataSeter(resolveObj.data);
    }
  }
}
