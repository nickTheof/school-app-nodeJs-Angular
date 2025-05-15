import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-mobile-nav',
  imports: [RouterLink],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.css',
})
export class MobileNavComponent {
  private authService = inject(AuthService);
  showMobileMenu = signal<boolean>(false);
  showTeachersSubmenu = signal<boolean>(false);
  showStudentsSubmenu = signal<boolean>(false);

  isAdminOrEditor = this.authService.isAdminOrEditor();

  clickShowMobileMenu() {
    this.showMobileMenu.update((val) => !val);
  }

  clickTeachersSubmenu() {
    this.showStudentsSubmenu.set(false);
    this.showTeachersSubmenu.update((val) => !val);
  }

  clickStudentsSubmenu() {
    this.showTeachersSubmenu.set(false);
    this.showStudentsSubmenu.update((val) => !val);
  }
}
