import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-mobile-nav',
  imports: [],
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
