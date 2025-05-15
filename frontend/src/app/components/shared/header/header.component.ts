import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.user;
  dropDownHeaderLogoutMenu = false;

  dropdownToggler = viewChild<ElementRef<HTMLButtonElement>>('dropdownToggler');
  dropdownMenu = viewChild<ElementRef<HTMLDivElement>>('dropdownMenu');

  clickDropdownHeaderLogoutMenu() {
    this.dropDownHeaderLogoutMenu = !this.dropDownHeaderLogoutMenu;
  }

  onDocumentClick(event: MouseEvent): void {
    const menuEl = this.dropdownMenu()?.nativeElement;
    const togglerEl = this.dropdownToggler()?.nativeElement;

    if (
      !menuEl?.contains(event.target as Node) &&
      !togglerEl?.contains(event.target as Node)
    ) {
      this.dropDownHeaderLogoutMenu = false;
    }
  }

  onLogout() {
    this.authService.clearCredentials();
    this.router.navigate([''], { replaceUrl: true });
  }
}
