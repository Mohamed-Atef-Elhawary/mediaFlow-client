import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faBookMedical } from '@fortawesome/free-solid-svg-icons';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-user-menu',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu {
  profileIcon = faUser;
  appointmentIcon = faBookMedical;
  settingIcon = faGear;
  signoutIcon = faArrowRightFromBracket;
  themeIcon = faCircleHalfStroke;

  constructor(
    private auth: AuthService,
    private themeService: ThemeService,
  ) {}
  userImage = computed(() => {
    return this.auth.userData()?.image;
  });
  userName = computed(() => {
    return this.auth.userData()?.name;
  });

  signOut() {
    this.auth.showUserMenu.set(false);
    this.auth.signOut();
  }
  showModeOptions() {
    this.themeService.showOptions.set(true);
  }
}
