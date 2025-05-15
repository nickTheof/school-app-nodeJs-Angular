import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile-nav',
  imports: [RouterLink],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.css',
})
export class MobileNavComponent {
  showMobileMenu = signal<boolean>(false);
  showTeachersSubmenu = signal<boolean>(false);
  showStudentsSubmenu = signal<boolean>(false);

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
